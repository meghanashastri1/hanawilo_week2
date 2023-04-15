const User = require('../models/User');
// For '/user' endpoints 

const getUsers = async (req, res, next) => {
    //query parameter 
    const filter = {};
    const options = {};

    if (Object.keys(req.query).length){
        const {
            limit, 
            sortByAge,
            userName,
            age
        } = req.query;

        if (userName) filter.userName = true
        if (age) filter.age = true

        if (limit) options.limit = limit; 
        if (sortByAge) options.sort = {
            age: sortByAge === 'asc' ? 1 : -1
        }


        console.log(filter, options);
        
    }
    try {
        const usersPayload = await User.find();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(usersPayload);
    } catch (err) {
        throw new Error(`Error retrieving users: ${err.message}`) 
    }
}

const postUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        
        sendTokenResponse(newUser, 201, res)
    } catch (err) {
        throw new Error(`Error retrieving user: ${err.message}`) 
    }
}


const deleteUsers = async (req, res, next) => {
    try {
        const deletedUsers = await User.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedUsers);
    } catch (err) {
        throw new Error(`Error deleting users: ${err.message}`) 
    }
}

//For :/userId
const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.userId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(getUser);
    } catch (err) {
        throw new Error(`Error retrieving user: ${err.message}`) 
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(updatedUser);
    } catch (err) {
        throw new Error(`Error updating user: ${err.message}`) 
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedUser);
    } catch (err) {
        throw new Error(`Error deleting user: ${err.message}`) 
    }
}


// For '/login' endpoint
const login = async (req, res, next) => {
    const {email, password } = req.body;

    if (!email || !password) throw new Error('Please provide an email and password')

    const user = await User.findOne({ email }).select('+password'); 

    if (!user) throw new Error('User does not exist');

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Invalid Credentials');

    sendTokenResponse(user, 200, res);
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken(); 

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 

        //make sure that only the server can process this cookie
        httpOnly: true
         
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json(token)
}


module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser,
    sendTokenResponse, 
    login
};