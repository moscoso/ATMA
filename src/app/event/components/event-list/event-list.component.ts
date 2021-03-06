import Fuse from 'fuse.js';
import { combineLatest, Observable, of , Subject } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';
import { AtmaEvent } from 'src/app/core/state/event/event.model';
import {
    HighlightIndicesMap,
    removeIndicesThatAreTypos
} from 'src/app/pipes/highlight-search.pipe';
import SwiperCore, { EffectCoverflow, EffectCube, SwiperOptions } from 'swiper';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreateEventComponent } from '../create-event/create-event.component';

SwiperCore.use([EffectCoverflow, EffectCube]);
@UntilDestroy()
@HostListener('window:resize', ['$event'])
@Component({
    selector: 'atma-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
    events$: Observable < AtmaEvent[] > = of ([]);
    searchTerm$: Subject < string > = new Subject();
    filteredEventList: AtmaEvent[] = [];
    highlights: HighlightIndicesMap = {};
    requestInProgress$: Observable < boolean > = of (false);

    swiperConfig: SwiperOptions = {
        // effect: 'coverflow',
        loop: true,
        grabCursor: true,
		slideToClickedSlide: true,
        coverflowEffect: {
            'slideShadows': false,
        },
        cubeEffect: {
            'slideShadows': false,
            'shadow': false
        }
    }

    effect = 'coverflow';

	innerWidth: number;

    constructor(
        public modalController: ModalController,
        public eventService: AtmaEventFacade,
    ) {}

    ngOnInit(): void {
        this.initList();

		this.innerWidth = window.innerWidth;

		window.onresize = (_e) => {
			this.innerWidth = window.innerWidth;
			this.calculateSlides()
		}
    }

    async initList() {
        this.eventService.loadAll();
        this.requestInProgress$ = this.eventService.selectRequestInProgress();
        this.events$ = this.eventService.selectAll();
        this.events$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.events$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([events, searchTerm]) => this.filterEvents([events, searchTerm])
        );
        this.filteredEventList = await this.events$.pipe(first(events => events.length > 0))
            .toPromise();
    }

	calculateSlides() {
		if(this.innerWidth <= 700) {
			return 1;
		}

		const IDEAL_SLIDES_IN_VIEW = 3;
		return this.filteredEventList.length >= IDEAL_SLIDES_IN_VIEW ? IDEAL_SLIDES_IN_VIEW : this.filteredEventList.length;
	}

    refresh(): void {
        this.eventService.refreshAll();
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-event',
            'component': CreateEventComponent,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
    }

    search(event) {
        const searchTerm = event.srcElement.value;
        this.searchTerm$.next(searchTerm);
    }

    private filterEvents([events, searchTerm]: [AtmaEvent[], string]) {
        searchTerm = searchTerm.trim();

        if (searchTerm.length === 0) {
            this.filteredEventList = events;
            this.highlights = {};
        } else {
            const options = {
                'includeScore': true,
                'ignoreLocation': false,
                'keys': ['name'],
                'shouldSort': true,
                'minMatchCharLength': 1,
                'includeMatches': true,
            };
            const searcher = new Fuse(events, options);
            const matches: Fuse.FuseResult < AtmaEvent > [] = searcher.search(searchTerm);
            this.highlights = this.generateHighlightIndices(matches, searchTerm);
            this.filteredEventList = matches.map(match => match.item);
        }
    }

    private generateHighlightIndices(searchResults: Fuse.FuseResult < AtmaEvent > [], searchTerm: string): HighlightIndicesMap {
        const highlights: HighlightIndicesMap = {};
        searchResults.forEach(result => {
            const exerciseID = result.item.id;
            const resultHasMatch = result.matches.length > 0;
            if (resultHasMatch) {
                const indices = result.matches[0].indices;
                highlights[exerciseID] = removeIndicesThatAreTypos(indices, result.item.name, searchTerm);
            }
        });
        return highlights;
    }

    onSwiper([_swiper]) {
        // console.log(swiper);
    }

    onSlideChange() {
        // console.log('slide change');
    }
}
