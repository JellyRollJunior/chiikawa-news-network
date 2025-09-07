import { request } from './request.js';

const fetchPostFeed = async (signal, cursor, limit = 20) => {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (cursor) params.append('cursor', cursor);

    const data = request(`/posts/feed?${params.toString()}`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

export { fetchPostFeed };
