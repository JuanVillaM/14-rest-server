const express = require('express');
const fileUpload = require('express-fileupload');
const user = require('../models/user');
const app = express();

const User = require('../models/user');
const Product = require('../models/product');

const fs = require('fs');
const path = require('path');

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:type:/id', function(req, res) {

    let type = req.params.type;
    let id = req.params.id;

    if (!res.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'There are not selected files'
                }
            });
    }

    // Valid Types
    let validTypes = ['products', 'users'];

    if (validTypes.indexOf(type) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'The valid types are ' + validTypes.join(', '),
                }
            });
    }


    let sampleFile = req.files.file;

    let cuttedName = sampleFile.name.split('.');

    let extension = cuttedName[cuttedName.length - 1];

    // Valid Extensions
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

    if (validsExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The valid extensions are ' + validExtensions.join(', '),
                ext: extension
            }
        });
    }

    // Change the name of the image file
    let fileName = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;

    sampleFile.mv(`uploads/${ type }/${ fileName }`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (type === 'users') {
            userImage(id, res, fileName);
        } else {
            productImage(id, res, fileName);
        }

    });

});


function userImage(id, res, fileName) {

    User.findById(id, (err, userDB) => {

        if (err) {
            deleteFile(fileName, 'users');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            deleteFile(fileName, 'users');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exists'
                }
            });
        }

        deleteFile(userDB.img, 'users');

        userDB.img = fileName;

        userDB.save((err, userSaved) => {
            res.json({
                ok: true,
                user: userSaved,
                img: fileName
            });

        });

    });
}

function productImage(id, res, fileName) {

    Product.findById(id, (err, productDB) => {

        if (err) {
            deleteFile(fileName, 'products');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            deleteFile(fileName, 'products');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exists'
                }
            });
        }

        deleteFile(productoDB.img, 'products');

        productDB.img = fileName;

        productDB.save((err, productSaved) => {
            res.json({
                ok: true,
                product: productSaved,
                img: fileName
            });

        });

    });

}

function deleteFile(imageName, type) {

    let imagePath = path.resolve(__dirname, `../../uploads/${ type }/${imageName}`);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
}

module.exports = app;