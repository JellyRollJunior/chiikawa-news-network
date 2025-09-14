import { request } from './request.js';

const fetchPosts = async (signal, cursor, limit = 20, userId = null) => {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (cursor) params.append('cursor', cursor);
    if (userId) params.append('userId', userId);

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

const createPost = async (signal, title, content, media = null) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (media) formData.append('media', media);
    const data = await request(`/posts`, {
        mode: 'cors',
        method: 'POST',
        body: formData,
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

const deletePost = async (signal, postId) => {
    const data = await request(`/posts/${postId}`, {
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

const createComment = async (signal, postId, content) => {
    const data = await request(`/posts/${postId}/comments`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content,
        }),
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

const deleteComment = async (signal, commentId) => {
    const data = await request(`/comments/${commentId}`, {
        mode: 'cors',
        method: 'DELETE',
        signal,
    });
    return data;
};

export {
    fetchPosts,
    fetchPostFeed,
    createPost,
    createPostLike,
    deletePostLike,
    deletePost,
    fetchComments,
    createComment,
    createCommentLike,
    deleteCommentLike,
    deleteComment,
};
