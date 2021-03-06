import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

	@ViewChild('wtf') nameElement: ElementRef;
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
			if(profile.name === ''){
				throw new Error (`Please fill out your name`)
			}
			if(profile.email === '') {
				throw new Error(`Please fill out your email`)
			}
			window.localStorage.setItem('email', profile.email);
			window.localStorage.setItem('name', profile.name);
            this.formSubmit.emit(values);
        } catch (error) {
            this.toastService.failed(`Something went wrong`, error);
        }
		try {
			await this.fire.collection(`sign-ups`).add({
				'name': window.localStorage.getItem('name'),
				'email': window.localStorage.getItem('email'),
				'timestamp': new Date(),
			});
			this.toastService.success(`Sign up completed. Thanks ${profile.name}! ?????? `);
			this.form.reset();
			Object.keys(this.form.controls).forEach(key => {
				this.form.get(key).setErrors(null);
			});
			this.nameElement.nativeElement.focus();
		} catch (e) {
			console.error(e);
		}
    }


}
