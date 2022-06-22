import { Observable, of } from 'rxjs';
import { RegisterPage } from 'src/app/account/register/register.page';
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

	public woah(event) {
		const target: HTMLElement = event.target || event.srcElement ||event.currentTarget;
		this.renderer2.removeClass(target, "not-loaded");
		this.renderer2.addClass(target, "animated");
		// this.renderer2.addClass(target, "");
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

	goToTati() {
		this.router.navigateByUrl('/tati')
	}

	atmaEvents = [
	// 	{
	// 	title: `Wim Hof Method Adventure & April Fools' SlumberParty`,
	// 	subtitle: `APR 1 AT 7 PM – APR 2 AT 3:33 PM`,
	// 	month: `April`,
	// 	day: '1',
	// 	image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/wim%20hof.jpg?alt=media&token=f5d1e3d9-06a0-4649-9de5-813c754e31d5`,
	// 	preview: `Come Celebrate April Fools' with Ātma Church (All Tribes Medicine Assembly) We will gather by Candlelight under the
	// 	New Moon of April 1st to plant seeds of hope & intention from
	// 	the Pure Heart of the Sacred Fool Archetype who firmly stands for Infinite Possibility, Innocence & Freedom`,
	// 	description: `We will gather by Candlelight under the New Moon of April 1st to plant seeds of hope & intention from
	// 	the Pure Heart of the Sacred Fool Archetype who firmly stands for Infinite Possibility, Innocence &
	// 	Freedom
	// 	Festivities with kickstart with Wim Hof Method Breathwork & Icebath Party 7-9 pm facilitated by
	// 	Certified Wim Hof Method
	// 	Instructor Tatiana who has has assisted Wim Hof's Winter Expeditions Climbing Snow Mountains together in
	// 	nothing but
	// 	their swimsuit! Together we will transform our relationship with confronting challenge & cultivate the
	// 	exuberant
	// 	life-giving energy of empowerment.
	// 	Stick around for Epic AfterParty with Ecstatic Dance, Midnight Skinny-Dip Swim + Sauna & Cuddle Puddle
	// 	Slumber Party
	// 	with Calea Zacatechichi & Blue Lotus Medicine for Lucid Dreaming - See you in the DreamTime!
	// 	In the Morning we will prime ourselves with barefoot grounding under majestic live oaks to flow through
	// 	a sequence of
	// 	Vinyasa Krama Himalayan Yoga (prānic Sādhanā) followed by another round of Breathwork & Icebath to start
	// 	the day 'High
	// 	on your Own Supply'!
	// 	To Share & Express the radiant energy we will be cultivating, We will cap the event with an
	// 	EcstaticDance PartyParade
	// 	down Congress with the ABC costume theme "Anything But Clothes"
	// 	Bring with you Snacks to share, Swim Towel & Blankets/Pillows to get Comfy-Coz & your weirdest creative
	// 	costume for
	// 	"Anything But Clothes" 😉
	// 	Located at Luxurious Private Sanctuary Estate in Westlake Hills with Five Acres of Live Oaks, Saltwater
	// 	Pool & Sauna
	// 	overlooking stunning view of Austin CityScape... Exact Address will be given after registration
	// 	$111 to attend the full April Fools' Ritual
	// 	or $50 per either morning or evening Wim Hof Method Workshop (7-9 pm Friday or 8-11 Saturday)
	// 	@AtmaChurch (Venmo)
	// 	for more information, call Whitney @ 561-401-1154`
	// }, 
	// {
	// 	title: `ECSTATIC REVOLUTION: SILENT DISCO Parade ATX`,
	// 	subtitle: `SATURDAY, APRIL 2, 2022 AT 2 PM – 4 PM EDT`,
	// 	month: `April`,
	// 	day: '2',
	// 	image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/dance%20party.jpg?alt=media&token=74e2d960-c3d0-4d7a-b250-4b4edc2cd395`,
	// 	preview: `Come Unleash your wild side Saturday April 2 ***This is a donation-based event (sliding scale suggested donation $22-$33)***
	// 	We will gather at 1 pm. We will then connect, go over the plan, pass out the Silent Disco headsets, and start our party Parade about!`,
	// 	description:`Join us for this PARTY IN MOTION!

	// 	Come Unleash your wild side Saturday April 2 ***This is a donation-based event (sliding scale suggested donation $22-$33)***
	// 	We will gather at 1 pm. We will then connect, go over the plan, pass out the Silent Disco headsets, and start our party Parade about!
		
	// 	We will be parading (dancing, skipping, jumping, parkouring, monkeying, undulating, flying!) through the streets for 1.25 miles all the way down to the corner of Riverside (being as weird, wild, and crazy as we can) making dance stops along the way.
		
		
	// 	This is the Ultimate DanceParty LoveFest (à la mini BurningMan)
	// 	We seek to spread an infectious Euphoria through the streets,
	// 	exploding like confetti from our unabashed Full Self-Expression, Inspiration & Freedom.
	// 	Our objective is to Amplify & Exalt Fun.
	// 	Move Energy for Healing
	// 	Spread Smiles that Light up the World
	// 	Co-Create the most happy beautiful experience together
	// 	Remember the Joy of Living!
	// 	To make this event even more wonderful & stunning, please come dressed up as your avatar in full costume!
	// 	**THEME:
	// 	"KEEP AUSTIN WEIRD"
	// 	ABC (Anything But Clothes!)
	// 	so dress as weird & creative as you possibly can!
		
	// 	Invite your friends
	// 	This Saturday Event is the AfterParty of a Wim Hof Method April Fools’ Party the night before on April 1st. Details here:
	// 	https://fb.me/e/1tykVx1d1
	// 	Everyone is welcome, but due to limited number of headsets (25), you can preregister in advance to reserve your headsets by sending your donation to Whitney. Her Venmo is @whitusa1234 or PayPal is tampacrossboot@gmail.com
	// 	Please give her your name, the date of event you are reserving headsets for & the links to a few of your favorite songs that you'd love to hear on the playlist.
	// 	We are seeking High Vibe Beautiful Uplifting Songs that Light your Soul on Fire & Inspire Dance!
	// 	“And those who were seen dancing were thought to be insane by those who could not hear the music.”
	// 	― Friedrich Nietzsche`
	// },
	// {
	// 	title: `Hammam & Harem: An Enchanted Candlelit Evening of Magick`,
	// 	subtitle: `FRIDAY, APRIL 15, 2022 AT 8 PM EDT`,
	// 	month: `April`,
	// 	day: '15',
	// 	image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/harem.jpg?alt=media&token=8bb1b0dc-e358-46c1-8816-69967aaca968`,
	// 	preview: `Hammam & Harrem: An Enchanting Candlelit Evening of Magick
	// 	at Secret Estate in WestLake Hills`,
	// 	description:`Atma warmly invites you to attend:
	// 	Hammam & Harrem: An Enchanting Candlelit Evening of Magick
	// 	at Secret Estate in WestLake Hills
	// 	Evening will Include:
	// 	Guided Beginner’s Bellydance:
	// 	Watch or Learn to flow with the fundamental movements of Bellydance undulations to unleash the serpentine surge of Shakti Primal Energy throughout your entire body to enter into a fluid trance of sensuous ecstacy!
	// 	Hammam Renewal Ritual:
	// 	RoseWater Couple’s Bath, Sauna, Cold Saltwater Pool Skinny Dip,
	// 	Traditional Moroccan BlackSoap Cleanse, Exfoliation Scrub with Kessa Glove, Ghassol Clay Mask from Atlas Mountains, Argan Oil Massage
	// 	(Nudity Optional in Hammam Experience, or bring a bathingsuit if you’d prefer)
	// 	Gourmet Organic Plant-Based Vegetarian Morroccan Dinner & Hookah Lounge
	// 	Full Evening of Magick including Moroccan Dinner
	// 	ATMA member exchange: $222
	// 	ATMA non member exchange: $333
	// 	*ATMA memberships begin at $44 per month)
	// 	-----------------------------
	// 	We have a 3 day weekend of events
	// 	Friday April 15
	// 	Hammam & Harem:
	// 	An Enchanted Candlelit Evening of Magick
	// 	Saturday April 16
	// 	Peyote Walkabout:
	// 	GreenBelt PrayerWalk under the Light of The Pink Moon
	// 	Easter Sunday April 17th
	// 	Calling in Christ Consciousness Changa Ceremony & Psilocybin Easter Egg Hunt: A Celebration of Resurrection
	// 	-------------------
	// 	All 3 days can be attended for a discounted rate:
	// 	ATMA member exchange: $999
	// 	ATMA non member exchange: $1111
	// 	-------------------
	// 	Optional overnight stay (available to members only) 3 nights is an additional: $1111 for Luxury Suite
	// 	$555 Private Room`
	// },
	{
		title: `Peyote Walkabout: Cactus Ceremony Pilgrimage`,
		subtitle: `SATURDAY, APRIL 16, 2022 AT 8 AM – 8 PM EDT`,
		month: `April`,
		day: '16',
		image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/peyote.jpg?alt=media&token=a78a2f0b-adf2-4728-b05b-efb087908254`,
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
	{
		title: `Easter Sunday @ Ātma Entheogenic Church: Calling in Christ Consciousness`,
		subtitle: `SUNDAY, APRIL 17, 2022 AT 12:11 PM – 6:55 PM EDT`,
		month: `May`,
		day: `5`,
		image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/christconscious.jpg?alt=media&token=4777a28c-d7af-4cd1-8a82-adb2fcf82dd9`,
		preview: `A Day of Ceremony & Sanctuary to Resurrect our Soul’s Connection with Divinity & Revitalize our Alignment with the True Self, A Day to ReMember & Realize Christ’s Message & Return to the Kingdom of Heaven Within. Inspired by the Blooming Rebirth of Spring, the day will unfold in stages of expansion & integration:`,
		description:`Calling in Christ Consciousness
		Easter Sunday Celebration
		@ Ātma Church
		11:11 am - 8:08 pm
		A Day of Ceremony & Sanctuary to Resurrect our Soul’s Connection with Divinity & Revitalize our Alignment with the True Self, A Day to ReMember & Realize Christ’s Message & Return to the Kingdom of Heaven Within. Inspired by the Blooming Rebirth of Spring, the day will unfold in stages of expansion & integration:
		11:11 am ‘Blood of Christ’ Beet Juice Elixir of Life (full of Nitric Oxide to improve blood flow to lungs, increasing the amount of oxygen in the blood stream for Breathwork.)
		11:30 am Halo of Light Activation: Pranayama (Guided Breathwork Journey for Purification & Illumination)
		12 pm Icebath Baptisms
		1-3 pm Sacred Gift: Easter Egg Mushroom Hunt with Ātma Church Chorus
		3 pm “Its GOat Time!” Lamb of God Goat-Party Happy-Hour EcstaticDance with SilentDisco Headsets
		4-6 pm Breaking Bread Together: Holy Nourishment Community Potluck
		(Please bring a dish to share of Essene-Inspired High Vibrational Living Food Plant-Based Vegan Dinner Deliciousness)
		Please bring with you:
		vegan food for the community potluck,
		towel & bathingsuit for optional icebath & pool
		your beloved friends
		Located at Ātma Church- contact Whitney Lasseter for Address.
		Ātma Church can hold 150+ people, so spread the word & invite all your friends
		If you can't attend the entire event, please feel free to drop by for whatever portion resonates with you.
		Sliding Scale Suggested Donation:
		$33-111
		@AtmaChurch (Venmo)
		for more information & address, call Whitney @ 561-401-1154
		For those called to Sacred Ceremony, “Divine Order: The Revelation of Sacred Geometry though Initiation of Medicine” (Changa Circle Ceremony will begin at 7p - ($333 exchange) this is a private intimate small group ceremony, please contact Whitney if you are interested in joining to receive the ceremony prep protocol)
		
		Join us:
		Saturday April 16
		Cactus Walkabout:
		GreenBelt PrayerWalk under the Light of The Pink Moon See less`
	},
	{
		title: `ECSTATIC REVOLUTION: SILENT DISCO Parade ATX`,
		subtitle: `FRIDAY, APRIL 22, 2022 AT 8:30 PM – 10:30 PM EDT`,
		month: `April`,
		day: `22`,
		image: `https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/275436739_1116872969132315_2744539763925039384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=340051&_nc_ohc=tZwRodMLyUoAX8GXGWA&_nc_ht=scontent-mia3-1.xx&oh=00_AT9nfzMEsgBhcib-z1mvRr14OTRYOASm35KWjfC-ub2l2g&oe=6251C9C1`,
		preview: `Come Unleash your wild side Saturday April 2 ***This is a donation-based event (sliding scale suggested donation $22-$33)***`,
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
		title: `1001 Arabian Nights MiddleEastern Dinner & Lucid-Dream Ceremony + SlumberParty!`,
		subtitle: `APR 30 AT 8 PM – MAY 1 AT 5 PM EDT`,
		month: `April`,
		day: `30`,
		image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/arabian%20nights.jpg?alt=media&token=a7189d5c-5e6e-430d-afe0-d52bdbaf739c`,
		preview: `Ātma Church (All Tribes Medicine Assembly)
		Requests Your Divine Presence to illuminte:
		1001 Arabian Nights MiddleEastern Dinner & Lucid-Dream Ceremony + SlumberParty:
		An Enchanting Candlelit Evening of Magick`,
		description:`Ātma Church (All Tribes Medicine Assembly)
		Requests Your Divine Presence to illuminte:
		1001 Arabian Nights MiddleEastern Dinner & Lucid-Dream Ceremony + SlumberParty:
		An Enchanting Candlelit Evening of Magick
		The Evening Will Commence with Guided Beginner’s Bellydance:
		Watch or Learn to flow with the fundamental movements of Bellydance undulations to unleash the serpentine surge of Shakti Primal Energy throughout your entire body to enter into a fluid trance of sensuous ecstacy! We will learn a simple sensuous choreography sequence to indulge in together.
		Icebath & Infrared Sauna Available for an Intimate Hammam-Inspired Euphoria Experience.
		Followed by Gourmet Organic Plant-Based Vegetarian Middle Eastern Dinner & Hookah Lounge
		At 11:11 pm we will gather in the Temple Sanctuary for Calea Zacatechichi & Blue Lotus Medicine Ceremony for Lucid Dreamin…..
		See you in TheDreamTime!
		Stick around Sunday Morning for:
		MayDay! 'Spring Cleaning' Community Celebration:
		Rituals for Renewal & Rebirth
		10 am: Morning Sunshine Priming Sequence of Yoga & Pranayama (Prānic Sādhanā) with a Kundalini Kriya specifically for Spring Cleansing & Supporting Detoxification.
		11 Am: Wim Hof Method Guided Breathwork Journey by Certified Wim Hof Method Instructor followed by Optional Icebath to start the day 'High on your Own Supply’!
		12 pm Osho Dynamic Meditation (This meditation is a fast, intense and thorough way to break old, ingrained patterns in the bodymind that keep one imprisoned in the past, and to experience the freedom, the witnessing, silence and peace that are hidden behind those prison walls)
		1 pm Vegan Pancake-Party Brunch & Community Potluck Feast
		2 pm Spring Cleaning Clothing Swap - Invitation to clear out any old stagnant energy from your closets & unclutter your space. Please bring any clothing, jewelry, products, bedding, towels, costumes, decorations, kitchen supplies, etc that are no longer serving you to exchance with your friends.
		3 pm MayPole Ritual Dance & Painting Party for co-creating ATMA Church Communtiy Vision Mural.
		Please bring with you:
		as much as you would like to give away for the clothing swap,
		vegan food for the communtiy potluck,
		towel & bathingsuit for optional icebath & pool
		Art Supplies for Mural
		Your friends
		Located at Ātma Church- contact Whitney Lassiter for Address.
		Ātma Church can hold 150+ people, so spread the word & invite all your friends
		If you can't attend the entire event, please feel free to drop by for whatever portion resonates with you.
		Sliding Scale Suggested Donation:
		$44-111
		@AtmaChurch (Venmo)
		for more information & address, call Whitney @ 561-401-1154`
	},
	{
		title: `MayDay! 'Spring Cleaning' Community Celebration: Rituals for Regeneration`,
		subtitle: `SUNDAY, MAY 1, 2022 AT 11 AM – 5 PM EDT`,
		month: `May`,
		day: `1`,
		image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/spring.jpg?alt=media&token=2230fc0e-a104-4d2b-9e02-8177fbac5902`,
		preview: `Ātma Church (All Tribes Medicine Assembly)
		Requests Your Divine Presence to cocreate & illuminte:
		MayDay! 'Spring Cleaning' Community Celebration:
		Rituals for Renewal & Rebirth`,
		description:`Ātma Church (All Tribes Medicine Assembly)
		Requests Your Divine Presence to cocreate & illuminte:
		MayDay! 'Spring Cleaning' Community Celebration:
		Rituals for Renewal & Rebirth
		10 am: Morning Sunshine Priming Sequence of Yoga & Pranayama (Prānic Sādhanā) with a Kundalini Kriya specifically for Spring Cleansing & Supporting Detoxification.
		11 Am: Wim Hof Method Guided Breathwork Journey by Certified Wim Hof Method Instructor followed by Optional Icebath to start the day 'High on your Own Supply’!
		12 pm Osho Dynamic Meditation (This meditation is a fast, intense and thorough way to break old, ingrained patterns in the bodymind that keep one imprisoned in the past, and to experience the freedom, the witnessing, silence and peace that are hidden behind those prison walls)
		1 pm Vegan Pancake-Party Brunch & Community Potluck Feast
		2 pm Spring Cleaning Clothing Swap - Invitation to clear out any old stagnant energy from your closets & unclutter your space. Please bring any clothing, jewelry, products, bedding, towels, costumes, decorations, kitchen supplies, etc that are no longer serving you to exchance with your friends.
		3 pm MayPole Ritual Dance & Painting Party for co-creating ATMA Church Communtiy Vision Mural.
		Please bring with you:
		as much as you would like to give away for the clothing swap,
		vegan food for the communtiy potluck,
		towel & bathingsuit for optional icebath & pool
		Art Supplies for Mural
		Your friends
		Located at Ātma Church- contact Whitney Lassiter for Address.
		Ātma Church can hold 150+ people, so spread the word & invite all your friends
		If you can't attend the entire event, please feel free to drop by for whatever portion resonates with you.
		Sliding Scale Suggested Donation:
		$22-111
		@AtmaChurch (Venmo)
		for more information & address, call Whitney @ 561-401-1154`
	},
	{
		title: `Mexican Fiesta DinnerParty with Open Mic Talent Show!`,
		subtitle: `THURSDAY, MAY 5, 2022 AT 6:55 PM EDT`,
		month: `May`,
		day: `5`,
		image: `https://firebasestorage.googleapis.com/v0/b/atma-church.appspot.com/o/cinco%20de%20mayo.jpg?alt=media&token=2b1604fb-e874-43d7-801a-8c3794834d7e`,
		preview: `Ātma Church (All Tribes Medicine Assembly)
		Warmly Welcomes you to Come Celebrate Cinco de Mayo:
		Mexican Fiesta DinnerParty with Open Mic Talent Show!
		Gourmet Vegan Mexican-Inspired Dinner`,
		description:`"Quiero hacer contigo
		lo que la primavera hace con los cerezo”
		Pablo Neruda
		Ātma Church (All Tribes Medicine Assembly)
		Warmly Welcomes you to Come Celebrate Cinco de Mayo:
		Mexican Fiesta DinnerParty with Open Mic Talent Show!
		Gourmet Vegan Mexican-Inspired Dinner with
		Fresh Guacamole & Salsa (of course!), Gazpacho, Black Bean Brownies & Whitney’s World Famous Spicy Cacao Nectar of the Gods
		After dinner, we will serenade & entertain one another with the gifts of our unique creative expression. Please share a poem, sing a song, play an instrument, tell a story with words or dance.
		Please bring your musical instruments (Drums for DrumCircle), your best friends, your favorite Mariachi Band.
		Located at Ātma Church- contact Whitney Lassiter for Address.
		Ātma Church can hold 150+ people,
		so spread the word & invite all your friends.
		Sliding Scale Suggested Donation:
		$30-60
		@AtmaChurch (Venmo)
		for more information & address, call Whitney @ 561-401-1154`
	},
]

	
}
