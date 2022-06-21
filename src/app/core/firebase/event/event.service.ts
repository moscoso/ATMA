import { Injectable } from '@angular/core';
import { EntityService } from '../entity/EntityService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseModule } from '../firebase.module';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AtmaEvent, ATMA_EVENT_INIT_MODEL } from '../../state/event/event.model';

@Injectable({'providedIn': FirebaseModule, })
export class EventService extends EntityService < AtmaEvent > {
    constructor(
        public firestore: AngularFirestore,
        public functions: AngularFireFunctions,
    ) {
        super(firestore, functions, 'events', {'defaultEntity': ATMA_EVENT_INIT_MODEL, 'IDSource': 'name'});
    }
}
