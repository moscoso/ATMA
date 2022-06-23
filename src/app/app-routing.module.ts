import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
