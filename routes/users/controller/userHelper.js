const bcrypt = require('bcrypt')
const User = require('../model/User')
const jwt = require('jsonwebtoken')

const saltRounds = 10;

const createUser = async (user) => {
    let newUser = await new User({
        username: user.username,
        password: user.password
    })
    return newUser
}

const hashPassword = async (password) => {
    let genSalt = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, genSalt)
    return hashedPassword
}

const comparePassword = async (plaintextPassword, dbPassword) => {
    let checkedPassword = await bcrypt.compare(plaintextPassword, dbPassword)
    return checkedPassword
}

const errorHandler = async (err) => {

    return {
        status: err.status,
        message: err.message
    }
}

const createJWTToken = async (foundUser) => {
    return 'token'

}

module.exports = {
    createUser,
    hashPassword,
    comparePassword,
    errorHandler,
    createJWTToken
}