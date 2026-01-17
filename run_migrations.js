require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const migrationFile = process.argv[2];

if (!migrationFile) {
    console.error('Please provide a migration file path.');
    process.exit(1);
}

const connectionString = process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
    console.error('POSTGRES_URL_NON_POOLING is not set.');
    process.exit(1);
}

async function runMigration() {
    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log(`Running migration: ${migrationFile}`);
        const sql = fs.readFileSync(path.resolve(migrationFile), 'utf8');
        await client.query(sql);
        console.log('✅ Migration successful!');
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    } finally {
        await client.end();
    }
}

runMigration();
