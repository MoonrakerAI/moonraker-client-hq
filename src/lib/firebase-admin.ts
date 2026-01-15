import * as admin from 'firebase-admin';

/**
 * Hardened Firebase Admin Initializer
 * Designed for Next.js SSR on Firebase Hosting / Cloud Run
 */
function initializeAdmin() {
    // If already initialized, return the existing app
    if (admin.apps.length > 0) {
        return admin.apps[0];
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "moonraker-client-hq";
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    try {
        if (privateKey && clientEmail) {
            console.log(`[Firebase Admin] Trying Service Account Cert for: ${projectId}`);
            return admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
                projectId
            });
        }

        console.log(`[Firebase Admin] Trying Default App Initialiation for: ${projectId}`);
        // Try with projectId first
        return admin.initializeApp({ projectId });

    } catch (error: any) {
        console.error('[Firebase Admin] First attempt failed:', error.message);
        try {
            console.log('[Firebase Admin] Final attempt: Bare initializeApp()');
            return admin.initializeApp();
        } catch (finalError: any) {
            console.error('[Firebase Admin] TOTAL INITIALIZATION FAILURE:', finalError.message);
            return null;
        }
    }
}

/**
 * Lazy Getter for Firestore
 */
export const getAdminDb = () => {
    const app = initializeAdmin();
    if (!app) {
        const msg = "Firebase Admin SDK failed to initialize. Check if Firestore API is enabled and secrets are set.";
        console.error(`[Firebase Admin] ${msg}`);
        throw new Error(msg);
    }
    // Explicitly target the custom database ID
    return admin.firestore(app, "moonraker-client-hq");
};

export { admin };
