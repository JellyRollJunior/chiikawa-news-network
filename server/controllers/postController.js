import {
    deletePostMedia,
    uploadPostMedia,
} from '../adapters/supabase.client.js';
import { formatPostData } from '../services/post.services.js';
import { validateInput } from '../middleware/validations.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';
import * as postQueries from '../db/post.queries.js';
import * as userQueries from '../db/user.queries.js';
import { profanityMatcher, textCensor } from '../services/textCensor.js';

const getPosts = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const authorId = req.query.userId || req.params.userId;
        const cursor = req.query.cursor ? req.query.cursor : null;
        const limit = req.query.limit ? req.query.limit : 20;
        const data = await postQueries.getPosts(
            requesterId,
            authorId,
            cursor,
            Number(limit)
        );
        data.posts = data.posts.map((post) => {
            return formatPostData(post);
        });
        res.json(data);
    } catch (error) {
        next(error);
    }
};

const getFollowingPosts = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const following = await userQueries.getFollowing(
            requesterId,
            requesterId
        );
        const followingIds = following.map((user) => user.id);
        const cursor = req.query.cursor ? req.query.cursor : null;
        const limit = req.query.limit ? req.query.limit : 20;
        const data = await postQueries.getPosts(
            requesterId,
            [requesterId, ...followingIds],
            cursor,
            Number(limit)
        );
        data.posts = data.posts.map((post) => {
            return formatPostData(post);
        });
        res.json(data);
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const title = req.body.title;
        const content = req.body.content;
        // censor title & content
        const censoredTitle = textCensor.applyTo(title, profanityMatcher.getAllMatches(title));
        const censoredContent = textCensor.applyTo(content, profanityMatcher.getAllMatches(content));
        let url = req.body.media;
        let post = await postQueries.createPost(userId, censoredTitle, censoredContent, url);
        // if file exists & was not sent as URL, upload to supabase
        if (!url && req.file) {
            url = await uploadPostMedia(userId, post.id, req.file);
            post = await postQueries.updateSelfHostedPostMedia(userId, post.id, url);
        }
        // add url to post
        const formattedPost = formatPostData(post);
        res.json(formattedPost);
    } catch (error) {
        next(error);
    }
};

const likePost = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { postId } = req.params;
        const post = await postQueries.likePost(userId, postId);
        const formattedPost = formatPostData(post);
        res.json(formattedPost);
    } catch (error) {
        next(error);
    }
};

const unlikePost = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { postId } = req.params;
        const post = await postQueries.unlikePost(userId, postId);
        const formattedPost = formatPostData(post);
        res.json(formattedPost);
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { postId } = req.params;
        // verify user is authorized to delete post
        const post = await postQueries.getPostById(userId, postId);
        if (!post) throw new DatabaseError('Unable to delete post', 404);
        if (post.authorId != userId) {
            throw new AuthorizationError('Unable to delete post');
        }
        // Delete media on supabase (if present)
        if (post.isSelfHosted) await deletePostMedia(userId, postId);
        // Delete post on DB
        const deletedPost = await postQueries.deletePost(userId, postId);
        const formattedPost = formatPostData(deletedPost);
        res.json(formattedPost);
    } catch (error) {
        next(error);
    }
};

export {
    getPosts,
    getFollowingPosts,
    createPost,
    likePost,
    unlikePost,
    deletePost,
};
