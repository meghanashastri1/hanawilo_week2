// For '/song' endpoints 

const getSongs = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: 'You hit me! Show me all the songs'});
}

const postSong = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Create Song with name of ${req.body.songName}`});
}


const deleteSongs = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: 'Deleting the songs'});
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs
};