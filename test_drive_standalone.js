require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');
const { Readable } = require('stream');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function getDriveClient() {
    const auth = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        SCOPES
    );
    return google.drive({ version: 'v3', auth });
}

async function runTest() {
    console.log('--- TEST START: 123 Therapy ---');
    const practiceName = '123 Therapy';
    const parentId = '1dymrrowTe1szsOJJPf45x4qDUit6J5jB';

    try {
        const drive = await getDriveClient();

        // 1. Create Root Folder
        console.log('Creating root folder...');
        const rootRes = await drive.files.create({
            requestBody: {
                name: practiceName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [parentId],
            },
            fields: 'id, webViewLink',
        });
        const rootId = rootRes.data.id;
        console.log(`✅ Root created: ${rootId}`);

        // 2. Create Sub-folders
        const subs = ['Docs', 'Headshots', 'Logos', 'Other', 'Pics', 'Vids'];
        for (const name of subs) {
            await drive.files.create({
                requestBody: {
                    name,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: [rootId],
                },
            });
            console.log(`   - Created sub: ${name}`);
        }

        console.log('\n--- SUCCESS ---');
        console.log(`Link: ${rootRes.data.webViewLink}`);
        console.log('Check your Google Drive now!');

    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

runTest();
