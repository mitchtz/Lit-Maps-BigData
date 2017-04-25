const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  track_id: String,
  tweet_id: Number,
  location: {lat: Number, lon: Number},
  lat: String,
  long: String,
  sentiment: Number,
  created_at: Number
}, { timestamps: true })

module.exports = mongoose.model('Tweet', tweetSchema, 'tweets')
