import { setLikes } from '../services/post.services.js';
import * as postQueries from '../db/post.queries.js';

const getPosts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const posts = await postQueries.getPosts(userId);
        const formattedPosts = posts.map((post) => setLikes(post));
        res.json({ posts: formattedPosts });
    } catch (error) {
        next(error);
    }
};

export { getPosts };
