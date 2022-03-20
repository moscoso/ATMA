import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { Profile } from 'src/app/core/state/profile/profile.model';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    'selector': 'join-form',
    'templateUrl': './join-form.component.html',
    'styleUrls': ['./join-form.component.scss'],
})
export class JoinFormComponent implements OnInit {

    @Output() formSubmit = new EventEmitter < Partial < Profile >> ();

    hidePassword = true;

    form: FormGroup;

    email = new FormControl('', [Validators.required, Validators.email]);
    name = new FormControl('', Validators.required);

    constructor(
        public profileService: ProfileFacade,
        public authService: AuthFacade,
        public toastService: ToastService,
		public fire: AngularFirestore,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'email': this.email,
            'name': this.name,
        });
    }


    async onSubmit(form) {
		if(!this.form.valid) return;
        const profile = this.form.getRawValue();
        try {
            let values: any;
            values = {
                'email': profile.email,
                'name': profile.name,
            };
			window.localStorage.setItem('email', profile.email);
			window.localStorage.setItem('name', profile.name);
            this.formSubmit.emit(values);
        } catch (error) {
            this.toastService.failed(`Something went wrong`, error);
        }
		try {
			this.fire.collection(`sign-ups`).add({
				'name': window.localStorage.getItem('name'),
				'email': window.localStorage.getItem('email'),
				'timestamp': new Date(),
			});
		} catch (e) {
			console.error(e);
		}
    }


}
