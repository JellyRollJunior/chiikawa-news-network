class AuthorizationError extends Error {
    constructor(
        message = 'User is not authorized to perform action',
        status = 403
    ) {
        super(message);
        this.name = 'Authorization error';
        this.status = status;
    }
}

export { AuthorizationError };
