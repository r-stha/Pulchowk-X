import admin from 'firebase-admin';
import ENV from '../config/ENV.js';
import fs from 'fs';
import path from 'path';

let isFirebaseInitialized = false;

function initializeFirebase() {
    try {
        const keyPath = ENV.FIREBASE_SERVICE_ACCOUNT_PATH;

        if (!keyPath) {
            console.warn('Firebase Service Account Path not set. Automated notifications disabled.');
            return;
        }

        const absolutePath = path.isAbsolute(keyPath)
            ? keyPath
            : path.join(process.cwd(), keyPath);

        if (!fs.existsSync(absolutePath)) {
            console.warn(`Firebase Service Account file not found at ${absolutePath}. Automated notifications disabled.`);
            return;
        }

        const serviceAccount = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        isFirebaseInitialized = true;
        console.log('Firebase Admin SDK initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize Firebase Admin SDK:', error);
    }
}

// Initialize on load
initializeFirebase();

export const sendEventNotification = async (event: any) => {
    if (!isFirebaseInitialized) {
        console.warn('Cannot send notification: Firebase not initialized.');
        return;
    }

    const topic = 'events';

    const message = {
        notification: {
            title: 'New Event Published!',
            body: `${event.title} is now open for registration.`,
        },
        data: {
            eventId: event.id.toString(),
            type: 'new_event',
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
        topic: topic,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent notification:', response);
        return response;
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
