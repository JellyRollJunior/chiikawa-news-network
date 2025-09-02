import * as commentQueries from '../db/comment.queries.js';

const createComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        const content = req.body.content;
        const comment = await commentQueries.createComment(
            userId,
            postId,
            content
        );
        res.json({
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { commentId } = req.params;
        // verify user has permission to delete comment
        const comment = await commentQueries.deleteComment(commentId);
        res.json({
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

export { createComment, deleteComment };
