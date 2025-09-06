import { setPostAndCommentLikes } from '../services/post.services.js';
import { validateInput } from '../middleware/validations.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';
import * as postQueries from '../db/post.queries.js';
import * as userQueries from '../db/user.queries.js';
import { uploadPostMedia } from '../adapters/supabase.client.js';

const getPosts = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const authorId = req.query.userId || req.params.userId;
        const posts = authorId
            ? await postQueries.getPostsByAuthor(requesterId, authorId)
            : await postQueries.getPosts(requesterId);
        const formattedPosts = posts.map((post) =>
            setPostAndCommentLikes(post)
        );
        res.json({ posts: formattedPosts });
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
        const data = await postQueries.getFeed(
            requesterId,
            [requesterId, ...followingIds],
            cursor,
            Number(limit)
        );
        // const formattedPosts = posts.map((post) => {
        //     return setPostAndCommentLikes(post);
        // });
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
        let post = await postQueries.createPost(userId, title, content);
        // if file exists, upload to supabase
        if (req.file) {
            const url = await uploadPostMedia(userId, post.id, req.file);
            post = await postQueries.updatePostMedia(userId, post.id, url);
        }
        // add url to post
        const formattedPost = setPostAndCommentLikes(post);
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
        const formattedPost = setPostAndCommentLikes(post);
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
        const formattedPost = setPostAndCommentLikes(post);
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
        // verified. Delete post
        const deletedPost = await postQueries.deletePost(userId, postId);
        const formattedPost = setPostAndCommentLikes(deletedPost);
        res.json({ data: formattedPost });
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
