import { Component, Input } from '@angular/core';
import { AtmaEvent } from 'src/app/core/state/event/event.model';
import { HighlightIndices } from 'src/app/pipes/highlight-search.pipe';

@Component({
    'selector': 'atma-event-preview',
    'templateUrl': './event-preview.component.html',
    'styleUrls': ['./event-preview.component.scss'],
})
export class EventPreviewComponent {

    @Input() event: AtmaEvent;
    @Input() notes: string;
    @Input() highlights: HighlightIndices;

}
