import * as commentQueries from '../db/comment.queries.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';

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
        const comment = await commentQueries.getCommentById(commentId);
        if (!comment) throw new DatabaseError('Unable to delete comment', 404);
        if (comment.authorId != userId) {
            throw new AuthorizationError('Unable to delete comment');
        }
        // verifed. Delete comment
        const deletedComment = await commentQueries.deleteComment(userId, commentId);
        res.json({
            data: deletedComment,
        });
    } catch (error) {
        next(error);
    }
};

export { createComment, deleteComment };
