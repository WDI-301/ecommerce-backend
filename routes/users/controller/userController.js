const User = require('../model/User')

module.exports = {
    login: async (req,res) => {
        try {
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
            res.status(409).json({message: error})
        }
    },
    register: async (req,res) => {
        try {
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
            res.status(409).json({message: error})
        }
    }
}