const Artist = require('../models/Artist');
// For '/artist' endpoints 

const getArtists = async (req, res, next) => {
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
    try {
        const artistsPayload = await Artist.find();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(artistsPayload);
    } catch (err) {
        throw new Error(`Error retrieving artists: ${err.message}`) 
    }
}

const postArtist = async (req, res, next) => {
    try {
        const newArtist = await Artist.create(req.body);
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(newArtist);
    } catch (err) {
        throw new Error(`Error entering new artist: ${err.message}`) 
    }
}


const deleteArtists = async (req, res, next) => {
    try {
        const deletedArtists = await Artist.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedArtists);
    } catch (err) {
        throw new Error(`Error deleting artists: ${err.message}`) 
    }
}
//For :/artistId
const getArtist = async (req, res, next) => {
    try {
        const getArtist = await Artist.findById(req.params.artistId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(getArtist);
    } catch (err) {
        throw new Error(`Error retrieving artist: ${err.message}`) 
    }
}
const updateArtist = async (req, res, next) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.artistId, req.body, {new: true})
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(updatedArtist);
    } catch (err) {
        throw new Error(`Error updating artist: ${err.message}`) 
    }
}

const deleteArtist = async (req, res, next) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.artistId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedArtist);
    } catch (err) {
        throw new Error(`Error deleting artist: ${err.message}`) 
    }
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists, 
    getArtist,
    updateArtist,
    deleteArtist
};