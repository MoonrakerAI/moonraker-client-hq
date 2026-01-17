import { google } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

export const isDriveConfigured = Boolean(
    process.env.GOOGLE_CLIENT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID
);

export async function getDriveClient() {
    if (!isDriveConfigured) {
        throw new Error('Google Drive credentials or parent folder ID missing');
    }
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '')
        .split(/\\n/)
        .join('\n')
        .replace(/\"/g, '')
        .trim();

    // Ensure it has the correct header/footer
    const formattedKey = privateKey.includes('-----BEGIN PRIVATE KEY-----')
        ? privateKey
        : `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: formattedKey,
        scopes: ['https://www.googleapis.com/auth/drive']
    });
    return google.drive({ version: 'v3', auth });
}

export async function createClientFolder(practiceName: string, clientEmail?: string) {
    const drive = await getDriveClient();
    const parentId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;

    if (!parentId) {
        throw new Error('GOOGLE_DRIVE_PARENT_FOLDER_ID is not set');
    }

    // 1. Create Root Folder
    const rootFolderMetadata = {
        name: practiceName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
    };

    const rootFolder = await drive.files.create({
        requestBody: rootFolderMetadata,
        fields: 'id, webViewLink',
    });

    const rootFolderId = rootFolder.data.id;
    if (!rootFolderId) throw new Error('Failed to create root folder');

    // Apply color via update (more reliable for some folder properties)
    await drive.files.update({
        fileId: rootFolderId,
        requestBody: {
            folderColorRgb: '#72d572', // Sea Foam
        }
    });

    // 2. Create Sub-folders
    const subfolders = [
        'Docs',
        'Headshots',
        'Logos',
        'Other',
        'Pics',
        'Vids'
    ];

    const subfolderIds: Record<string, string> = {};

    for (const name of subfolders) {
        const subfolder = await drive.files.create({
            requestBody: {
                name,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [rootFolderId],
            },
            fields: 'id',
        });

        if (subfolder.data.id) {
            subfolderIds[name] = subfolder.data.id;
            // Apply color to subfolder as well
            await drive.files.update({
                fileId: subfolder.data.id,
                requestBody: {
                    folderColorRgb: '#72d572', // Sea Foam
                }
            });
        }
    }

    // 3. Share with client if email is provided
    if (clientEmail) {
        try {
            await drive.permissions.create({
                fileId: rootFolderId,
                requestBody: {
                    type: 'user',
                    role: 'writer',
                    emailAddress: clientEmail,
                },
            });
        } catch (shareError: any) {
            console.warn(`Could not share folder with ${clientEmail}:`, shareError.message);
        }
    }

    return {
        rootFolderId,
        webViewLink: rootFolder.data.webViewLink,
        subfolderIds
    };
}

export async function uploadFileToFolder(folderId: string, fileName: string, fileBuffer: Buffer, mimeType: string) {
    const drive = await getDriveClient();

    const requestBody = {
        name: fileName,
        parents: [folderId],
    };

    const media = {
        mimeType: mimeType,
        body: Readable.from(fileBuffer),
    };

    const response = await drive.files.create({
        requestBody,
        media: media,
        fields: 'id, webViewLink',
    });

    return response.data;
}
