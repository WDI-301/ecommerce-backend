const User = require('../model/User')
const { errorHandler } = require('./userHelper')

module.exports = {
    login: async (req,res) => {
        try {
            let foundUser = await User.findOne({username: req.body.username})
            if (!foundUser) {
                throw {
                    status: 404,
                    message: "User Does Not Exist!"
                }
            }
            // console.log(newUser);

            res.status(200).json({
                message: 'Post request from the Controller',
                userObj: foundUser
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
            let newUser = await new User({
                username: req.body.username,
                password: req.body.password
            })
            // console.log(newUser);
            let savedUser = await newUser.save()
            res.status(200).json({
                message: 'Post request from the Controller',
                userObj: savedUser
              })
        } 
        catch (error) {
            let errorMessage = await errorHandler(error)
            res.status(errorMessage.status).json({message: errorMessage.message})
        }
    }
}