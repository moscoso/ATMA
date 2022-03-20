import {firebase} from '../config/firebase';
import {stripe} from '../config/stripe';

export const environment = {
    'production': true,
    'firebase': firebase,
    'stripePK': stripe.staging,
    'hostURL': 'https://atma.church'
};
