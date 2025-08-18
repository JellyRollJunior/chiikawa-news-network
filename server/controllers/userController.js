import * as userQueries from '../db/user.queries.js';
import { validateInput } from '../middleware/validations.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { uploadAvatar } from '../services/supabase.js';

const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const user = await userQueries.getUserById(req.user.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await userQueries.getUserById(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userQueries.getAllUsers();
        res.json({ users });
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
        res.json(user);
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
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export { getCurrentUser, getUser, getAllUsers, patchBio, patchAvatar };
