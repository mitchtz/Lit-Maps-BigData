const dotenv = require('dotenv')
const request = require('request')
const Song = require('../models/Song')

dotenv.load({ path: '.env.example' })

/*
 * GET song/
 * Retrieves name, artist, rank, albumCover for all songs
 * JSON 200 res: {songs: [{name: String, artist: String, rank: Number, albumCover: String}]}
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
 * JSON 200 res: {name: String, artist: String, rank: Number, albumCover: String}
 * JSON 400 res: {error: String}
 */
exports.getSong = (req, res) => {
  Song.findOne({_id: req.params.songID}, (err, existingSong) => {
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
