import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';
import { USER_SELECT } from './selects/user.select.js';

const prisma = new PrismaClient();

const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to fetch user');
    }
};

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
            select: USER_SELECT,
        });
        if (!user) throw new Error('404');
        return user;
    } catch (error) {
        if (error.message == '404') {
            const notFoundError = new Error('User not found');
            notFoundError.status = 404;
            notFoundError.name = 'QueryError';
            throw notFoundError;
        }
        throw new DatabaseError('Unable to fetch user');
    }
};

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                username: 'asc',
            },
            select: USER_SELECT,
        });
        return users;
    } catch (error) {
        throw new DatabaseError('Unable to fetch users');
    }
};

const createUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });
        return user;
    } catch (error) {
        if (error.code == 'P2002') {
            // P2002: a unique constraint failed error
            throw new DatabaseError('Username is already taken.', 409);
        }
        throw new DatabaseError('Unable to insert user');
    }
};

const updateBio = async (id, bio) => {
    try {
        const user = await prisma.user.update({
            data: {
                bio,
            },
            where: {
                id,
            },
            select: USER_SELECT,
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to update bio');
    }
};

const updateAvatar = async (id, avatarSrc) => {
    try {
        const user = await prisma.user.update({
            data: {
                avatar: avatarSrc,
            },
            where: {
                id,
            },
            select: USER_SELECT,
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to update avatar');
    }
};

const addFollowing = async (requesterId, followingId) => {
    try {
        const user = await prisma.user.update({
            data: {
                following: {
                    connect: {
                        id: followingId,
                    },
                },
            },
            where: {
                id: requesterId,
            },
            select: USER_SELECT,
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to update following');
    }
};

export {
    getUserByUsername,
    getUserById,
    getAllUsers,
    createUser,
    updateBio,
    updateAvatar,
    addFollowing,
};
