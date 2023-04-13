const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (bearerToken) {
            const token = bearerToken.split(' ')[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            // if exp time is less than current time, throw error if true.
            if (decoded.exp < Date.now()/1000) {
                throw {
                    status: 403,
                    message: "Token Expired"
                }
            }
            req.decoded = decoded
            next()
        } else {
            throw {
                status: 403,
                message: 'Forbidden'
            }
        }
    } 
    catch (error) {
        res.status(403).json('Not Authorized')
    }
    
}

module.exports = {
    verifyToken
}