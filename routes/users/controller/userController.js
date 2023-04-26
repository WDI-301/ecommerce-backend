const { 
    createUser, 
    errorHandler, 
    hashPassword, 
    comparePassword, 
    createJWTToken 
    } = require('./userHelper')
const User = require('../model/User')


module.exports = {
    login: async (req,res) => {
        try {
            // foundUser is the User object from the database
            let foundUser = await User.findOne({username: req.body.username})
            // if not found with return undefined which evaluates as false
            if (!foundUser) {
                throw {
                    status: 404,
                    message: "User Does Not Exist!"
                }
            }
            // throw an error if password from the frontend does not match the db password
            let checkedPassword = await comparePassword(req.body.password, foundUser.password)
            if (!checkedPassword) {
                throw {
                    status: 401,
                    message: 'Password does not match'
                }
            }

            //jwt
            let token = await createJWTToken(foundUser)

            // console.log(newUser);
            res.status(200).json({
                message: 'Post request from the Controller',
                userObj: foundUser,
                token: token
              })
        } 
        catch (error) {
            let errorMessage = await errorHandler(error)
            res.status(errorMessage.status).json({message: errorMessage.message})
        }
    },
    register: async (req,res) => {
        try {
            let foundUser = await User.findOne({username: req.body.username})
            if (foundUser) {
                throw {
                    status: 409,
                    message: "User Exists!"
                }
            }
            let newUser = await createUser(req.body)
            console.log('!@-------newUser-------@!')
            console.log(newUser)
            
            // password hash
            let hashedPassword = await hashPassword(newUser.password)
            console.log('!@-------hashed-------@!')
            console.log(hashedPassword)
            
            newUser.password = hashedPassword

            let savedUser = await newUser.save()
            res.status(200).json({
                message: 'Registration Success!!',
                userObj: savedUser
              })
        } 
        catch (error) {
            let errorMessage = await errorHandler(error)
            res.status(errorMessage.status).json({message: errorMessage.message})
        }
    },
    deleteUser: async (req,res) => {
        try {
            // console.log(req.body)  // req.body = { username: 'grumpy' }
            // console.log(req.decoded)
            
            let deletedUser = await User.deleteOne(req.body)
            if (deletedUser.deletedCount > 0) {
                res.status(200).json({
                    message: "User was Deleted!"
                })
            } else {
                throw {
                    status: 404,
                    message: "User was NOT Deleted!"
                }
            }
        } 
        catch (error) {
            let errorMessage = await errorHandler(error)
            res.status(errorMessage.status).json({message: errorMessage.message})
        }
    },
    authtoken: async (req, res) => {
        try {
            let foundUser = await User.findById(req.decoded.id)
            console.log(foundUser)
            if (!foundUser) {
                throw {
                    status: 404,
                    message: "User Does Not Exist!"
                }
            }

            res.status(200).json(foundUser)
            
        } catch (error) {
            let errorMessage = await errorHandler(error)
            res.status(errorMessage.status).json({message: errorMessage.message})
        }
    }
}