// Port 
process.env.PORT = process.env.PORT || 3000;

// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Token expiration
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// SEED
process.env.SEED = process.env.SEED || 'This-is-the-seed-enviroment';


// URL
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = null;
} else {
    urlDB = 'mongodb+srv://juanvilla:juanes123@cluster0.9fxp5.mongodb.net/bakery?retryWrites=true&w=majority';
}
process.env.URLDB = urlDB;