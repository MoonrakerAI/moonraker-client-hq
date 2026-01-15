import { google } from "googleapis";

const SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets",
];

const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });
const docs = google.docs({ version: "v1", auth });

/**
 * Creates a unique client folder in Google Drive
 */
export async function createClientFolder(clientName: string) {
    try {
        const fileMetadata = {
            name: `[CLIENT] ${clientName}`,
            mimeType: "application/vnd.google-apps.folder",
            parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID!],
        };

        const folder = await drive.files.create({
            requestBody: fileMetadata,
            fields: "id, webViewLink",
        });

        return folder.data;
    } catch (error) {
        console.error("Google Drive Error:", error);
        throw error;
    }
}

/**
 * Creates an intake document in the client folder
 */
export async function createIntakeDoc(folderId: string, clientName: string, intakeData: any) {
    try {
        const doc = await docs.documents.create({
            requestBody: {
                title: `Intake Info - ${clientName}`,
            },
        });

        const docId = doc.data.documentId!;

        // Move the doc to the client folder
        await drive.files.update({
            fileId: docId,
            addParents: folderId,
            removeParents: "root", // Default parent
            fields: "id, parents",
        });

        // Add content to the doc (basic template)
        await docs.documents.batchUpdate({
            documentId: docId,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            location: { index: 1 },
                            text: `Client Intake Information\n\nClient Name: ${clientName}\nDate: ${new Date().toLocaleDateString()}\n\nRaw Intake Data:\n${JSON.stringify(intakeData, null, 2)}`,
                        },
                    },
                ],
            },
        });

        return doc.data;
    } catch (error) {
        console.error("Google Docs Error:", error);
        throw error;
    }
}
