import { USER_SELECT } from './user.select.js';

const CHATS_SELECT = {
    id: true,
    name: true,
    type: true,
    avatar: true,
    latestMessage: true,
    users: {
        select: USER_SELECT,
    },
};

export { CHATS_SELECT };
