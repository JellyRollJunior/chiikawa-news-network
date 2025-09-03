import { PrismaClient } from '@prisma/client';
import { userSelect } from './selects/user.select.js';
import { DatabaseError } from '../errors/DatabaseError.js';

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

const getUserById = async (requesterId, userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: userSelect(requesterId),
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

const getAllUsers = async (requesterId) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                username: 'asc',
            },
            select: userSelect(requesterId),
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

const updateBio = async (requesterId, bio) => {
    try {
        const user = await prisma.user.update({
            data: {
                bio,
            },
            where: {
                id: requesterId,
            },
            select: userSelect(requesterId),
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to update bio');
    }
};

const updateAvatar = async (requesterId, avatarSrc) => {
    try {
        const user = await prisma.user.update({
            data: {
                avatar: avatarSrc,
            },
            where: {
                id: requesterId,
            },
            select: userSelect(requesterId),
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to update avatar');
    }
};

const getFollowing = async (requesterId, userId) => {
    try {
        const data = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                following: {
                    select: userSelect(requesterId),
                },
            },
        });
        return data.following;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve following');
    }
};

const getFollowers = async (requesterId, userId) => {
    try {
        const data = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                followers: {
                    select: userSelect(requesterId),
                },
            },
        });
        return data.followers;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve following');
    }
};

const followUser = async (requesterId, followingId) => {
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
            select: userSelect(requesterId),
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
    getFollowers,
    getFollowing,
    followUser,
};
