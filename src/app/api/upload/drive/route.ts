import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { uploadFileToFolder } from '@/lib/google-drive';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const practiceId = formData.get('practiceId') as string;
        const category = formData.get('category') as string; // e.g., 'Logos', 'Headshots'

        if (!file || !practiceId || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = getServiceSupabase();

        // 1. Get the Drive sub-folder mapping for this practice
        const { data: state, error: stateError } = await supabase
            .from('onboarding_state')
            .select('google_drive_subfolders')
            .eq('practice_id', practiceId)
            .single();

        if (stateError || !state) {
            return NextResponse.json({ error: 'Practice onboarding state not found' }, { status: 404 });
        }

        const folderId = state.google_drive_subfolders?.[category];

        if (!folderId) {
            return NextResponse.json({ error: `Folder for category "${category}" not found` }, { status: 400 });
        }

        // 2. Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3. Upload to Drive
        const uploadResult = await uploadFileToFolder(
            folderId,
            file.name,
            buffer,
            file.type
        );

        return NextResponse.json({
            success: true,
            fileId: uploadResult.id,
            link: uploadResult.webViewLink
        });

    } catch (err: any) {
        console.error('Upload Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
