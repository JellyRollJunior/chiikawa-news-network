class SupabaseError extends Error {
    constructor(message = 'Unable to upload to supabase') {
        super(message);
        this.status = 500;
        this.name = 'Supabase error';
    }
}

export { SupabaseError };
