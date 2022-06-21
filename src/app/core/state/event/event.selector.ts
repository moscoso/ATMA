
import { eventAdapter, EventState } from './event.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { selectParams } from '../router/router.selectors';
import { Params } from '@angular/router';
import { AtmaEvent } from './event.model';

/**
 * Gets the top-level state property named 'events' of the store tree.
 */
export const selectState = createFeatureSelector < EventState > ('events');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = eventAdapter.getSelectors(selectState);

/**
 * Select an {@link AtmaEvent} by ID
 * @param ID the unique identifier correseponding to the event
 */
export const selectByID = (ID: string) => createSelector(
    selectState,
    (state: EventState) => state.entities[ID]
);


/**
 * Use the router state's URL to select an {@link AtmaEvent} by ID.
 */
export const selectByRouteURL = createSelector(
    selectEntities,
    selectParams,
    (entities: Dictionary<AtmaEvent>, params: Params) => {
        const entityID = params.id;
        return entities[entityID];
    }
);

/**
 * Select a boolean that indicates a request is in progress
 */
export const selectRequestInProgress = createSelector(
    selectState,
    (state: EventState) => state.requestInProgress
);
