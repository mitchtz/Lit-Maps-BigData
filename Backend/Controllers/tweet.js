const dotenv = require('dotenv')
const request = require('request')
const Tweet = require('../models/Tweet')

dotenv.load({ path: '.env' })

/*
 * GET tweets/:songID
 * Retrieves an array of tweets for that song
 * JSON 200 res: {
    tweets: [
      track_id: String,
      tweet_id: String,
      location: {lat: Number, lon: Number},
      lat: String,
      long: String,
      sentiment: Number,
      created_at: String]}
 * JSON 400 res: {error: String}
 */
exports.getTweets = (req, res) => {
  Tweet.find({track_id: req.params.songID}, (err, existingTweets) => {
    if(err){
      res.status(400).json({error: err})
      return
    }
    if(existingTweets){
      res.status(200).json({tweets: existingTweets})
      return
    }
  })
}
