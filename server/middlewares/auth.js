const jwt = require('jsonwebtoken');

// Token verification
let verifyToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalid'
                }
            });
        }

        req.user = decoded.user;
        next();

    });

};

// Role verification
let verifyAdminRole = (req, res, next) => {
    let user = res.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'The user is not Admin'
            }
        });

    }

};


module.exports = {
    verifyToken,
    verifyAdminRole
};