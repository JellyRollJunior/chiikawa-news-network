import { request } from './request.js';

const fetchPostFeed = async (signal, cursor, limit = 20) => {
    const endpoint = cursor
        ? `/posts/feed?cursor=${cursor}&limit=${limit}`
        : `/posts/feed?limit=${limit}`;
    const data = await request(endpoint, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

export { fetchPostFeed };
