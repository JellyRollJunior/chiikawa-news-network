import { USER_SELECT_BASIC } from "./user.select.js";

const COMMENT_SELECT = {
    id: true,
    content: true,
    media: true,
    createdAt: true,
    author: {
        select: USER_SELECT_BASIC
    },
};

export { COMMENT_SELECT };
