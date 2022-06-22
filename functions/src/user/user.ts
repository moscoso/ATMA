import { db, auth } from '../config';
import { assert, catchErrors } from '../helpers';
import * as functions from 'firebase-functions';

const COLLECTION_NAME = "profiles";

export async function getUserData(userID: string): Promise <FirebaseFirestore.DocumentData | undefined> {
    return (await db.doc(`${COLLECTION_NAME}/${userID}`).get()).data();
}

async function createUserAndSetProfile(profile: any, password: string): Promise<FirebaseFirestore.WriteResult> {
    return auth.createUser({'email': profile.email, password}).then(authorizedUser => {
        profile.id = authorizedUser.uid;
        return db.collection(COLLECTION_NAME).doc(authorizedUser.uid).set(profile);
    });
}

// CLOUD FUNCTIONS

/**
 * Create an auth user and set user data at the same time
 * 
 * Trigger: onCall
 */
export const createUserAndProfile = functions.https.onCall(async (data, _context) => {
    const profile = assert(data, 'profile');
    const password = assert(data, 'password');

    return catchErrors(createUserAndSetProfile(profile, password));
});