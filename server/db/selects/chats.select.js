import { USER_SELECT_BASIC } from './user.select.js';

const CHATS_SELECT = {
    id: true,
    name: true,
    type: true,
    avatar: true,
    latestMessage: true,
    users: {
        select: USER_SELECT_BASIC,
    },
};

export { CHATS_SELECT };
