import { config } from 'dotenv';
config();

export const PORT = 4001;
export const HOST = `http://localhost:${PORT}`;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
export const NGROK = process.env.NGROK;

