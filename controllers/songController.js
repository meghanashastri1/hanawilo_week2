const Song = require('../models/Song');
// For '/song' endpoints 

const getSongs = async (req, res, next) => {
    //query parameter 
    const filter = {};
    const options = {};

    if (Object.keys(req.query).length){
        const {
            limit, 
            sortByArtist,
            songTitle,
            artist,
            genre
        } = req.query;

        if (songTitle) filter.songTitle = true
        if (artist) filter.artist = true
        if (genre) filter.genre = true

        if (limit) options.limit = limit; 
        if (sortByArtist) options.sort = {
            artist: sortByArtist === 'asc' ? 1 : -1
        }


        console.log(filter, options);
        
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
// For '/:songId/ratings' endpoint 
const getSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song.ratings)
    } catch (err){
        next(err); 
    }
}

const postSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        song.ratings.push(req.body)

        //saves new rating to the database 
        await song.save()

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song.ratings)
    } catch (err){
        next(err); 
    }
}

const deleteSongRatings = async (req, res, next) => {
    try {
        const result = await Song.findById(req.params.songId);
        result.ratings = []

        //saves new rating to the database 
        await result.save()

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: `Deleted all ratings for song id of ${req.params.songId}`})
    } catch (err){
        next(err); 
    }
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong,
    getSongRatings,
    postSongRating,
    deleteSongRatings
};