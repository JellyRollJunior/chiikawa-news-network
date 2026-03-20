const createSocketError = (message) => {
    return {
        status: 'error',
        message,
    };
};

export { createSocketError };
