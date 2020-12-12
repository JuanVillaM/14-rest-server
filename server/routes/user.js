const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const app = express();

app.get('/users', function(req, res) {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({ status: true }, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    some: count
                });

            });

        });
});

app.post('/users', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    user.save((err, userDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });

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
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.delete('/users/:id', function(req, res) {

    let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userDeleted) => {

    let changeState = {
        status: false
    };

    User.findByIdAndUpdate(id, changeState, { new: true }, (err, userDeleted) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'User not finded'
                }
            });
        }
    });

    res.json({
        ok: true,
        user: userDeleted
    });

});

module.exports = app;