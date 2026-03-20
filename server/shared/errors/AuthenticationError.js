class AuthenticationError extends Error {
    constructor(
        message = 'Unable to authenticate user',
        status = 401
    ) {
        super(message);
        this.name = 'Authentication Error';
        this.status = status;
    }
}

export { AuthenticationError };
