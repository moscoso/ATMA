import {firebase} from '../config/firebase';
import {stripe} from '../config/stripe';

export const environment = {
    'production': true,
    'firebase': firebase,
    'stripePK': stripe.production,
    'hostURL': 'https://atma.church'
};
