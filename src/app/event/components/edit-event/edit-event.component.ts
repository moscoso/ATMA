import { Component } from '@angular/core';

import { AtmaEventFacade } from 'src/app/core/state/event/event.facade';

@Component({
    'selector': 'atma-edit-event',
    'templateUrl': './edit-event.component.html',
    'styleUrls': ['./edit-event.component.scss'],
})
export class EditEventComponent {
    constructor(
        public exerciseService: AtmaEventFacade
    ) {}

    onSubmit(exercise: any) {
        this.exerciseService.update(exercise.id, exercise);
    }
}
