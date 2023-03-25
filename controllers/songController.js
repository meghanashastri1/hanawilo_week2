const Song = require('../models/Song');
// For '/song' endpoints 

const getSongs = async (req, res, next) => {
    //query parameter 
    if (Object.keys(req.query).length){
        const {
            songTitle, 
            artist, 
            genre
        } = req.query;

        const filter = []; 

        if (songTitle) filter.push(songTitle)
        if (artist) filter.push(artist)
        if (genre) filter.push(genre)

        for (const query of filter){
            console.log(`Searching song by ${query}`);
        }
    }
    try {
        const songsPayload = await Song.find();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(songsPayload);
    } catch (err) {
        throw new Error(`Error retrieving songs: ${err.message}`) 
    }
    
}

const postSong = async (req, res, next) => {
    try {
        const newSong = await Song.create(req.body)
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(newSong);
    } catch (err) {
        throw new Error(`Error creating song: ${err.message}`) 
    }
}


const deleteSongs = async (req, res, next) => {
    try {
        const deletedSongs = await Song.deleteMany();
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(deletedSongs);
    } catch (err) {
        throw new Error(`Error deleting songs: ${err.message}`) 
    }
}

//For :/songId
const getSong = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song);
    } catch(err) {
        throw new Error(`Error deleting songs: ${err.message}`) 
    }
}
const updateSong = async (req, res, next) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.songId, req.body, {new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(updatedSong);
    } catch(err) {
        throw new Error(`Error updating song: ${err.message}`) 
    }
}

const deleteSong = async (req, res, next) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.songId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedSong);
    } catch(err) {
        throw new Error(`Error deleting song: ${err.message}`) 
    }
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong
};