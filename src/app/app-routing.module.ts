import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';
import { ProfileGuard } from './guards/profile/profile.guard';

const routes: Routes = [
    {
        'path': '',
        'loadChildren': () => import('./home/landing/landing.module').then(m => m.LandingPageModule),
        'pathMatch': 'full'
    },
	{
		'path': 'tati',
		'loadChildren': () => import('./home/tati/tati.module').then(m => m.TatiPageModule),
		'pathMatch': 'full',
	},
    {
        'path': 'dashboard',
        'redirectTo': 'profile',
        'pathMatch': 'full'
    },
    {
        'path': 'login',
        'loadChildren': () => import('./account/login/login.module').then(m => m.LoginPageModule),
        'canActivate': [NoAuthGuard]
    },
    {
        'path': 'signup',
        'loadChildren': () => import('./account/register/register.module').then(m => m.RegisterPageModule),
        'canActivate': [NoAuthGuard]
    },
    {
        'path': 'register',
        'redirectTo': 'join',
    },
    {
        'path': 'join',
        'loadChildren': () => import('./account/join/join.module').then(m => m.JoinPageModule),
        'canActivate': [NoAuthGuard]
    },   
    {
        'path': 'terms',
        'loadChildren': () => import('./home/terms-of-service/terms-of-service.module').then(m => m.TermsOfServicePageModule)
    },
    {
        'path': 'terms-of-service',
        'loadChildren': () => import('./home/terms-of-service/terms-of-service.module').then(m => m.TermsOfServicePageModule)
    },
    {
        'path': 'privacy',
        'loadChildren': () => import('./home/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
    },
    {
        'path': 'privacy-policy',
        'loadChildren': () => import('./home/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
    },

	{
        'path': 'events',
        'loadChildren': () => import('./event/event-list/event-list.module').then(m => m.EventListPageModule),
        // 'canActivate': [AuthGuard, ProfileGuard],
    },
	{
        'path': 'profile',
        'loadChildren': () => import('./profile/view-profile/view-profile.module').then(m => m
            .ViewProfilePageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
	{
        'path': 'create-profile',
        'loadChildren': () => import('./profile/create-profile/create-profile.module').then(m => m.CreateProfilePageModule),
        'canActivate': [AuthGuard],
    },
	{
        'path': 'edit-profile',
        'loadChildren': () => import('./profile/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },


];


const WILDCARD = [{
    'path': '**',
    'redirectTo': ''
}];

const appRoutes: Routes = [].concat(routes, WILDCARD);

@NgModule({
    'imports': [
        RouterModule.forRoot(appRoutes, {
            'preloadingStrategy': PreloadAllModules,
            'anchorScrolling': 'enabled',
            'relativeLinkResolution': 'legacy'
        })
    ],
    'exports': [RouterModule]
})
export class AppRoutingModule {}
