import dotenv from 'dotenv';
import * as userQueries from '../db/user.queries.js';
dotenv.config();

const seedGuestAccount = async () => {
    try {
        const guestUsername = process.env.GUEST_USERNAME;
        const guest = await userQueries.getUserByUsername(guestUsername);
        // create guest account if no guest
        if (!guest) {
            await userQueries.createUser(
                guestUsername,
                process.env.GUEST_PASSWORD
            );
            console.log('Seeding guest account');
        }
    } catch (error) {
        console.log('Unable to seed guest account');
    }
};

export { seedGuestAccount };
