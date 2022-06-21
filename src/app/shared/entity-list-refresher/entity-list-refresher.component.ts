import { Component, Input } from '@angular/core';
import { firstRequestComplete } from 'src/util/operator/Operators';

@Component({
    'selector': 'entity-list-refresher',
    'templateUrl': './entity-list-refresher.component.html',
    'styleUrls': ['./entity-list-refresher.component.scss'],
})
export class EntityListRefresherComponent {

    @Input() entityService: any;

    ready = true;

    doRefresh(event): void {
        this.refresh();

        this.entityService.selectRequestInProgress().pipe(firstRequestComplete).toPromise()
                .then(() => { event.target.complete(); });

    }

    refresh(): void {
        this.entityService.refreshAll();
    }

}
