import { request } from './request.js';

const fetchCurrent = async (signal) => {
    const data = await request(
        '/current',
        {
            mode: 'cors',
            method: 'GET',
            signal,
        },
        true
    );
    return data;
};

const fetchUsers = async (signal) => {
    const data = await request(
        '/users',
        {
            mode: 'cors',
            method: 'GET',
            signal,
        },
        true
    );
    return data;
};

const fetchUser = async (signal, userId) => {
    const data = await request(
        `/users/${userId}`,
        {
            mode: 'cors',
            method: 'GET',
            signal,
        },
        true
    );
    return data;
};

const patchUserBio = async (userId, bio) => {
    const data = await request(
        `/users/${userId}`,
        {
            mode: 'cors',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bio,
            }),
        },
        true
    );
    return data;
};

const patchUserAvatar = async (userId, fileFormData) => {
    const data = await request(
        `/users/${userId}/avatar`,
        {
            mode: 'cors',
            method: 'PATCH',
            body: fileFormData,
        },
        true
    );
    return data;
};

export { fetchCurrent, fetchUsers, fetchUser, patchUserBio, patchUserAvatar };
