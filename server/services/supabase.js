import { createClient } from '@supabase/supabase-js';
import { SupabaseError } from '../errors/SupabaseError.js';
import dotenv from 'dotenv';
dotenv.config();

const AVATAR_BUCKET = 'avatar';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const emptyFolder = async (bucket, folder) => {
    try {
        // get file list for folder
        const { data: fileList, error: fileListError } = await supabase.storage
            .from(bucket)
            .list(folder);
        if (fileListError) throw Error;
        // create array of files to delete
        const filePathArray = [];
        if (fileList && fileList.length > 0) {
            fileList.forEach((file) => {
                filePathArray.push(`${folder}/${file.name}`);
            });
        }
        // delete files
        if (filePathArray.length > 0) {
            const { error } = await supabase.storage
                .from(AVATAR_BUCKET)
                .remove(filePathArray);
            if (error) throw Error;
        }
    } catch (error) {
        throw SupabaseError('Unable to upload avatar');
    }
};

const uploadAvatar = async (userId, file) => {
    const folder = `user-${userId}`;
    const timestamp = Date.now();
    const ext = file.mimetype.split('/')[1];
    const path = `${folder}/avatar-${timestamp}.${ext}`;
    try {
        await emptyFolder(AVATAR_BUCKET, folder);
        const { error } = await supabase.storage
            .from(AVATAR_BUCKET)
            .upload(path, file.buffer, {
                contentType: `image/${ext}`,
                cacheControl: 3600,
                upsert: true,
            });
        if (error) throw Error;
        return getPublicUrl(AVATAR_BUCKET, path);
    } catch (error) {
        throw SupabaseError('Unable to upload avatar');
    }
};

const getPublicUrl = (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

export { uploadAvatar };
