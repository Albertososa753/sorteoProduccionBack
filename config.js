const {config} = require('dotenv')
config()

exports.PORT = 4001;
exports.HOST = `http://localhost:${exports.PORT}`;
exports.MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
