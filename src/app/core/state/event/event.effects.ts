import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AtmaEventAction, AtmaEventActionType} from './event.actions';
import * as Exercises from './event.actions';
import { EventService } from '../../firebase/event/event.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class AtmaEventEffects {

    @Effect({'dispatch': false}) error$: Observable<AtmaEventAction> = this.actions$.pipe(
        ofType(AtmaEventActionType.RequestFailed),
        tap((action: Exercises.RequestFailed) => {
            this.toaster.failed('Request for exercise failed', action.error);
        })
    );

    @Effect() allRequested$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.AllRequested),
        switchMap((_action: Exercises.AllRequested) => {
            return from(this.exerciseService.getAll()
                .then(exercises => new Exercises.AllLoaded(exercises))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() refreshAllRequested$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.RefreshAllRequested),
        switchMap((_action: Exercises.AllRequested) => {
            return from(this.exerciseService.getAllFromServer()
                .then(exercises => new Exercises.AllLoaded(exercises))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() refreshOneRequested$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.RefreshOneRequested),
        switchMap((action: Exercises.RefreshOneRequested) => {
            return from(this.exerciseService.get(action.id, 'server')
                .then(exercise => new Exercises.OneLoaded(exercise))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() createRequested$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.CreateRequested),
        switchMap((action: Exercises.CreateRequested) => {
            return from(this.exerciseService.create(action.event)
                .then((exercise) => new Exercises.Created(exercise))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() updateRequested$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.UpdateRequested),
        switchMap((action: Exercises.UpdateRequested) => {
            return from(this.exerciseService.update(action.id, action.changes)
                .then(() => new Exercises.Updated(action.id, action.changes))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() deleteRequested$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.DeleteRequested),
        switchMap((action: Exercises.DeleteRequested) => {
            return from(this.exerciseService.delete(action.id)
                .then(() => new Exercises.Deleted(action.id))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect({'dispatch': false}) formCompleted$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.Created, AtmaEventActionType.Updated),
        tap(() => {
            this.modalController.dismiss();
        })
    );

    @Effect({'dispatch': false}) deleted$: Observable < AtmaEventAction > = this.actions$.pipe(
        ofType<AtmaEventAction>(AtmaEventActionType.Deleted),
        tap((_action: Exercises.CreateRequested) => {
            this.router.navigateByUrl('/exercises');
        })
    );

    constructor(
        private exerciseService: EventService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
        private router: Router,
    ) {}
}
