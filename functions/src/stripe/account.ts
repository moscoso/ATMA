import { assert } from '../helpers';
import { auth, db, stripe } from '../config';
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import { getUserData } from '../user/user';
import { STRIPE_COLLECTION_NAME } from '.';

/**
 * Retrieve a Stripe account stored in Firestore
 * @param userID the unique identifier corresponding to the user in Firebase in Firebase
 */
export async function getAccount(userID: string) {
	const doc = await db.collection(STRIPE_COLLECTION_NAME).doc(userID).get();
	if(doc.exists) return doc.data() as FirebaseFirestore.DocumentData;
	else throw new functions.https.HttpsError('not-found', `userID '${userID}' does not exist in ${STRIPE_COLLECTION_NAME}`);
}

/**
 * Updates a Stripe account stored in Firestore non-destructively
 * @param userID the unique identifier corresponding to the user in Firebase
 * @param data a payload object to merge to the document
 */
export async function updateAccount(userID: string, data: object) {
    return db.collection(STRIPE_COLLECTION_NAME).doc(userID).set(data, { merge: true })
}

/**
 * Retrieves the user's Customer ID that is to be used with the Stripe API.
 * @param userID the unique identifier corresponding to the User in Firebase
 * @returns the customer's unique indentifier provided by Stripe
 */
export async function getCustomerID(userID: string): Promise < string >  {
    const user = await getAccount(userID);
    return assert(user, 'stripeCustomerID');
}

/**
 * Creates a Stripe customer account for a user
 * @param userID the unique identifier corresponding to the User in Firebase
 * @returns the Stripe Customer object of the user.
 */
export async function createCustomerAccount(userID: string): Promise < Stripe.Customer > {
    const user = await auth.getUser(userID);
    const customer: Stripe.Customer = await stripe.customers.create({
        email: user.email,
        metadata: { firebaseUserID: userID }
    })
    await updateAccount(userID, { 'stripeCustomerID': customer.id, 'email': user.email})
    return customer;
}

/**
 * Updates the user's customer account name in Stripe
 * @param userID the unique identifier corresponding to the user in Firebase
 * @returns the Stripe Customer object of the user.
 */
export async function updateCustomerAccountName(userID: string): Promise < Stripe.Customer > {
    const customerID = await getCustomerID(userID); 
    const user = await getUserData(userID);
    if(user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        return stripe.customers.update(customerID, {'name': fullName})
    } else {
        throw new functions.https.HttpsError('aborted', `profile document for userID ${userID} was undefined`);
    }
    
}

/**
 * Retrieves the user's customer account or creates a new one if it does not already exist.
 * @param userID the unique identifier corresponding to the user in Firebase
 * @returns the Stripe Customer object of the user.
 */
export async function getOrCreateCustomerAccount(userID: string): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    const user = await getAccount(userID);
    if (user && user.stripeCustomerID) {
        const customerID = user.stripeCustomerID;
        return stripe.customers.retrieve(customerID);
    } else {
        return createCustomerAccount(userID);
    }
}

// CLOUD FUNCTIONS

/**
 * Update a user's subscription status on their stripe account.
 * 
 * Trigger: `onWrite`
 */
export const updateSubscriptionStatus = functions.firestore.document(`${STRIPE_COLLECTION_NAME}/{userID}/subscriptions/{docID}`)
    .onWrite(async (change, context) => {
        const userID = context.params.userID;
        const subscription = change.after.data();
        if (subscription) {
            return updateAccount(userID, subscription.status);
        } else {
            throw new Error(`Could not update stripe account for ${userID}`)
        }
    })