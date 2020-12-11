require('./config/config');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', function(req, res) {
    res.json('get User');
});

app.post('/users', function(req, res) {
    let body = req.body;

    if (body.name === undefined) {
        resp.status(400).json({
            ok: false,
            message: 'The name is required'
        });
    } else {
        res.json({ person: body });
    }
});

app.put('/users/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id });
});

app.delete('/users', function(req, res) {
    res.json('delete User');
});

app.listen(process.env.PORT, () => {
    console.log('Listening to port: ', process.env.PORT);
});