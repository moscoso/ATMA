import Stripe from 'stripe';
import { auth, db } from '../config';
import { getCount, incrementCounter } from '../counter/distributed_counter';
import { getUserData } from '../user/user';

const COLLECTION_NAME = `members`;

/**
 * Creates a Firebase document in the members collection that corresponds with an existing user 
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param subscription the Subscription created to start a membership for the client 
 */
export async function createMember(userID: string, subscription: Stripe.Subscription) {
    const shortID: number = await getCount(COLLECTION_NAME) + 1;
    return db.runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
        await incrementCounter(COLLECTION_NAME, transaction);
        const user = await auth.getUser(userID);
        const profile = getUserData(userID);

        if (!profile) {
            console.warn(`Could not retrieve profile data for ${user.email}. ID: ${user.uid}`);
        }

        const memberDocReference: FirebaseFirestore.DocumentReference = db.doc(`${COLLECTION_NAME}/${userID}`);
        return transaction.set(memberDocReference, {
            ...profile,
			userID,
			clientID: shortID,
			email: user.email,
			subscription: subscription.status
        });
    })
}





