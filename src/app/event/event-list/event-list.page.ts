import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from '../components/create-event/create-event.component';
import { Observable } from 'rxjs';

@Component({
    'selector': 'atma-event-list-page',
    'templateUrl': './event-list.page.html',
    'styleUrls': ['./event-list.page.scss'],
})
export class EventListPage {

	requestInProgress$: Observable < boolean >;

    constructor(
        public modalController: ModalController,
        public eventService: AtmaEventFacade,
    ) {
		this.requestInProgress$ = this.eventService.selectRequestInProgress();
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
}
