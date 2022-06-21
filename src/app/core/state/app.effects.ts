import { AuthEffects } from './auth/auth.effects';
import { AtmaEventEffects } from './event/event.effects';
import { ProfileEffects } from './profile/profile.effects';
import { CheckInEffects } from './check-in/check-in.effects';
import { ClientEffects } from './client/client.effects';
import { ChatEffects } from './chat/chat.effects';

export const appEffects = [
    AuthEffects,
    ChatEffects,
    CheckInEffects,
    ClientEffects,
    AtmaEventEffects,
    ProfileEffects,
];
