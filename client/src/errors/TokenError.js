class TokenError extends Error {
    constructor() {
        super('Unable to retrieve token. Please log in again.');
        this.status = 401;
        this.name = 'Token Error';
    }
}

export { TokenError };
