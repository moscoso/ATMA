import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TatiPage } from './tati.page';

const routes: Routes = [
	{
		'path': '',
		'component': TatiPage
	}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TatiPageRoutingModule {}
