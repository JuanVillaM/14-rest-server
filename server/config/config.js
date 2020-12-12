process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

// if (process.env.NODE_ENV === 'dev') {
// urlDB = null;
// } else {
urlDB = 'mongodb+srv://juanvilla:juanes123@cluster0.9fxp5.mongodb.net/bakery?retryWrites=true&w=majority';
// }
process.env.URLDB = urlDB;