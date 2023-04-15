//middleware so that only the admin can access getUsers 
const adminValidator = async (req, res, next) => {
    if (req.user.admin){
        next()
    } else {
        res
        .status(403)
        .setHeader('Content-Type', 'application/json')
        .json({ msg: 'Unauthorized to access this resource!'})
        //unauthorized means its a client error 
    }
}

module.exports = adminValidator;