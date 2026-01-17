
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function verifyData() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Environment variables missing');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('--- Database Verification ---');

    const { count: practiceCount, error: pError } = await supabase
        .from('practices')
        .select('*', { count: 'exact', head: true });

    if (pError) console.error('Practices error:', pError.message);
    else console.log('Practices count:', practiceCount);

    const { count: taskCount, error: tError } = await supabase
        .from('workflow_tasks')
        .select('*', { count: 'exact', head: true });

    if (tError) console.error('Tasks error:', tError.message);
    else console.log('Tasks count:', taskCount);
}

verifyData();
