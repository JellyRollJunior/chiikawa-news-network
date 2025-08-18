import * as publicChatQueries from '../db/publicChat.queries.js';

const getPublicChats = async (req, res, next) => {
    try {
        const data = await publicChatQueries.getPublicChats();
        res.json({chats: data});
    } catch (error) {
        next(error);
    }
};

export { getPublicChats };
