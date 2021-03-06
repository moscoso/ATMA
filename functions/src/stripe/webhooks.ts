import { stripe, stripeCreateSubscriptionSignature, stripeUpdatedSubscriptionSignature } from '../config';
import * as functions from 'firebase-functions';
import { updateSubscriptionData, createSubscriptionData } from './subscriptions';
import { createMember } from '../member/member';
import Stripe from 'stripe';

/**
 * This file contains webhooks called by Stripe that can be configured here: 
 * https://dashboard.stripe.com/webhooks
 */

export async function subscriptionUpdatedHandler(data: any): Promise < FirebaseFirestore.WriteResult > {
    const customerID = data.customer;
    const subscriptionID = data.id;
    const customer = await stripe.customers.retrieve(customerID);

    if (customer.deleted) {
        throw new Error(`Cannot execute webhook because customer ${customerID} is deleted`)
    } else {
        const userID = customer.metadata.firebaseUserID;
        const subscription = await stripe.subscriptions.retrieve(subscriptionID);
        return updateSubscriptionData(userID, subscription)
    }
}

export async function subscriptionCreatedHandler(data: any): Promise < FirebaseFirestore.WriteResult > {
    const customerID = data.customer;
    const subscriptionID = data.id;

    const customer = await stripe.customers.retrieve(customerID);

    if (customer.deleted) {
        throw new Error(`Cannot execute webhook because customer ${customerID} is deleted`)
    } else {
        const userID = customer.metadata.firebaseUserID;
        const subscription = await stripe.subscriptions.retrieve(subscriptionID);
        await createMember(userID, subscription);
        let planID;
        try {
            planID = data && data[0] && data[0].price.id && data[0].price.id ? data[0].price.id : null;
        } catch {
            planID = null;
        }
        if (subscription.id === null) { throw new Error(`Subscription plan was null`) }
        return createSubscriptionData(userID, planID, subscription.id)
    }
}


/**
 * Constructs and verifies the signature of a Stripe Event from the provided details.
 * @param req - the http request to verify
 * @param 
 * @returns - Stripe object containing the API resource relevant to the event. 
 * @throws - Stripe.errors.StripeSignatureVerificationError if the signature can't be verified
 */
function verifyStripeEvent(req: functions.https.Request, signature: string): Stripe.Event.Data.Object {
    const sigHeader = req.headers['stripe-signature'];
    if (sigHeader === undefined) {
        throw new Error(`Stripe signature was undefined`);
    }

    const event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sigHeader,
        signature
    );
    return event.data.object;
}


/////// CLOUD FUNCTIONS ////////

/**
 * Webhook to create a subscription for a user's customer account
 */
export const subscriptionCreatedWebhook = functions.https.onRequest(
    async (req, res) => {
        console.log(`Subscription Created Invoked`);
        try {
            const data = verifyStripeEvent(req, stripeCreateSubscriptionSignature);
            subscriptionCreatedHandler(data).then((result) => {
                res.status(200).send(result);
            }).catch((reason) => {
                console.log(reason);
                res.status(400).send(reason);
            });
        } catch (err) {
            console.error(err);
            res.status(400).send(err);
        }
    }
);

/**
 * Webhook to update a subscription for a user's customer account
 */
 export const subscriptionUpdatedWebhook = functions.https.onRequest(
    async (req, res) => {
        try {
            const data = verifyStripeEvent(req, stripeUpdatedSubscriptionSignature);
            await subscriptionUpdatedHandler(data);
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.status(400).send(err);
        }
    }
);
