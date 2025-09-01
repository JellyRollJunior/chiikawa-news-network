import * as publicChatQueries from '../db/publicChat.queries.js';

const seedPublicChats = async () => {
    let chats = await publicChatQueries.getPublicChats();
    if (!chats || chats.length == 0) {
        chats = await Promise.all([
            await publicChatQueries.createPublicChat('Global Chat (o･ω･o)'),
        ]);
        console.log('Seeding public chats successful')
    }
    return chats;
};

export { seedPublicChats };
