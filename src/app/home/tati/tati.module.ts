import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule } from '../home.module';
import { TatiPageRoutingModule } from './tati-routing.module.ts.module';
import { TatiPage } from './tati.page';

@NgModule({
    'imports': [
        CommonModule,
        IonicModule,
		HomeModule,
		SharedModule,
		TatiPageRoutingModule,
    ],
	'declarations': [TatiPage],
})
export class TatiPageModule {}
