import dotenv from 'dotenv';
import * as userQueries from '../db/user.queries.js';
dotenv.config();

const seedGuestAccount = async () => {
    const guestUsername = process.env.GUEST_USERNAME;
    const guest = await userQueries.getUserByUsername(guestUsername);
    // create guest account if no guest
    if (!guest) {
        const newGuest = await userQueries.createUser(
            guestUsername,
            process.env.GUEST_PASSWORD
        );
        if (newGuest) console.log('Seeding guest account successful');
    }
};

export { seedGuestAccount };
