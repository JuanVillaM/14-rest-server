require('./config/config');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(require('./routes/user'));

mongoose.connect(process.env.URLDB, { userNewUrlParser: true, useCreateIndex: true },
    (err, resp) => {
        if (err) throw error;
        console.log('Data Base Online');
    });

app.listen(process.env.PORT, () => {
    console.log('Listening to port: ', process.env.PORT);
});