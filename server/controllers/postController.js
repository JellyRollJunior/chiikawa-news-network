import { setLikes } from '../services/post.services.js';
import { validateInput } from '../middleware/validations.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';
import * as postQueries from '../db/post.queries.js';

const getPosts = async (req, res, next) => {
    try {
        validateInput(req);
        const requesterId = req.user.id;
        const authorId = req.query.userId || req.params.userId;
        const posts = authorId
            ? await postQueries.getPostsByAuthor(requesterId, authorId)
            : await postQueries.getPosts(requesterId);
        const formattedPosts = posts.map((post) => setLikes(post));
        res.json({ posts: formattedPosts });
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
        // support media later (upload file to supabase & save link in db)
        const post = await postQueries.createPost(userId, title, content);
        const formattedPost = setLikes(post);
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
        const formattedPost = setLikes(post);
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
        const formattedPost = setLikes(post);
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
        const formattedPost = setLikes(deletedPost);
        res.json({ data: formattedPost });
    } catch (error) {
        next(error);
    }
};

export { createPost, getPosts, likePost, unlikePost, deletePost };
