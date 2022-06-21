import { Component } from '@angular/core';
import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';

@Component({
    'selector': 'atma-create-event',
    'templateUrl': './create-event.component.html',
    'styleUrls': ['./create-event.component.scss'],
})
export class CreateEventComponent {

    constructor(
        public exerciseService: AtmaEventFacade
    ) {}

    onSubmit(exercise: any) {
        this.exerciseService.create(exercise);
    }

}
