var express = require('express');
var router = express.Router();
var axios = require('axios');
const ISO6391 = require('iso-639-1');
const countries = require("i18n-iso-countries");
require('dotenv').config({path: __dirname + '/.env'});

const auth = require('./auth');
const popular = require('./popularMovie');
const nowPlaying = require('./nowPlaying');
const rateMovie = require('./rateMovie');

// // const sessionAuth = auth.newGuestSession();
// // const nowPlayingMovies = nowPlaying.getNowPlaying();
// // const movieRating = rateMovie.postRating()

// // const getSessionAuthId = auth.newGuestSession();

// async function postMovieRating(movie_id=501907, rating=5){

//   if(typeof(movie_id) !== 'number'){
//     throw new Error('movie id must be a number')
//   };
//   if(rating < 0.5 || rating > 10 || typeof(rating) !== 'number'){
//     throw new Error('rating must be a number between 0.5 and 10')
//   };

//   const movieRating = await rateMovie.postRating(movie_id, rating);
//   console.log(movieRating)
//   return movieRating
// };
// // postMovieRating(501908, 3);


// async function getPopularMovies(language='en', page=1, region='US'){
//   const pageNumber = Math.round(page)

//   // check the params; 
//   if(!ISO6391.validate(language)){
//     throw new Error('language must be in a valid number ISO 639-1 format')
//   }
//   if(!countries.isValid(region)){
//     throw new Error('region codes must use the ISO 3166-1 code ')
//   }
//   if(typeof(page) !== 'number'){
//     throw new Error('page must be of type number')
//   }
//   if(pageNumber< 1 || pageNumber > 1000){
//     throw new Error('page number must be between 1 and 1000')
//   }
//   const popularMovies = await popular.getPopMovies(language, page, region);

// };
// // getPopularMovies('en', 1, 'US');


// async function getNowPlayingMovies(language='en', page=1, region='US'){
//   const pageNumber = Math.round(page)

//   if(!ISO6391.validate(language)){
//     throw new Error('language must be in a valid number ISO 639-1 format')
//   }
//   if(!countries.isValid(region)){
//     throw new Error('region codes must use the ISO 3166-1 code ')
//   }
//   if(typeof(page) !== 'number'){
//     throw new Error('page must be of type number')
//   }
//   if(pageNumber< 1 || pageNumber > 1000){
//     throw new Error('page number must be between 1 and 1000')
//   }

//   const nowPlayingMovies = await nowPlaying.getNowPlaying(language, page, region);
// }
// getNowPlayingMovies('en', 3, 'US');


class MovieDBWrapper{
  constructor(){
    this.baseUrl = `http://api.themoviedb.org/3/`;
    this.apiKey = process.env.API_KEY;
    this.sessionID = null;
  }

  initializeGuestSession(){
    this.sessionID = axios.get(this.baseUrl + 'authentication/guest_session/new' + this.apiQuery + this.apiKey)
  }

  get(path, params){
    if(!this.sessionID){
      throw new Error('SessionID must be intialized')
    }

    let apiQuery = '';
		if(params){
      const entries = Object.entries(params);
      for(const [key, value] of entries){
        if(key === 'api_key'){
          apiQuery+=`?${key}=${value}`;
        }
        else{        
          apiQuery+=`&${key}=${value}`;
      }
      }
    }

    return axios.get(`${this.baseUrl}${path}${apiQuery}`)
      .then(resp => {
        console.log(resp.data)
        return resp.data
    })
    .catch(err=>console.log(err));
  }

  post(path, params, payload){
		if(! this.sessionID){
      throw new Error('SessionID must be intialized')
    }
		let apiQuery = ``
		if(params){
      const entries = Object.entries(params)
      for(const [key, value] of entries){
        apiQuery.concat(`&${key}=${value}`)
      }
    }

    return axios.post(this.baseUrl + path + payload.movieId + apiQuery)
  }

  getNowPlaying(apiKey, language, page, region, api){
    let path = 'movie/now_playing';
    let params = {
      'api_key': apiKey,
      'language': language,
      'page': page,
      'region': region,
    }

    return this.get(path, params);
  }

    getPopularMovies(apiKey, language, page, region){
      let path = 'movie/popular';
      let params = {
        'api_key': apiKey,
        'language': language,
        'page': page,
        'region': region,
      } 

    return this.get(path, params);
  }

  // postMovieRating(movie_id, rating){
  //   let path = '/rating';
  // }
}
const try1 = new MovieDBWrapper();
try1.initializeGuestSession();
// try1.getNowPlaying(try1.apiKey, 'en', 1, 'US');
try1.getPopularMovies(try1.apiKey, 'en', 1, 'US')
module.exports = router;
