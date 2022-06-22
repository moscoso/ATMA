import * as functions from 'firebase-functions';
import {  auth } from '../config';
import { assert, assertUID, catchErrors } from '../helpers';


/**
 * Reset a user's password
 * 
 * Trigger: `onCall`
 */
export const resetPassword = functions.https.onCall(async (data, context) => {
	const uid = assertUID(context)
	const password = assert(data, "password")
	return catchErrors(auth.updateUser(uid, {'password': password}));
});
