import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventModule } from '../event.module';
import { EventListPageRoutingModule } from './event-list-routing.module';
import { EventListPage } from './event-list.page';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        EventModule,
        EventListPageRoutingModule,
        SharedModule,
    ],
    'declarations': [EventListPage],
})
export class EventListPageModule {}
