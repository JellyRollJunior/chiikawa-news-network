import { check } from "express-validator";
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';
const EMPTY_ERROR = 'must not be empty.';
const CREDENTIAL_LENGTH_ERROR = 'must be between 6 and 24 characters';
const CHAT_NAME_LENGTH_ERROR = 'must be a maximum of 32 characters';
const ARRAY_ERROR = 'must be an array of user ids.';
const UUID_ERROR = 'must be a user id.';
const USER_ID_LENGTH_ERROR = 'must be of length >= 1 and <= 4';
const LENGTH_ERROR_75 = 'must be between 1 and 75 characters';
const LENGTH_ERROR_350 = 'must be between 1 and 350 characters';

const userValidation = [
    check('username').trim()
        .notEmpty().withMessage(`Username ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Username ${CREDENTIAL_LENGTH_ERROR}`),
    check('password').trim()
        .notEmpty().withMessage(`Password ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Password ${CREDENTIAL_LENGTH_ERROR}`),
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
        .isLength({ min: 0, max: 32 }).withMessage(`Chat name ${CHAT_NAME_LENGTH_ERROR}`)
];

const bioValidations = [
    check('bio').trim()
        .notEmpty().withMessage(`Username ${EMPTY_ERROR}`)
        .isString().isLength({min: 1, max: 350}).withMessage(`Bio ${LENGTH_ERROR_350}`),
];

const postValidations = [
    check('title').trim()
        .notEmpty().withMessage(`title ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 75 }).withMessage(`title ${LENGTH_ERROR_75}`),
    check('content').trim()
        .notEmpty().withMessage(`content ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 350 }).withMessage(`content ${LENGTH_ERROR_350}`),
];

const postIdValidations = [
    check('postId')
        .isUUID().withMessage(`post id ${UUID_ERROR}`),
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
    validateInput,
};