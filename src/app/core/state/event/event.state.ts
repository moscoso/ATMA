import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AtmaEvent } from './event.model';

/**
 * EventState is represented by an {@link EntityState} that includes 
 * a dictionary of {@link AtmaEvent} and the list of ids that corresponds to each event
 */
export interface EventState extends EntityState < AtmaEvent > {
    requestInProgress: boolean;
    error: any | null;
}

export const eventAdapter = createEntityAdapter < AtmaEvent > ({
    'selectId': event => event.id,
    'sortComparer': sortByName,
});

export function sortByName(a: AtmaEvent, b: AtmaEvent): number {
    return a.name.localeCompare(b.name);
}

export const EVENTS_INIT_STATE: EventState = eventAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
