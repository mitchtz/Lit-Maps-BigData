const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  rank: Number,
  albumCover: String
}, { timestamps: true })

const Song = mongoose.model('Song', songSchema)
module.exports = Song
