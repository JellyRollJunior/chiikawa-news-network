import { check } from "express-validator";
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';
import { allowedMimeTypes } from "./multer.js";

const EMPTY_ERROR = 'must not be empty.';
const CHAT_NAME_LENGTH_ERROR = 'must be a maximum of 32 characters';
const ARRAY_ERROR = 'must be an array of user ids.';
const UUID_ERROR = 'must be a user id.';
const USER_ID_LENGTH_ERROR = 'must be between 1 and 4 ids long';
const URL_ERROR = 'must a valid URL';
const lengthError = (min, max) => `must be between ${min} and ${max} characters`;
const extensionError = () => {
    const allowedExtensions = allowedMimeTypes.map((mimeType) => mimeType.split('/')[1]).join(', ')
    return `must use one of these extension: ${allowedExtensions}`;
}

const userValidation = [
    check('username').trim()
        .notEmpty().withMessage(`Username ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Username ${lengthError(6, 24)}`),
    check('password').trim()
        .notEmpty().withMessage(`Password ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Password ${lengthError(6, 24)}`),
];

const userIdValidations = [
    check('userId')
        .isUUID().withMessage(`user id ${UUID_ERROR}`),
];

const userIdValidationsOptional = [
    check('userId').optional()
        .isUUID().withMessage(`user id ${UUID_ERROR}`),
];

const chatValidations = [
    check('userIds')
        .isArray().withMessage(`userIds ${ARRAY_ERROR}`)
        .custom((value) => {
            if (value.length < 1 || value.length > 4) {
                throw new Error(`userIds ${USER_ID_LENGTH_ERROR}`)
            }
            return true;
        }),
    check('userIds.*')
        .isUUID().withMessage(`userIds array contents ${UUID_ERROR}`),
]

const chatIdValidations = [
    check('chatId')
        .isUUID().withMessage(`chat id ${UUID_ERROR}`),
];

const chatNameValidations = [
    check('name').optional().trim()
        .isLength({ min: 0, max: 32 }).withMessage(`Chat name ${CHAT_NAME_LENGTH_ERROR}`),
];

const bioValidations = [
    check('bio').trim()
        .notEmpty().withMessage(`Username ${EMPTY_ERROR}`)
        .isString().isLength({min: 1, max: 350}).withMessage(`Bio ${lengthError(1, 350)}`),
];

const postValidations = [
    check('title').trim()
        .notEmpty().withMessage(`title ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 75 }).withMessage(`title ${lengthError(1, 75)}`),
    check('content').trim()
        .notEmpty().withMessage(`content ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 350 }).withMessage(`content ${lengthError(1, 350)}`),
    check('media').trim().optional()
        .notEmpty().withMessage(`content ${EMPTY_ERROR}`)
        .isURL().withMessage(`media source URL ${URL_ERROR}`)
        .custom((value) => {
            // compile array of allowed file types
            const extensions = allowedMimeTypes.map(
                (type) => type.split('/')[1]
            );
            const verifyValueHasAllowedExtension = extensions.reduce(
                (hasAllowedExtension, extension) => {
                    return hasAllowedExtension || value.endsWith(extension)
                },
                false
            );
            return verifyValueHasAllowedExtension
        }).withMessage(`media source URL ${extensionError()}`),
];

const postIdValidations = [
    check('postId')
        .isUUID().withMessage(`post id ${UUID_ERROR}`),
];

const commentValidations = [
    check('content').trim()
        .notEmpty().withMessage(`content ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 200 }).withMessage(`content ${lengthError(1, 200)}`),
];

const commentIdValidations = [
    check('commentId')
        .isUUID().withMessage(`comment id ${UUID_ERROR}`),
];

const validateInput = (req) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        throw new ValidationError(validationErrors.array());
    }
};

export {
    userValidation, 
    userIdValidations,
    userIdValidationsOptional,
    chatValidations, 
    chatIdValidations, 
    chatNameValidations,
    bioValidations,
    postValidations,
    postIdValidations,
    commentValidations,
    commentIdValidations,
    validateInput,
};