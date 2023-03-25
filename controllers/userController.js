const User = require('../models/User');
// For '/user' endpoints 

const getUsers = async (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length){
        const {
            userName, 
            gender
        } = req.query;

        const filter = []; 

        if (userName) filter.push(userName)
        if (gender) filter.push(gender)

        for (const query of filter){
            console.log(`Searching user by ${query}`);
        }
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
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(newUser);
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

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
};