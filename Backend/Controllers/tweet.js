const dotenv = require('dotenv')
const request = require('request')
const Tweet = require('../models/Tweet')

dotenv.load({ path: '.env.example' })

/*
 * GET tweets/:songID
 * Retrieves an array of tweets for that song
 * JSON 200 res: {tweets: [{lat: String, long: String, date: Date, sentiment: Number}]}
 * JSON 400 res: {error: String}
 */
exports.getTweets = (req, res) => {
  Tweet.find({songID: req.params.songID}, (err, existingTweets) => {
    if(err){
      res.status(400).json({error: err})
      return
    }
    if(existingSong){
      res.status(200).json({tweets: existingTweets})
      return
    }
  })
}
