class DatabaseError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = "Database Error";
        this.status = status;
    }
}

export { DatabaseError };
