import { Observable, of } from 'rxjs';
import { RegisterPage } from 'src/app/account/register/register.page';
import { FireAuthService } from 'src/app/core/firebase/auth/auth.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    'selector': 'app-landing',
    'templateUrl': './landing.page.html',
    'styleUrls': ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    isAuthenticated$: Observable < boolean > = of (false);

    name = '';

    constructor(
        public modalController: ModalController,
        public authService: AuthFacade,
        public fireAuth: FireAuthService,
        public toastService: ToastService,
        public route: ActivatedRoute,
		public fire: AngularFirestore
    ) {}

    ngOnInit() {

        this.isAuthenticated$ = this.authService.selectAuthenticated();

        this.isAuthenticated$.subscribe(auth => {
			this.scrollPage('events');
        });

		try {
			if (this.fireAuth.isSignInLink(window.location.href)) {
				this.signIn();
			}
		}catch(error) {
			this.toastService.failed(`Something went wrong`, error);
		}
        

        this.route.queryParams.subscribe(params => {
            this.name = window.localStorage.getItem('name');

        });
    }

    async signIn() {
        const email = window.localStorage.getItem('email');
        const link = window.location.href;
        try {
            await this.fireAuth.signInWithEmailLink(email, link);
        } catch (error) {
            console.log(error);
            this.toastService.failed(`Something went wrong`, error);
        }
    }
    /**
     * Get a resource from the Firebase's project storage bucket
     * @param slug the slug of the resource
     */
    getStorageURL(slug: string) {
        const storageBucket = `strengthrx-protocols.appspot.com`;
        return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${slug}`;
    }


    async openModal() {
        const modal = await this.modalController.create({
            'id': 'register',
            'component': RegisterPage,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
        return;
    }

    async closeModal() {
        this.modalController.dismiss();
    }


    getTransformationImages(i: number) {
        return [
            `/assets/img/transformations/${i}/before.jpg`,
            `/assets/img/transformations/${i}/after.jpg`
        ];
    }

    scrollPage(s: string) {
        const options: ScrollIntoViewOptions = { 'behavior': 'smooth', 'block': 'start', 'inline': 'nearest' };
        document.getElementById(s).scrollIntoView();
    }

    async onSubmit(data) {
        const profile = Object.assign({}, data);
        console.log(profile.email);
        try {
            await this.fireAuth.sendSignInLinkToEmail(profile.email, profile.name);
            this.toastService.primary(`Check your email for the link to sign in`);
        } catch (error) {
            console.log(error);
            this.toastService.failed(`Something went wrong`, error)
        }

    }

    async logout() {
        this.authService.logout();
    }

	atmaEvents = [{
		title: `Wim Hof Method Adventure & April Fools' SlumberParty`,
		subtitle: `APR 1 AT 7 PM – APR 2 AT 3:33 PM`,
		month: `April`,
		day: '1',
		image: `https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/275940801_1121371048682507_7828545270068411997_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=340051&_nc_ohc=fUse0J9Rw6wAX-f5oxx&_nc_ht=scontent-mia3-1.xx&oh=00_AT9117Y5hQTGGTMERwjt8nMs-FxQANgNs2ULr9opk22TJQ&oe=623CB4B6`,
		preview: `Come Celebrate April Fools' with Ātma Church (All Tribes Medicine Assembly) We will gather by Candlelight under the
		New Moon of April 1st to plant seeds of hope & intention from
		the Pure Heart of the Sacred Fool Archetype who firmly stands for Infinite Possibility, Innocence & Freedom`,
		description: `We will gather by Candlelight under the New Moon of April 1st to plant seeds of hope & intention from
		the Pure Heart of the Sacred Fool Archetype who firmly stands for Infinite Possibility, Innocence &
		Freedom
		Festivities with kickstart with Wim Hof Method Breathwork & Icebath Party 7-9 pm facilitated by
		Certified Wim Hof Method
		Instructor Tatiana who has has assisted Wim Hof's Winter Expeditions Climbing Snow Mountains together in
		nothing but
		their swimsuit! Together we will transform our relationship with confronting challenge & cultivate the
		exuberant
		life-giving energy of empowerment.
		Stick around for Epic AfterParty with Ecstatic Dance, Midnight Skinny-Dip Swim + Sauna & Cuddle Puddle
		Slumber Party
		with Calea Zacatechichi & Blue Lotus Medicine for Lucid Dreaming - See you in the DreamTime!
		In the Morning we will prime ourselves with barefoot grounding under majestic live oaks to flow through
		a sequence of
		Vinyasa Krama Himalayan Yoga (prānic Sādhanā) followed by another round of Breathwork & Icebath to start
		the day 'High
		on your Own Supply'!
		To Share & Express the radiant energy we will be cultivating, We will cap the event with an
		EcstaticDance PartyParade
		down Congress with the ABC costume theme "Anything But Clothes"
		Bring with you Snacks to share, Swim Towel & Blankets/Pillows to get Comfy-Coz & your weirdest creative
		costume for
		"Anything But Clothes" 😉
		Located at Luxurious Private Sanctuary Estate in Westlake Hills with Five Acres of Live Oaks, Saltwater
		Pool & Sauna
		overlooking stunning view of Austin CityScape... Exact Address will be given after registration
		$111 to attend the full April Fools' Ritual
		or $50 per either morning or evening Wim Hof Method Workshop (7-9 pm Friday or 8-11 Saturday)
		@AtmaChurch (Venmo)
		for more information, call Whitney @ 561-401-1154`
	}, 
	{
		title: `ECSTATIC REVOLUTION: SILENT DISCO Parade ATX`,
		subtitle: `SATURDAY, APRIL 2, 2022 AT 2 PM – 4 PM EDT`,
		month: `April`,
		day: '2',
		image: `https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/275436739_1116872969132315_2744539763925039384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=340051&_nc_ohc=0ZkLlnLuujUAX_kKl_h&_nc_ht=scontent-mia3-1.xx&oh=00_AT9EZ1usmOYaLME3_dl5Kg6xZQdym007H1PC8ETuRZBzig&oe=623C0901`,
		preview: `Come Unleash your wild side Saturday April 2 ***This is a donation-based event (sliding scale suggested donation $22-$33)***
		We will gather at 1 pm. We will then connect, go over the plan, pass out the Silent Disco headsets, and start our party Parade about!`,
		description:`Join us for this PARTY IN MOTION!

		Come Unleash your wild side Saturday April 2 ***This is a donation-based event (sliding scale suggested donation $22-$33)***
		We will gather at 1 pm. We will then connect, go over the plan, pass out the Silent Disco headsets, and start our party Parade about!
		
		We will be parading (dancing, skipping, jumping, parkouring, monkeying, undulating, flying!) through the streets for 1.25 miles all the way down to the corner of Riverside (being as weird, wild, and crazy as we can) making dance stops along the way.
		
		
		This is the Ultimate DanceParty LoveFest (à la mini BurningMan)
		We seek to spread an infectious Euphoria through the streets,
		exploding like confetti from our unabashed Full Self-Expression, Inspiration & Freedom.
		Our objective is to Amplify & Exalt Fun.
		Move Energy for Healing
		Spread Smiles that Light up the World
		Co-Create the most happy beautiful experience together
		Remember the Joy of Living!
		To make this event even more wonderful & stunning, please come dressed up as your avatar in full costume!
		**THEME:
		"KEEP AUSTIN WEIRD"
		ABC (Anything But Clothes!)
		so dress as weird & creative as you possibly can!
		
		Invite your friends
		This Saturday Event is the AfterParty of a Wim Hof Method April Fools’ Party the night before on April 1st. Details here:
		https://fb.me/e/1tykVx1d1
		Everyone is welcome, but due to limited number of headsets (25), you can preregister in advance to reserve your headsets by sending your donation to Whitney. Her Venmo is @whitusa1234 or PayPal is tampacrossboot@gmail.com
		Please give her your name, the date of event you are reserving headsets for & the links to a few of your favorite songs that you'd love to hear on the playlist.
		We are seeking High Vibe Beautiful Uplifting Songs that Light your Soul on Fire & Inspire Dance!
		“And those who were seen dancing were thought to be insane by those who could not hear the music.”
		― Friedrich Nietzsche`
	},
	{
		title: `Hammam & Harem: An Enchanted Candlelit Evening of Magick`,
		subtitle: `FRIDAY, APRIL 15, 2022 AT 8 PM EDT`,
		month: `April`,
		day: '15',
		image: `https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/274988741_1121339768685635_4345945182512209724_n.jpg?stp=dst-jpg_p640x640&_nc_cat=104&ccb=1-5&_nc_sid=340051&_nc_ohc=enxNMN_h6KIAX-gXz-c&_nc_ht=scontent-mia3-1.xx&oh=00_AT-BonHrEYRhEsAMeRL3JB-JdptTqVmgfUgE6FmHa6u82Q&oe=623D0AE0`,
		preview: `Hammam & Harrem: An Enchanting Candlelit Evening of Magick
		at Secret Estate in WestLake Hills`,
		description:`Atma warmly invites you to attend:
		Hammam & Harrem: An Enchanting Candlelit Evening of Magick
		at Secret Estate in WestLake Hills
		Evening will Include:
		Guided Beginner’s Bellydance:
		Watch or Learn to flow with the fundamental movements of Bellydance undulations to unleash the serpentine surge of Shakti Primal Energy throughout your entire body to enter into a fluid trance of sensuous ecstacy!
		Hammam Renewal Ritual:
		RoseWater Couple’s Bath, Sauna, Cold Saltwater Pool Skinny Dip,
		Traditional Moroccan BlackSoap Cleanse, Exfoliation Scrub with Kessa Glove, Ghassol Clay Mask from Atlas Mountains, Argan Oil Massage
		(Nudity Optional in Hammam Experience, or bring a bathingsuit if you’d prefer)
		Gourmet Organic Plant-Based Vegetarian Morroccan Dinner & Hookah Lounge
		Full Evening of Magick including Moroccan Dinner
		ATMA member exchange: $222
		ATMA non member exchange: $333
		*ATMA memberships begin at $44 per month)
		-----------------------------
		We have a 3 day weekend of events
		Friday April 15
		Hammam & Harem:
		An Enchanted Candlelit Evening of Magick
		Saturday April 16
		Peyote Walkabout:
		GreenBelt PrayerWalk under the Light of The Pink Moon
		Easter Sunday April 17th
		Calling in Christ Consciousness Changa Ceremony & Psilocybin Easter Egg Hunt: A Celebration of Resurrection
		-------------------
		All 3 days can be attended for a discounted rate:
		ATMA member exchange: $999
		ATMA non member exchange: $1111
		-------------------
		Optional overnight stay (available to members only) 3 nights is an additional: $1111 for Luxury Suite
		$555 Private Room`
	},
	{
		title: `Peyote Walkabout: Cactus Ceremony Pilgrimage`,
		subtitle: `SATURDAY, APRIL 16, 2022 AT 8 AM – 8 PM EDT`,
		month: `April`,
		day: '16',
		image: `https://scontent-mia3-2.xx.fbcdn.net/v/t39.30808-6/266237311_10165778316165468_888151516098107833_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=340051&_nc_ohc=-lX6I0edh2AAX9L3W-9&_nc_ht=scontent-mia3-2.xx&oh=00_AT_nVkdiIrruQ7B_g_O93DK1AsHx_LnOZrJrvoVt0BshPw&oe=623C41F1`,
		preview: `Welcome the Expansive Energy of Spring
		The Possibility of Renewal & Regeneration
		The infinite-Blossoming of Consciousness`,
		description:`CactusCeremony GreenBelt PrayerWalk under the Light of The Pink Moon of Saturday April 16th
		🌵💗🌵💗🐸🍄🐸💗🌵💗🌵💗
		Welcome the Expansive Energy of Spring
		The Possibility of Renewal & Regeneration
		The infinite-Blossoming of Consciousness
		Called in with Collective Sung Prayer, Chanting, Ecstatic Praise
		though Forrest Bathing,
		Waterfall Purification,
		Healing Ceremony,
		Walking in the Footsteps of the Ancestral,
		Planting Seeds of Hope
		We will meet at 7 am for Sunrise at Monkey Tree then walk in Meditation & Prayer 7 miles up to The Hill of Life & back (14 miles total), Stopping along the way for Wim Hof Method Guided BreathWork Journey & Cold Plunge, Waterfall Purification Rituals, Songs of Healing, Medicine Ceremony, Ecstatic Dance & Guided Meditations with the Silent Disco Headsets.
		Suggested Energy Exchange:
		Walkabout with Medicine
		ATMA members: $333
		ATMA non members: $444
		Guided Walkabout without medicine:
		ATMA members $66
		ATMA non members $77
		-----------------------
		We have a 3 days of events planned:
		Friday April 15
		Hammam & Harem:
		An Enchanted Candlelit Evening of Magick
		Saturday April 16
		Peyote Walkabout:
		GreenBelt PrayerWalk under the Light of The Pink Moon
		Easter Sunday April 17th
		Calling in Christ Consciousness Changa Ceremony & Psilocybin Easter Egg Hunt: A Celebration of Resurrection
		-------------------
		All 3 days can be attended for a discounted rate:
		ATMA member exchange: $999
		ATMA non member exchange: $1111
		-------------------
		Optional overnight stay (available to members only) 3 nights is an additional: $1111 for Luxury Suite
		$555 Private Room
		
		To RSVP, please message Whitney
		(561) 401-1154
		Come Dressed in a way that would honor the Beauty of Nature, whatever that means to you 🙂
		We Love you & look forward to sharing in this profound experience together with the intention to illuminate our Sacred Hearts upon this Extraordinary Path of The Way of Beauty 💗🚀🌟`
	},
	
	]
}
