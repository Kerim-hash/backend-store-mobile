var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.secret
    return jwt({
        secret,
        algorithms: ["HS256"],
        // isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\api\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\api\/category(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\api\/users(.*)/, methods: ['GET',  'OPTIONS']},
            '/api/users/login',
            '/api/users/register',

        ]
    })
}

// async function isRevoked(req, payload, done) {
//     if(!payload.isAdmin) {
//        return true
//     }
// }

module.exports = authJwt