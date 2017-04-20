const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
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
}, { timestamps: true })

const Song = mongoose.model('Song', songSchema, 'top50')
module.exports = Song
