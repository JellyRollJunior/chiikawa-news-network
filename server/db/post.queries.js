import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getPosts = async () => {
    try {
        const data = await prisma.post.findMany();
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve posts');
    }
};

export { getPosts };
