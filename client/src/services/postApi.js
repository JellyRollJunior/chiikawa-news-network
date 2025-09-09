import { request } from './request.js';

const fetchPosts = async (signal, cursor, limit = 20) => {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (cursor) params.append('cursor', cursor);

    const data = request(`/posts?${params.toString()}`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

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

const createPostLike = async (signal, postId) => {
    const data = request(`/posts/${postId}/likes`, {
        mode: 'cors',
        method: 'POST',
        signal,
    });
    return data;
};

const deletePostLike = async (signal, postId) => {
    const data = request(`/posts/${postId}/likes`, {
        mode: 'cors',
        method: 'DELETE',
        signal,
    });
    return data;
};

export { fetchPosts, fetchPostFeed, createPostLike, deletePostLike };
