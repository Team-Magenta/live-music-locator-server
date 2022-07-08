'use strict';

//jwt - JSON web token
const jwt = require('jsonwebtoken');

// jwks - json web key set
const jwksClient = require('jwks-rsa');

// the jwks uri comes from Auth0 account page => Advanced Settings => Endpoints => OAuth => JSON Web key Set

const client = jwksClient({
    jwksUri: process.env.JWKS_URI
});


function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

function verifyUser(req, errorFirstOrUseTheUserCallbackFunction) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        // from the json web token docs:
        jwt.verify(token, getKey, {}, errorFirstOrUseTheUserCallbackFunction);
    } catch (error) {
        errorFirstOrUseTheUserCallbackFunction('not authorized');
    }
}

module.exports = verifyUser;
