import { setLikes } from '../services/post.services.js';
import { validateInput } from '../middleware/validations.js';
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

export { createPost, getPosts, likePost, unlikePost };
