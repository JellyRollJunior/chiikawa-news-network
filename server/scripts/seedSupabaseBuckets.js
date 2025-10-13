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
            if (error) {
                const { data, error } = await supabase.storage.createBucket(
                    bucket,
                    {
                        public: true,
                    }
                );
                console.log(`Seeding ${bucket} bucket on Supabase`);
            }
        });
    } catch (error) {
        console.log('Unable to seed Supbase buckets');
    }
};

export { seedSupabaseBuckets };
