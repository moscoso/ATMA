import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';
import { EditEventComponent } from '../components/edit-event/edit-event.component';
import { AtmaEvent } from 'src/app/core/state/event/event.model';

@UntilDestroy()
@Component({
    'selector': 'atma-event-detail-page',
    'templateUrl': './event-detail.page.html',
    'styleUrls': ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

    requestInProgress$: Observable < boolean > = of (false);
    event$: Observable < AtmaEvent > ;
    isAdmin$: Observable < boolean > = of (false);
    loading = true;

    constructor(
        public profileService: ProfileFacade,
        public eventService: AtmaEventFacade,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.eventService.loadAll();
        this.event$ = this.eventService.selectEventByRouteURL();
        // this.isAdmin$ = this.profileService.selectUserIsTrainer();
        this.requestInProgress$ = this.eventService.selectRequestInProgress();
    }

    async doRefresh(event): Promise < void > {
        this.refresh();
        this.eventService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {event.target.complete(); });
    }

    async refresh(): Promise <void> {
        const exercise = await this.event$.pipe(first()).toPromise();
        this.eventService.refreshOne(exercise.id);
    }

    async showEditModal(): Promise < void > {
        const modal = await this.modalCtrl.create({
            'id': 'edit-event',
            'component': EditEventComponent,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
    }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'delete-event',
            'header': 'Are you sure you want to delete?',
            'buttons': [
            {
                'text': 'Delete',
                'role': 'destructive',
                'icon': 'trash',
                'handler': () => { this.requestDelete(); }
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        actionSheet.present();
    }

    async requestDelete(): Promise < void > {
        const exercise = await this.event$.pipe(first()).toPromise();
        this.eventService.delete(exercise.id);
    }

	getDayName(day: number) {
		const dayNames = ["Sunday","Monday", "Tuesday", "Wenesday", "Thursay", "Friday", "Saturday"];
		return dayNames[day];
	}
}
