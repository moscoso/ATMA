import { Observable, of } from 'rxjs';
import { FireAuthService } from 'src/app/core/firebase/auth/auth.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
    'selector': 'app-landing',
    'templateUrl': './landing.page.html',
    'styleUrls': ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    isAuthenticated$: Observable < boolean > = of (false);

	typeLevel = 0;

    name = '';

    constructor(
        public modalController: ModalController,
        public authService: AuthFacade,
        public fireAuth: FireAuthService,
        public toastService: ToastService,
        public route: ActivatedRoute,
		public router: Router,
		public fire: AngularFirestore,
		public renderer2: Renderer2
    ) {}

    ngOnInit() {

        this.isAuthenticated$ = this.authService.selectAuthenticated();

        this.isAuthenticated$.subscribe(auth => {
			this.scrollPage('events');
        });
        

        this.route.queryParams.subscribe(params => {
            this.name = window.localStorage.getItem('name');

        });
    }
    /**
     * Get a resource from the Firebase's project storage bucket
     * @param slug the slug of the resource
     */
    getStorageURL(slug: string) {
        const storageBucket = `strengthrx-protocols.appspot.com`;
        return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${slug}`;
    }

	setTypeLevel(level: number) {
		this.typeLevel = level;
	}

	resetTypeLevel(){
		this.typeLevel = -1;
		this.typeLevel = 0;
	}


    scrollPage(s: string) {
        const options: ScrollIntoViewOptions = { 'behavior': 'smooth', 'block': 'start', 'inline': 'nearest' };
        document.getElementById(s).scrollIntoView();
    }

    async onSubmit(data) {
        const profile = Object.assign({}, data);
        console.log(profile.email);

    }

    async logout() {
        this.authService.logout();
	}
	
}
