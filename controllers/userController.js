// For '/user' endpoints 

const getUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: 'You hit me! Show me all the users'});
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Create Song with name of ${req.body.username}`});
}


const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: 'Deleting the users'});
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers
};