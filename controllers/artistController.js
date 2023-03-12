// For '/artist' endpoints 

const getArtists = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: 'You hit me! Show me all the artists'});
}

const postArtist = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Create artist with name of ${req.body.artistName}`});
}


const deleteArtists = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: 'Deleting the artists'});
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists
};