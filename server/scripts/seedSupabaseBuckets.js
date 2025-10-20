import { createClient } from '@supabase/supabase-js';
import { buckets } from '../adapters/supabase.client.js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const seedSupabaseBuckets = async () => {
    try {
        buckets.map(async (bucket) => {
            const { error } = await supabase.storage.getBucket(bucket);
            // if network error -> log unable to reach supabase
            // if actual error from server saying no bucket exists -> seed bucket
            if (error.message == 'fetch failed') {
                console.log(`Unable to verify supabase ${bucket} bucket status due to network error`);
            } else if (error) {
                const { data, error } = await supabase.storage.createBucket(bucket, { public: true });
                error
                    ? console.log(`Unable to seed ${bucket} bucket due to network error`)
                    : console.log(`Seeding ${bucket} bucket on Supabase`);
            }
        });
    } catch (error) {
        console.log('Unable to seed Supbase buckets');
    }
};

export { seedSupabaseBuckets };
