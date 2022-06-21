import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { eventReducer } from './event/event.reducer';
import { profilesReducer } from './profile/profile.reducer';
import { checkInsReducer } from './check-in/check-in.reducer';
import { clientsReducer } from './client/client.reducer';
import { chatReducer } from './chat/chat.reducer';

/**
 * The root reducer for the app's ngrx/store
 */
export const appReducers: ActionReducerMap < AppState > = {
    'auth': authReducer,
    'chat': chatReducer,
    'clients': clientsReducer,
    'check-ins': checkInsReducer,
    'events': eventReducer,
    'profiles': profilesReducer,
    'router': routerReducer,
};


