import { ATMA_EVENT_INIT_MODEL, AtmaEvent } from 'src/app/core/state/event/event.model';
import { HighlightIndices } from 'src/app/pipes/highlight-search.pipe';
import { Component, Input } from '@angular/core';

@Component({
    'selector': 'atma-event-preview',
    'templateUrl': './event-preview.component.html',
    'styleUrls': ['./event-preview.component.scss'],
})
export class EventPreviewComponent {

    @Input() event: AtmaEvent = ATMA_EVENT_INIT_MODEL;
    @Input() notes: string;
    @Input() highlights: HighlightIndices;


	getMonthName(month: number) {
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  			"July", "Aug", "Sept", "Oct", "Nov", "Decr"
		];
		return monthNames[month];
	}

	getDayName(day: number) {
		const dayNames = ["Sunday","Monday", "Tuesday", "Wenesday", "Thursay", "Friday", "Saturday"];
		return dayNames[day];
	}
}
