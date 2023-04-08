const Artist = require('../models/Artist');
const path = require('path')

// For '/artist' endpoints 

const getArtists = async (req, res, next) => {
    //query parameter 
    const filter = {};
    const options = {};

    if (Object.keys(req.query).length){
        const {
            limit, 
            sortByGenre,
            firstName, 
            lastName, 
            genre
        } = req.query;

        if (firstName) filter.firstName = true
        if (lastName) filter.lastName = true
        if (genre) filter.genre = true

        if (limit) options.limit = limit; 
        if (sortByGenre) options.sort = {
            genre: sortByGenre === 'asc' ? 1 : -1
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

const postArtistImage = async (req, res, next) => {
    try {
        const err = { msg: 'Problem uploading image' }; 
        if (!req.files) next(err)

        const file = req.files.file; 

        console.log(file);

        if (!file.mimetype.startsWith('image')) next(err); 
        if (file.size > process.env.MAX_FILE_SIZE) next(err)

        file.name = `photo_${req.params.artistId}${path.parse(file.name).ext}`
        const filePath = process.env.FILE_UPLOAD_PATH + file.name;

        file.mv(filePath, async (err) => {
            await Artist.findByIdAndUpdate(req.params.artistId, { image: file.name })

            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ msg: 'Image uploaded!' })
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists, 
    getArtist,
    updateArtist,
    deleteArtist,
    postArtistImage
};