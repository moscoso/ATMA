import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { first } from 'rxjs/operators';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';
import { Delta } from 'src/util/delta/Delta';
import { AtmaEvent } from 'src/app/core/state/event/event.model';

@Component({
    'selector': 'event-form',
    'templateUrl': './event-form.component.html',
    'styleUrls': ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {

	@Input() buttonIcon = "add";
    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < AtmaEvent >> ();


    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyEventIsUnique.bind(this)
    });
    facebookURL = new FormControl('', []);
	eventbriteURL = new FormControl('', []);
	thumbnail = new FormControl('', []);
    description = new FormControl('', []);

    form: FormGroup;

    requestInProgress$: Observable < boolean > = of (false);

    defaultValue: AtmaEvent;


    constructor(
        public eventService: AtmaEventFacade,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.eventService.loadAll();
        this.form = new FormGroup({
            'name': this.name,
			'description': this.description,
            'facebookURL': this.facebookURL,
            'eventbriteURL': this.eventbriteURL,
            'thumbnail': this.thumbnail,
        });
        this.requestInProgress$ = this.eventService.selectRequestInProgress();
        this.eventService.selectEventByRouteURL().pipe(first(exercise => exercise != null)).toPromise()
            .then(this.initFormValues.bind(this));
    }

    initFormValues(event: AtmaEvent) {
        this.defaultValue = event;
        this.name.setValue(event.name);
        this.facebookURL.setValue(event.facebookURL);
        this.eventbriteURL.setValue(event.eventbriteURL);
		this.thumbnail.setValue(event.thumbnail);
    }

    onSubmit(_form) {
        try {
            const values = this.createEventFromForm();
            if  (this.defaultValue === undefined ) {
                this.formSubmit.emit(values);
             } else {
                const changes = {...Delta.object(this.defaultValue, values), 'id': this.defaultValue.id};
                this.formSubmit.emit(changes);
            }
        } catch (error) {
            this.toastService.failed(`Could not submit exercise`, error);
        }
    }

    getSlug(name: string) {
        return transformToSlug(name);
    }

    verifyEventIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return validateDocIDIsUnique(`events`, ctrl, this.firestore);
    }

    nameHasChanged() {
        return this.defaultValue !== undefined && this.defaultValue.name !== this.name.value;
    }

    createEventFromForm() {
        const event: AtmaEvent = this.form.getRawValue();
        let values: Partial < AtmaEvent > ;
        values = {
            'id': this.getSlug(event.name),
            'name': event.name,
            'description': event.description,
        };
        return values;
    }

    /**
     * A function used to compare IDs in the `option` values versus the `selected` values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */

    compareIDs(e1: string, e2: string): boolean {
        return e1 === e2;
    }
}
