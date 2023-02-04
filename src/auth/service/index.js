const jwt = require('jsonwebtoken');

const { SECRETKEY } = require('@config');

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRETKEY, (err, decoded) => {
            if (err) {
                reject(err)
            }
            resolve(decoded)
        })
    })
}

module.exports = AuthService = {
    verifyJWT
};


