import { request } from '@/services/request.js';

const login = async (username, password) => {
    const data = await request(
        '/login',
        {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        },
        false
    );
    return data;
};

const guestLogin = async () => {
    const data = await request(
        '/guest-login',
        {
            mode: 'cors',
            method: 'POST',
        },
        false
    );
    return data;
};

const signup = async (username, password) => {
    const data = await request(
        '/signup',
        {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        },
        false
    );
    return data;
};

export { login, guestLogin, signup };
