import { request } from '@/shared/services/request.js';

const fetchCurrent = async (signal) => {
    const data = await request('/current', {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

const fetchUsers = async (signal) => {
    const data = await request('/users', {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

const fetchUser = async (signal, userId) => {
    const data = await request(`/users/${userId}`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

const patchUserBio = async (bio) => {
    const data = await request(`/current/bio`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bio,
        }),
    });
    return data;
};

const patchUserAvatar = async (fileFormData) => {
    const data = await request(`/current/avatar`, {
        mode: 'cors',
        method: 'PATCH',
        body: fileFormData,
    });
    return data;
};

const postFollowing = async (signal, userId) => {
    const data = await request(`/users/${userId}/following`, {
        mode: 'cors',
        method: 'POST',
        signal,
    });
    return data;
};

const deleteFollowing = async (signal, userId) => {
    const data = await request(`/users/${userId}/following`, {
        mode: 'cors',
        method: 'DELETE',
        signal,
    });
    return data;
};

export {
    fetchCurrent,
    fetchUsers,
    fetchUser,
    patchUserBio,
    patchUserAvatar,
    postFollowing,
    deleteFollowing
};
