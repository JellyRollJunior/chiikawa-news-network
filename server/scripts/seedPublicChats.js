import * as publicChatQueries from '../db/publicChat.queries.js';

const seedPublicChats = async () => {
    try {
        let chats = await publicChatQueries.getPublicChats();
        if (!chats || chats.length == 0) {
            chats = await Promise.all([
                await publicChatQueries.createPublicChat('Global Chat (o･ω･o)'),
            ]);
            console.log('Seeding public chats');
        }
        return chats;
    } catch (error) {
        console.log('Unable to seed public chats');
    }
};

export { seedPublicChats };
