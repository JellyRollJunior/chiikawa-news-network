import { request } from './request.js';

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

export { login, signup };
