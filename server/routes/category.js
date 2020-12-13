const express = require('express');

let { verifyToken, verifyAdminRole } = require('../middlewares/auth');

let app = express();

let Category = require('../models/category');

// Get all the Categorys
app.get('/category', verifyToken, (req, res) => {

    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categorys) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorys
            });

        });

});

// Get all the Categorys by ID
app.get('/category/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Category.findById(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID invalid'
                }
            });

        }

        res.json({
            ok: true,
            category: categoryDB
        });


    });


});

// Create a new Category
app.post('/category', verifyToken, (req, res) => {
    let body = req.body;

    let category = new Category({
        decription: body.description,
        user: req.user._id
    });

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

});

// Update a Category
app.put('/category/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descriptionCategory = {
        description: body.description
    };

    Category.findByIdAndUpdate(id, descriptionCategory, { new: true, runValidators: true }, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

});

// Delete a Category
app.delete('/category/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id;

    Category.findByIdAndUpdate(id, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'The ID does not exists'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Category deleted'
        });

    });

});
module.exports = app;