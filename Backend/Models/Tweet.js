const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  songID: {type: mongoose.Schema.Types.ObjectId, ref: 'Song'},
  lat: String,
  long: String,
  date: Date,
  sentiment: Number
}, { timestamps: true })

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet
