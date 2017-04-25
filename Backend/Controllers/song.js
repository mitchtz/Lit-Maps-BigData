const dotenv = require('dotenv')
const request = require('request')
const Song = require('../Models/Song')

dotenv.load({ path: '.env' })

/*
 * GET song/
 * Retrieves name, artist, rank, albumCover for all songs
 * JSON 200 res: {
    songs: [
      rank: Number,
      track_id: String,
      track_name: String,
      track_artist: String,
      track_album: String,
      album_cover: [{
        width: Number,
        url: String,
        height: Number
      }],
      preview_url: String
    ]}
 * JSON 400 res: {error: String}
 */
 exports.getAllSongs = (req, res) => {
   Song.find({}, (err, existingSongs) => {
     if(err){
       res.status(400).json({error: err})
       return
     }
     if(existingSongs){
       res.status(200).json({songs: existingSongs})
       return
     }
   })
 }

/*
 * GET song/:songID
 * Retrieves name, artist, rank, albumCover for a song
 * JSON 200 res: {
     rank: Number,
     track_id: String,
     track_name: String,
     track_artist: String,
     track_album: String,
     album_cover: [{
       width: Number,
       url: String,
       height: Number
     }],
     preview_url: String
   }
 * JSON 400 res: {error: String}
 */
exports.getSong = (req, res) => {
  Song.findOne({track_id: req.params.songID}, (err, existingSong) => {
    if(err){
      res.status(400).json({error: err})
      return
    }
    if(existingSong){
      res.status(200).json({existingSong})
      return
    }
  })
}
