import dotenv from 'dotenv';
dotenv.config();

const origin = [process.env.SERVER_URI, process.env.CLIENT_URI];

export { origin };
