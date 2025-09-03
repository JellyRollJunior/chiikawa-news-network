import { validateInput } from '../middleware/validations.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { uploadAvatar } from '../adapters/supabase.client.js';
import { setFollows } from '../services/user.services.js';
import * as userQueries from '../db/user.queries.js';

const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const user = await userQueries.getUserById(req.user.id, req.user.id);
        const formattedUser = setFollows(user);
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
        const formattedUser = setFollows(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const requesterId = req.user.id;
        const users = await userQueries.getAllUsers(requesterId);
        const formattedUsers = users.map((user) => setFollows(user));
        res.json({ users: formattedUsers });
    } catch (error) {
        next(error);
    }
};

const patchBio = async (req, res, next) => {
    try {
        validateInput(req);
        const { userId } = req.params;
        if (req.user.id != userId)
            throw new AuthorizationError('Unable to update bio');
        const bio = req.body.bio;
        const user = await userQueries.updateBio(req.user.id, bio);
        const formattedUser = setFollows(user);
        res.json(formattedUser);
    } catch (error) {
        next(error);
    }
};

const patchAvatar = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (req.user.id != userId)
            throw new AuthorizationError('Unable to update avatars');
        // upload to supabase & insert image url into DB
        const url = await uploadAvatar(req.user.id, req.file);
        const user = await userQueries.updateAvatar(req.user.id, url);
        const formattedUser = setFollows(user);
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
            setFollows(follower)
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
            setFollows(follow)
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
        const formattedUser = setFollows(user);
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
};
