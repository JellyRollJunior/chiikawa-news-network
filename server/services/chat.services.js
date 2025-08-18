import { CHAT_TYPE } from "@prisma/client"

const isUserAuthorizedForChat = (chat, userId) => {
    if (chat.type == CHAT_TYPE.PUBLIC) return true;
    const isUserInChat = chat.users.some((user) => user.id == userId);
    return isUserInChat;
}

export { isUserAuthorizedForChat }