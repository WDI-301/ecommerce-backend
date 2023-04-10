module.exports = {
    login: async (req,res) => {
        try {
            let username = req.body.username
            let password = req.body.password
            if ( username === 'Violet') {
                throw new Error('This user exists')
            }
            if (password === '' || password === undefined) {
                throw new Error("password can't be blank" )
            }

            res.status(200).json({
                message: 'Post request from the Controller',
                userObj: req.body
              })
        } 
        catch (error) {
            res.status(409).json({message: error})
        }
    }
}