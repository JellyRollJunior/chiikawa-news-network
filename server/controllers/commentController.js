import * as commentQueries from '../db/comment.queries.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';
import { validateInput } from '../middleware/validations.js';
import { formatCommentData } from '../services/comment.services.js';

const getComments = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { postId } = req.params;
        const comments = await commentQueries.getCommentsByPost(userId, postId);
        const formattedComments = comments.map((comment) =>
            formatCommentData(comment)
        );
        res.json({ comments: formattedComments });
    } catch (error) {
        next(error);
    }
};

const createComment = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { postId } = req.params;
        const content = req.body.content;
        const comment = await commentQueries.createComment(
            userId,
            postId,
            content
        );
        const formattedComment = formatCommentData(comment)
        res.json({ comment: formattedComment });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { commentId } = req.params;
        // verify user has permission to delete comment
        const comment = await commentQueries.getCommentById(commentId);
        if (!comment) throw new DatabaseError('Unable to delete comment', 404);
        if (comment.authorId != userId) {
            throw new AuthorizationError('Unable to delete comment');
        }
        // verifed. Delete comment
        const deletedComment = await commentQueries.deleteComment(
            userId,
            commentId
        );
        const formattedComment = formatCommentData(deletedComment)
        res.json({ comment: formattedComment });
    } catch (error) {
        next(error);
    }
};

const likeComment = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { commentId } = req.params;
        const comment = await commentQueries.likeComment(userId, commentId);
        const formattedComment = formatCommentData(comment)
        res.json({ comment: formattedComment });
    } catch (error) {
        next(error);
    }
};

const unlikeComment = async (req, res, next) => {
    try {
        validateInput(req);
        const userId = req.user.id;
        const { commentId } = req.params;
        const comment = await commentQueries.unlikeComment(userId, commentId);
        const formattedComment = formatCommentData(comment)
        res.json({ comment: formattedComment });
    } catch (error) {
        next(error);
    }
};

export {
    getComments,
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
};
