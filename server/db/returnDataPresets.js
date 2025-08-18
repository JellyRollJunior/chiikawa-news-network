const USERS_INCLUDE = {
    password: false,
};

const CHATS_INCLUDE = {
    signature: false,
    messages: false,
    latestMessageId: false,
    users: {
        include: USERS_INCLUDE,
    },
    latestMessage: true,
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

export { USERS_INCLUDE, CHATS_INCLUDE, MESSAGE_SELECT };
