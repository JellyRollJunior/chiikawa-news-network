const errorHandler = (error, req, res, next) => {
    if (error.status) {
        return res.status(error.status).json({
            ...error,
            name: error.name,
            message: error.message,
        });
    }
    res.status(500).json(error);
};

const error404Handler = (req, res, next) => {
    const error = new Error('404 page not found');
    error.status = 404;
    next(error);
};

export { errorHandler, error404Handler };
