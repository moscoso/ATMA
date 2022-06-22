import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject, timer } from 'rxjs';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthFacade } from './core/state/auth/auth.facade';
import { ProfileFacade } from './core/state/profile/profile.facade';
import { RouterStoreDispatcher } from './core/state/router/router.dispatcher';
import { MenuItem } from './shared/menu-list/menu-list.component';
import { ToastService } from './shared/toast/toast.service';
import { filter, map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@UntilDestroy()
@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss'],
	'host': {
		'class': 'mat-typography'
	}
})
export class AppComponent implements OnInit, AfterContentInit {
	public atmaPages: MenuItem[] = [
		{
            'label': 'Home',
            'icon': 'home',
            'link': '/',
        },
        // {
        //     'label': 'Coaches',
        //     'icon': 'people',
        //     'scrollID': 'coaches'
        // },
        // {
        //     'label': 'Transformations',
        //     'icon': 'people',
        //     'scrollID': 'transformations'
        // },
        // {
        //     'label': 'Services',
        //     'icon': 'people',
        //     'scrollID': 'services'
        // },
        {
            'label': 'Events',
            'icon': 'calendar',
            'link': '/events'
        }

    ];


    public landingPages: MenuItem[] = [
        {
            'label': 'Coaches',
            'icon': 'people',
            'scrollID': 'coaches'
        },
        {
            'label': 'Transformations',
            'icon': 'people',
            'scrollID': 'transformations'
        },
        {
            'label': 'Services',
            'icon': 'people',
            'scrollID': 'services'
        },
        {
            'label': 'Store',
            'icon': 'shirt-outline',
            'href': 'https://strength-rx.myshopify.com/collections/all'
        }

    ];

    public trainerFeatures: MenuItem[] = [
        {
            'label': 'Profile',
            'icon': 'people-outline',
            'link': '/profile'
        },
        {
            'label': 'Master Programs',
            'icon': 'calendar-outline',
            'link': '/programs'
        },
        {
            'label': 'Master Workouts',
            'icon': 'fitness',
            'link': '/workouts'
        },
        {
            'label': 'Exercises',
            'icon': 'barbell',
            'link': '/exercises'
        },
        {
            'label': 'Clients',
            'icon': 'list-outline',
            'link': '/clients'
        },
        // {
        //     'label': 'Store',
        //     'icon': 'shirt-outline',
        //     'href': 'https://strength-rx.myshopify.com/collections/all'
        // },
    ];

    public clientFeatures: MenuItem[] = [
        {
            'label': 'Profile',
            'icon': 'people-outline',
            'link': '/profile'
        },
        {
            'label': 'Training Calendar',
            'icon': 'today-outline',
            'link': '/calendar',
        },
        {
            'label': 'Check In',
            'icon': 'checkbox-outline',
            'link': '/check-in',
        },
        {
            'label': 'Store',
            'icon': 'shirt-outline',
            'href': 'https://strength-rx.myshopify.com/collections/all'
        },
        {
            'label': 'Reviews',
            'icon': 'videocam-outline',
            'link': '/reviews',
        },
        {
            'label': 'Progress Pics',
            'icon': 'aperture-outline',
            'link': '/progress-pics',
        },
        {
            'label': 'Billing',
            'icon': 'card-outline',
            'link': '/billing'
        }

    ];

    public accountPages: MenuItem[] = [
    {
        'label': 'Login',
        'icon': '',
        'link': '/login'
    },
    {
        'label': 'Register',
        'icon': '',
        'link': '/signup'
    }, ];

    public isAuthenticated$: Observable < boolean > = of (false);
    public iAmTrainer$: Observable < boolean > = of (false);
    public url$: Observable < string > = of ('/');
	public contentReady$: BehaviorSubject < boolean > = new BehaviorSubject(false);

	public routeLoading$: Observable < boolean > = of (false);

    constructor(
        private profileService: ProfileFacade,
        private routerService: RouterStoreDispatcher,
        private authService: AuthFacade,
        private serviceWorkerUpdate: SwUpdate,
        private toastService: ToastService,
		private router: Router
    ) {
        this.initializeApp();
    }

    async initializeApp() {
        this.profileService.loadAll();
        // this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
        this.addAvatarToMenu();
        this.profileService.selectUserAsProfile().pipe(
            untilDestroyed(this)
        ).subscribe(profile => {
            this.addAvatarToMenu();
        });

		combineLatest([
			this.contentReady$,
			timer(800)
		]).pipe( filter(([a, b]) => a === true ))
		.subscribe((x) => {
			document.getElementById("rootPreloader").className = 'preloader animate__animated animate__fadeOut disabled';
		});		

		
    }

    ngOnInit() {
        this.isAuthenticated$ = this.authService.selectAuthenticated();
        this.url$ = this.routerService.selectURL();

		const activateUpdate = () => this.serviceWorkerUpdate.activateUpdate().then((updated) => {
			if(updated) {
				this.toastService.success("New Version Activated!");
			} else {
				this.toastService.primary("You are already up to date");
			}
		}).catch(reason => {
			this.toastService.failed("Failed to update", reason)
		});

		this.serviceWorkerUpdate.versionUpdates.subscribe((x) => {
			this.toastService.ask("New version available.", " Load New Version?", activateUpdate, "Update");
		});

		this.routeLoading$ = this.router.events.pipe(
			filter(e => 
				e instanceof NavigationStart ||
				e instanceof NavigationEnd ||
				e instanceof NavigationCancel || 
				e instanceof NavigationError
			),
			map(e => (e instanceof NavigationStart)),
		)
    }

	checkForUpdate() {
		this.serviceWorkerUpdate.checkForUpdate().then(updateAvailable => {
			if(updateAvailable) {
				this.toastService.primary("New update available");
			} else {
				this.toastService.primary("You are already up to date");
			}
		}).catch(reason => {
			this.toastService.failed("Failed to check for update", reason)
		});
	}

	activateUpdate() {

	}

	ngAfterContentInit(): void {
		this.contentReady$.next(true);
	}

    logout() {
        this.authService.logout();
    }

    async addAvatarToMenu() {
        const avatar = await this.profileService.getProfilePic();
        delete this.trainerFeatures[0].icon;
        this.trainerFeatures[0].img = avatar;
        delete this.clientFeatures[0].icon;
        this.clientFeatures[0].img = avatar;
    }
}
