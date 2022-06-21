import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailPageRoutingModule } from './event-detail-routing.module';

import { EventDetailPage } from './event-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventModule } from '../event.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        EventModule,
        EventDetailPageRoutingModule
    ],
    'declarations': [EventDetailPage]
})
export class EventDetailPageModule {}
