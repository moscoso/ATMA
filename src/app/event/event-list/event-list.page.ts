import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Observable, of , Subject, combineLatest } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


import Fuse from 'fuse.js';

import { HighlightIndicesMap, removeIndicesThatAreTypos } from 'src/app/pipes/highlight-search.pipe';
import { AtmaEvent } from 'src/app/core/state/event/event.model';
import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';
import { CreateEventComponent } from '../components/create-event/create-event.component';

@UntilDestroy()
@Component({
    'selector': 'atma-event-list-page',
    'templateUrl': './event-list.page.html',
    'styleUrls': ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

    events$: Observable < AtmaEvent[] > = of ([]);
    searchTerm$: Subject < string > = new Subject();
    filteredEventList: AtmaEvent[] = [];
    highlights: HighlightIndicesMap = {};
    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public eventService: AtmaEventFacade,
    ) {}

    ngOnInit(): void {
        this.initExerciseList();
    }

    async initExerciseList() {
        this.eventService.loadAll();
        this.requestInProgress$ = this.eventService.selectRequestInProgress();
        this.events$ = this.eventService.selectAll();
        this.events$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.events$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([events, searchTerm]) => this.filterEvents([events, searchTerm])
        );
        this.filteredEventList = await this.events$.pipe(first(exercises => exercises.length > 0))
            .toPromise();
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
                'minMatchCharLength': 3,
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
}
