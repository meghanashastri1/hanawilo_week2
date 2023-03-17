// For '/song' endpoints 

const getSongs = (req, res, next) => {
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

//For :/songId
const getSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Show me the song with song ID of ${req.params.songId}`});
}
const updateSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Update the song with song ID of ${req.params.songId}`});
}

const deleteSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({message: `Delete the song with song ID of ${req.params.songId}`});
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs,
    getSong,
    updateSong,
    deleteSong
};