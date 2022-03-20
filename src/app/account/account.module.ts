import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { IonicModule } from '@ionic/angular';
import { ChooseMembershipComponent } from './components/choose-membership/choose-membership.component';
import { MaterialsModule } from '../materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinFormComponent } from './components/join-form/join-form.component';

const components = [
	ChooseMembershipComponent,
	JoinFormComponent,
	LogoutButtonComponent
];

@NgModule({
    'declarations': components,
    'imports': [
        CommonModule,
        IonicModule,
        MaterialsModule,
        ReactiveFormsModule,
    ],
    'exports': components,
})
export class AccountModule {}
