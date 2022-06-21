import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ClientAction, ClientActionType } from './client.actions';
import * as Clients from './client.actions';
import { ClientService } from '../../firebase/client/client.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable()
export class ClientEffects {

    @Effect({ 'dispatch': false }) error$: Observable < ClientAction > = this.actions$.pipe(
        ofType(ClientActionType.RequestFailed),
        tap((action: Clients.RequestFailed) => {
            console.log(action);
            this.toaster.failed('Request for client failed', action.error);
        })
    );

    @Effect() allRequested$: Observable < Clients.ClientAction > = this.actions$.pipe(
        ofType < ClientAction > (ClientActionType.AllRequested),
        switchMap((action: Clients.AllRequested) => {
            return from(this.clientService.getAll()
                .then(clients => new Clients.AllLoaded(clients))
                .catch(error => new Clients.RequestFailed(error))
            );
        }),
    );

    @Effect() assignTrainerRequested$: Observable < ClientAction > = this.actions$.pipe(
        ofType < ClientAction > (ClientActionType.AssignTrainerRequested),
        switchMap((action: Clients.AssignTrainerRequested) => {
            const changes = {'assignedTrainer': action.trainer};
            return from(this.clientService.update(action.id, changes)
                .then((client) => new Clients.TrainerAssigned(action.id, action.trainer))
                .catch(error => new Clients.RequestFailed(error))
            );
        })
    );

    constructor(
        private clientService: ClientService,
        private actions$: Actions,
        private toaster: ToastService,
    ) {}
}
