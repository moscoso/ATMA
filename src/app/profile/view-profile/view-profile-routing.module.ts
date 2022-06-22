import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfilePage } from './view-profile.page';

const routes: Routes = [
    {
        'path': '',
        'component': ViewProfilePage
    },
    {
		'path': ':id',
		'component': ViewProfilePage,
        // 'canActivate': [AuthGuard],
    },
	{
		'path': '/edit',
		'loadChildren': () => import("../edit-profile/edit-profile-routing.module").then(m => m.EditProfilePageRoutingModule),
        // 'canActivate': [AuthGuard, ProfileGuard],
	}
];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class ViewProfilePageRoutingModule {}
