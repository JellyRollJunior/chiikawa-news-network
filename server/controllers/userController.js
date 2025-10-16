import { validateInput } from '../middleware/validations.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import { uploadAvatar } from '../adapters/supabase.client.js';
import { formatUser } from '../services/user.services.js';
import { textCensor, profanityMatcher } from '../services/textCensor.js';
import * as userQueries from '../db/user.queries.js';

const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const user = await userQueries.getUserById(req.user.id, req.user.id);
        const formattedUser = formatUser(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const requesterId = req.user.id;
        const { userId } = req.params;
        const user = await userQueries.getUserById(requesterId, userId);
        const formattedUser = formatUser(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const requesterId = req.user.id;
        const users = await userQueries.getAllUsers(requesterId);
        const formattedUsers = users.map((user) => formatUser(user));
        res.json({ users: formattedUsers });
    } catch (error) {
        next(error);
    }
};

const patchBio = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const bio = req.body.bio;
        const censoredBio = textCensor.applyTo(bio, profanityMatcher.getAllMatches(bio));
        const user = await userQueries.updateBio(userId, censoredBio);
        const formattedUser = formatUser(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const patchAvatar = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // upload to supabase & insert image url into DB
        const url = await uploadAvatar(userId, req.file);
        const user = await userQueries.updateAvatar(userId, url);
        const formattedUser = formatUser(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const getFollowers = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const { userId } = req.params;
        const followers = await userQueries.getFollowers(requesterId, userId);
        const formattedFollowers = followers.map((follower) =>
            formatUser(follower)
        );
        res.json({
            data: formattedFollowers,
        });
    } catch (error) {
        next(error);
    }
};

const getFollowing = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const { userId } = req.params;
        const following = await userQueries.getFollowing(requesterId, userId);
        const formattedFollowing = following.map((follow) =>
            formatUser(follow)
        );
        res.json({
            data: formattedFollowing,
        });
    } catch (error) {
        next(error);
    }
};

const followUser = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const { userId: followingId } = req.params;
        const user = await userQueries.followUser(requesterId, followingId);
        const formattedUser = formatUser(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const unfollowUser = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const { userId: followingId } = req.params;
        const user = await userQueries.unfollowUser(requesterId, followingId);
        const formattedUser = formatUser(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

export {
    getCurrentUser,
    getUser,
    getAllUsers,
    patchBio,
    patchAvatar,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
};
