const { createPractice } = require('./src/lib/actions/practices');
const { initializeOnboarding } = require('./src/lib/actions/onboarding');

async function testProvisioning() {
    console.log('--- TEST START: 123 Therapy ---');
    try {
        // 1. Create the practice
        const practice = await createPractice({
            name: '123 Therapy',
            email: 'test@123therapy.com',
            website: 'https://123therapy.com'
        });

        console.log(`Practice created with ID: ${practice.id}`);

        // 2. Initialize Onboarding (This triggers Drive provisioning)
        console.log('Initializing onboarding and Drive provisioning...');
        const result = await initializeOnboarding(practice.id);

        console.log('✅ Provisioning request sent!');
        console.log('Check your Google Drive for the "123 Therapy" folder.');
    } catch (err) {
        console.error('❌ Test failed:', err);
    }
}

testProvisioning();
