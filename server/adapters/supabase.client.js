import { createClient } from '@supabase/supabase-js';
import { SupabaseError } from '../errors/SupabaseError.js';
import dotenv from 'dotenv';
dotenv.config();

const AVATAR_BUCKET = 'avatar';
const POSTS_BUCKET = 'posts';
const buckets = [AVATAR_BUCKET, POSTS_BUCKET];
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getPublicUrl = (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

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

const uploadFile = async (folderPath, file, bucket) => {
    const timestamp = Date.now();
    const ext = file.mimetype.split('/')[1];
    const path = `${folderPath}/${timestamp}.${ext}`;
    await emptyFolder(bucket, folderPath);
    const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file.buffer, {
            contentType: `image/${ext}`,
            cacheControl: 3600,
            upsert: true,
        });
    if (error) throw Error;
    return getPublicUrl(bucket, path);
};

const uploadAvatar = async (userId, file) => {
    try {
        const folderPath = `user-${userId}`;
        const fileUrl = uploadFile(folderPath, file, AVATAR_BUCKET)
        return fileUrl;
    } catch (error) {
        throw SupabaseError('Unable to upload avatar');
    }
};

const uploadPostMedia = async (userId, postId, file) => {
    try {
        const folderPath = `user-${userId}/post-${postId}`;
        const fileUrl = uploadFile(folderPath, file, POSTS_BUCKET)
        return fileUrl;
    } catch (error) {
        throw SupabaseError('Unable to upload post media');
    }
};

export { buckets, uploadAvatar, uploadPostMedia };
