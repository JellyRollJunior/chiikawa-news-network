import { request } from './request.js';

const fetchChats = async (signal) => {
    const data = await request('/chats', {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data.chats;
};

const fetchPublicChats = async (signal) => {
    const data = await request('/chats-public', {
        mode: 'cors',
        method: 'GET',
        signal
    })
    return data.chats;
}

const postChats = async (name, userIds) => {
    const data = await request('/chats', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            userIds,
        }),
    });
    return data;
};

const fetchChat = async (chatId, signal) => {
    const data = await request(`/chats/${chatId}`, {
        mode: 'cors',
        method: 'GET',
        signal,
    });
    return data;
};

const patchChat = async (chatId, name) => {
    const data = await request(`/chats/${chatId}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
        }),
    });
    return data;
};

const deleteChat = async (chatId) => {
    const data = await request(`/chats/${chatId}`, {
        mode: 'cors',
        method: 'DELETE',
    });
    return data;
};

export { fetchChats, fetchPublicChats, postChats, fetchChat, patchChat, deleteChat };
