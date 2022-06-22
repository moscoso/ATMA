import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialsModule } from '../materials.module';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventPreviewComponent } from './components/event-preview/event-preview.component';
import { RouterModule } from '@angular/router';

const components =  [
	CreateEventComponent,
	EditEventComponent,
	EventFormComponent,
	EventListComponent,
	EventPreviewComponent
];

@NgModule({
    declarations: [
		...components,
	],
    imports: [
        CommonModule,
        IonicModule,
		FormsModule,
		MaterialsModule,
		PipeModule,
		ReactiveFormsModule,
		RouterModule,
        SharedModule,
		SwiperModule,
    ],
	exports: [
		...components
	]
})
export class EventModule {}
