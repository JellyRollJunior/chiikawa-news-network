import { request } from './request.js';

const fetchPosts = async (signal, cursor, limit = 20) => {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (cursor) params.append('cursor', cursor);

    const data = await request(`/posts?${params.toString()}`, {
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

    const data = await request(`/posts/feed?${params.toString()}`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

const createPostLike = async (signal, postId) => {
    const data = await request(`/posts/${postId}/likes`, {
        mode: 'cors',
        method: 'POST',
        signal,
    });
    return data;
};

const deletePostLike = async (signal, postId) => {
    const data = await request(`/posts/${postId}/likes`, {
        mode: 'cors',
        method: 'DELETE',
        signal,
    });
    return data;
};

/* comments */
const fetchComments = async (signal, postId) => {
    const data = await request(`/posts/${postId}/comments`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

const createCommentLike = async (signal, commentId) => {
    const data = await request(`/comments/${commentId}/likes`, {
        mode: 'cors',
        method: 'POST',
        signal,
    });
    return data;
};

const deleteCommentLike = async (signal, commentId) => {
    const data = await request(`/comments/${commentId}/likes`, {
        mode: 'cors',
        method: 'DELETE',
        signal,
    });
    return data;
};

export {
    fetchPosts,
    fetchPostFeed,
    createPostLike,
    deletePostLike,
    fetchComments,
    createCommentLike,
    deleteCommentLike,
};
