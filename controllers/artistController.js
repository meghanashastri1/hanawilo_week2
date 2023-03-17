// For '/artist' endpoints 

const getArtists = (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length){
        const {
            firstName, 
            lastName, 
            genre
        } = req.query;

        const filter = []; 

        if (firstName) filter.push(firstName)
        if (lastName) filter.push(lastName)
        if (genre) filter.push(genre)

        for (const query of filter){
            console.log(`Searching artist by ${query}`);
        }
    }

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
//For :/artistId
const getArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Show me the artist with the name of ${req.params.artistId}`});
}
const updateArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Update the artist with the name of ${req.params.artistId}`});
}

const deleteArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Delete the artist with the name of ${req.params.artistId}`});
}
module.exports = {
    getArtists,
    postArtist,
    deleteArtists, 
    getArtist,
    updateArtist,
    deleteArtist
};