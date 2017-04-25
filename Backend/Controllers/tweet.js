const dotenv = require('dotenv')
const request = require('request')
const Tweet = require('../models/Tweet')
const moment = require('moment')

dotenv.load({ path: '.env' })
moment().format()

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
      res.status(200).json({length: existingTweets.length, tweets: existingTweets})
      return
    }
  })
}

/*
 * GET tweets/:songID/:hours
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
 exports.getTweetsDate = (req, res) => {
   /*
   var hours = req.params.hours
   var now = 201404240000 //(YYYYMMDDHHMM)
   var targetDate
   if(){
    targetDate = now - (hours * 100)
  }
  */

   Tweet.find({track_id: req.params.songID, created_at: {$gte: targetDate}}, (err, existingTweets) => {
     if(err){
       res.status(400).json({error: err})
       return
     }
     if(existingTweets){
       res.status(200).json({length: existingTweets.length, tweets: existingTweets})
       return
     }
   })
 }
