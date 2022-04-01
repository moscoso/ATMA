import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { HomeModule } from '../home.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountModule } from 'src/app/account/account.module';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeModule,
        SharedModule,
		AccountModule,
        LandingPageRoutingModule
    ],
    'declarations': [LandingPage],
})
export class LandingPageModule {}
