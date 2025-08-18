class ValidationError extends Error {
    constructor(validationErrors, status = 400) {
        super("Unable to process request data.");
        this.name = "Validation Error";
        this.validationErrors = validationErrors;
        this.status = status;
    }
}

export { ValidationError };
