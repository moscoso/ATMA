import { Action } from '@ngrx/store';
import { AtmaEvent } from './event.model';

export enum AtmaEventActionType {
    /* FetchAllFromServerRequested, // Try this after we check the cache
    FetchAllFromCacheRequested, // Try this first when all requested or FetchAllFromServerRequested fails,
    // but skip this if it was checked in the last 24 hours?
    FetchOneFromServerRequested, // Do this when you visit the entity detail
    FetchOneFromCacheRequested, // Do this if fetch one from server fails,*/
    AllRequested = '[Event List] Events Requested',
    OneRequested = '[Event Detail Page] One Event Requested',
    RefreshAllRequested = '[Event List Referesher] All Events Refresh Requested',
    RefreshOneRequested = '[Event List Referesher] One Event Refresh Requested',
    AllLoaded = '[Event Service] All Events Loaded',
    OneLoaded = '[Event Service] One Event Loaded',
    Selected = '[Events Page] Event Selected',
    CreateRequested = '[Create Event Page] Create Event Requested',
    Created = '[Events Effect] Event Created',
    UpdateRequested = '[Event Service] Edit Event Requested',
    Updated = '[Edit Event Page] Event Updated',
    DeleteRequested = '[Edit Event Page] Delete Event Requested',
    Deleted = '[Events Effect] Event Deleted',
    RequestFailed = '[Event Service] Request Failed',
}

export class AllRequested implements Action {
    readonly type = AtmaEventActionType.AllRequested;
}

export class RefreshAllRequested implements Action {
    readonly type = AtmaEventActionType.RefreshAllRequested;
}

export class RefreshOneRequested implements Action {
    readonly type = AtmaEventActionType.RefreshOneRequested;
    constructor(
        public id: string
    ) {}
}

export class AllLoaded implements Action {
    readonly type = AtmaEventActionType.AllLoaded;
    constructor(
        public events: AtmaEvent[],
    ) {}
}

export class OneLoaded implements Action {
    readonly type = AtmaEventActionType.OneLoaded;
    constructor(
        public event: AtmaEvent
    ) {}
}

export class RequestFailed implements Action {
    readonly type = AtmaEventActionType.RequestFailed;
    constructor(public error: any) {}
}

export class Created implements Action {
    readonly type = AtmaEventActionType.Created;
    constructor(
        public event: AtmaEvent,
    ) {}
}

export class CreateRequested implements Action {
    readonly type = AtmaEventActionType.CreateRequested;
    constructor(
        public event: AtmaEvent,
    ) {}
}

export class Updated implements Action {
    readonly type = AtmaEventActionType.Updated;
    constructor(
        public id: string,
        public changes: Partial < AtmaEvent > ,
    ) {}
}

export class UpdateRequested implements Action {
    readonly type = AtmaEventActionType.UpdateRequested;
    constructor(
        public id: string,
        public changes: Partial < AtmaEvent > ,
    ) {}
}

export class Deleted implements Action {
    readonly type = AtmaEventActionType.Deleted;
    constructor(
        public id: string,
    ) {}
}

export class DeleteRequested implements Action {
    readonly type = AtmaEventActionType.DeleteRequested;
    constructor(
        public id: string,
    ) {}
}

/**
 * All of the actions related to Events
 */
export type AtmaEventAction =
    AllRequested |
    AllLoaded |
    OneLoaded |
    CreateRequested |
    Created |
    Updated |
    UpdateRequested |
    Deleted |
    DeleteRequested |
    RefreshAllRequested |
    RefreshOneRequested |
    RequestFailed;
