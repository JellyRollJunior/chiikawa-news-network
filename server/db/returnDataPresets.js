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

export { USERS_INCLUDE, CHATS_INCLUDE };
