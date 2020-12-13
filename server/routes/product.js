const express = require('express');

const { verifyToken } = require('../middlewares/auth');

let app = express();
let Product = require('../models/product');

// Get a Product
app.get('/products', verifyToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    Product.find({ avalaible: true })
        .skip(from)
        .limit(5)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });
        });

});

// Get a Product by ID
app.get('/products/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID does not exists'
                    }

                });

            }

            res.json({
                ok: true,
                product: productDB
            });

        });

});

// Search a Product
app.get('/products/search/:term', verifyToken, (req, res) => {

    let term = req.params.term;

    let regularExpresion = new RegExp(term, '1');

    Product.find({ name: regularExpresion })
        .populate('category', 'name')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(201).json({
                ok: true,
                products
            });

        });

});

// Create a Product
app.post('/products', verifyToken, (req, res) => {

    let body = req.body

    let product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        avalaible: body.avalaible,
        category: body.category,
        user: body.user
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });

    });

});

// Update a Product
app.put('/products/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
    if (!productDB) {
        return res.status(500).json({
            ok: false,
            err: {
                message: 'ID does not exists'
            }
        });
    }

    productDB.name = body.name;
    productDB.price = body.price;
    productDB.category = body.category;
    productDB.avalaible = body.avalaible;
    productDB.description = body.description;

    product.save((err, productSaved) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productSaved
        });
    });


});

// Delete a Product
app.delete('/products/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID does not exists'
                }

            });

        }

        productDB.avalaible = false;

        productDB.save((err, productDeleted) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

        });

        res.json({
            ok: true,
            product: productDeleted,
            message: 'Producto Deleted'
        });

    });


});

module.exports = app;