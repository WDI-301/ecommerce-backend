module.exports = {
    login: async (req,res) => {
        try {
            res.status(200).json({
                message: 'Post request from the Controller'
              })
        } 
        catch (error) {
            res.status(500).json({
                message: error
              })
        }
    }
}