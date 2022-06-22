import * as functions from 'firebase-functions';
import { db } from "../config";

async function createClientEvent(clientID: string, timestamp: FirebaseFirestore.Timestamp, eventType: string, docID: string) {
    const clientData = (await db.doc(`clients/${clientID}`).get()).data();

    if (clientData === null || clientData === undefined) {
        const errorMessage = `Event creation failed because client Data does not exist for ${clientID}`
        throw new Error(errorMessage);
    } else {
        return db.collection('events').add({
            'userID': clientID,
            'firstName': clientData.firstName,
            'timestamp': timestamp,
            'docID': docID,
            'type': eventType,
            'trainerID': clientData.assignedTrainer ? clientData.assignedTrainer.id : ''
        });
    }
}

export const onCreatedClient = functions.firestore.document(`clients/{clientID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;
    const clientID = context.params.clientID;
    return createClientEvent(userID, createTime, 'started-membership', clientID)
});



export const onCreatedCheckIn = functions.firestore.document(`check-ins/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const userID = change.data().userID;
    const docID = context.params.docID;
    return createClientEvent(userID, createTime, 'check-in', docID)
});

export const onCreatedReview = functions.firestore.document(`clients/{clientID}/reviews/{docID}`).onCreate(async (change, context) => {
    const createTime = change.createTime;
    const clientID = context.params.clientID;
    const docID = context.params.docID;
    return createClientEvent(clientID, createTime, 'review', docID);
});

export const onCreatedProgressPics = functions.firestore.document(`clients/{clientID}/progress-pics/{docID}`).onCreate(async (change,
    context) => {
    const createTime = change.createTime;
    const clientID = context.params.clientID;
    const docID = context.params.docID;
    return createClientEvent(clientID, createTime, 'progress-pic', docID);
});