// For '/user' endpoints 

const getUsers = (req, res, next) => {
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
//For :/userId
const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Show me the user with username of ${req.params.userId}`});
}
const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Update the user with the username of ${req.params.songId}`});
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Delete the user with the username of ${req.params.songId}`});
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
};