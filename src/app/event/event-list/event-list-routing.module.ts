import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListPage as EventListPage } from './event-list.page';

const routes: Routes = [
{
    'path': '',
    'component': EventListPage,
    // 'canActivate': [TrainerGuard],
},
{
    'path': ':id',
    'loadChildren': () => import('../event-detail/event-detail.module').then(m => m.EventDetailPageModule)
}, ];

@NgModule({
    'imports': [RouterModule.forChild(routes)],
    'exports': [RouterModule],
})
export class EventListPageRoutingModule {}
