const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {

    const bearerToken = req.headers.authorization
    if (bearerToken) {
        const token = bearerToken.split(' ')[1]
        req.token = token
        next()
    } else {
        res.status(403)
    }
}

module.exports = {
    verifyToken
}