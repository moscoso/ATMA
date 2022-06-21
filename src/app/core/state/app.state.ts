import { EventState } from './event/event.state';
import { CustomRouterReducerState } from './router/router.state';
import { ProfilesState } from './profile/profile.state';
import { CheckInsState } from './check-in/check-in.state';
import { ClientsState } from './client/client.state';
import { ChatState } from './chat/chat.state';
import { AuthModel } from './auth/auth.model';

export interface AppState {
    'auth': AuthModel;
    'chat': ChatState;
    'clients': ClientsState;
    'check-ins': CheckInsState;
    'events': EventState;
    'profiles': ProfilesState;
    'router': CustomRouterReducerState;
}
