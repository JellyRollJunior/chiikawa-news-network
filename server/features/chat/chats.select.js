import { USER_SELECT_BASIC } from '../users/user.select.js';

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

const CHAT_META_DATA_SELECT = {
    id: true,
    name: true,
    type: true,
    avatar: true,
    users: {
        select: USER_SELECT_BASIC,
    },
};

const MESSAGE_SELECT = {
    id: true,
    content: true,
    sendTime: true,
    sender: {
        select: {
            id: true,
            username: true,
            avatar: true,
        },
    },
};

const CHAT_MESSAGES_SELECT = {
    messages: {
        select: MESSAGE_SELECT,
        orderBy: {
            sendTime: 'asc',
        },
    },
    users: {
        select: USER_SELECT_BASIC,
    },
};

export {
    CHATS_SELECT,
    CHAT_META_DATA_SELECT,
    CHAT_MESSAGES_SELECT,
    MESSAGE_SELECT,
};
