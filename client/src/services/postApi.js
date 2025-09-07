import { request } from './request.js';

const fetchPostFeed = async (signal, cursor, limit = 20) => {
    const data = await request(`/posts/feed?cursor=${cursor}&limit=${limit}`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

export { fetchPostFeed };
