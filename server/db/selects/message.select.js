import { USER_SELECT_BASIC } from "./user.select.js";

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
    id: true,
    name: true,
    type: true,
    avatar: true,
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

export { MESSAGE_SELECT, CHAT_MESSAGES_SELECT };
