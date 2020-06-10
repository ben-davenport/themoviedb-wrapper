var express = require('express');
var router = express.Router();
var axios = require('axios');
const ISO6391 = require('iso-639-1');
require('dotenv').config({path: __dirname + '/.env'});

const auth = require('./auth');
const popular = require('./popularMovie');
const nowPlaying = require('./nowPlaying');
const rateMovie = require('./rateMovie');

// const sessionAuth = auth.newGuestSession();
// const nowPlayingMovies = nowPlaying.getNowPlaying();
// const popularMovies = popular.getPopMovies();
// const movieRating = rateMovie.postRating()

// const getSessionAuthId = auth.newGuestSession();

async function postMovieRating(movie_id=501907, rating=5){

  if(typeof(movie_id) !== 'number'){
    throw new Error('movie id must be a number')
  };
  if(rating < 0.5 || rating > 10 || typeof(rating) !== 'number'){
    throw new Error('rating must be a number between 0.5 and 10')
  };

  const movieRating = await rateMovie.postRating(movie_id, rating);
  console.log(movieRating)
  return movieRating
};
postMovieRating(501908, 3);


function getPopularMovies(language='en', page=1, region='US'){
  // check the params; 
  if(ISO6391.validate(language) && region)
  const params = [language, page, region]
  
  //pass to the appropriate endpoint
  // return the result
}

function getNowPlayingMovies(language='en', page=1, region='US'){
  const params = [language, page, region]
  // module.exports.nowPlayingParams = params;
}

// function rateMovie(move_id, rating, guest_session_id){
//   // const sessionAuth = auth.newGuestSession().then(data=>console.log(data.data.guest_session_id));


// }


module.exports = router;
