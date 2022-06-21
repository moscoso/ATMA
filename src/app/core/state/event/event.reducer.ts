import { AtmaEventAction, AtmaEventActionType } from './event.actions';
import { eventAdapter, EventState, EVENTS_INIT_STATE } from './event.state';


export function eventReducer(state: EventState = EVENTS_INIT_STATE, action: AtmaEventAction): EventState {
    switch (action.type) {
        case AtmaEventActionType.AllRequested:
        case AtmaEventActionType.CreateRequested:
        case AtmaEventActionType.UpdateRequested:
        case AtmaEventActionType.DeleteRequested:
        case AtmaEventActionType.RefreshAllRequested:
        case AtmaEventActionType.RefreshOneRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case AtmaEventActionType.AllLoaded:
            return eventAdapter.setAll(action.events, {
                ...state,
                'requestInProgress': false,
            });
        case AtmaEventActionType.OneLoaded:
            return eventAdapter.setOne(action.event, {
                ...state,
                'requestInProgress': false,
            });
        case AtmaEventActionType.Created:
            return eventAdapter.addOne(action.event, {
                ...state,
                'requestInProgress': false,
            });
        case AtmaEventActionType.Updated:
            return eventAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case AtmaEventActionType.Deleted:
            return eventAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
            });
        case AtmaEventActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}
