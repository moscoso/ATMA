import { clientsAdapter, ClientsState, CLIENTS_INIT_STATE } from './client.state';
import { ClientAction, ClientActionType } from './client.actions';

export function clientsReducer(state: ClientsState = CLIENTS_INIT_STATE, action: ClientAction): ClientsState {
    switch (action.type) {
        case ClientActionType.AllRequested:
        case ClientActionType.AssignTrainerRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ClientActionType.AllLoaded:
            return clientsAdapter.setAll(action.clients, {
                ...state,
                'requestInProgress': false,
                'initialized': true,
            });
        case ClientActionType.TrainerAssigned:
            return clientsAdapter.updateOne({ 'id': action.id, 'changes': { 'assignedTrainer': action.trainer } }, {
                ...state,
                'requestInProgress': false,
            });
        case ClientActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}
