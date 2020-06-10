var express = require('express');
var router = express.Router();
var axios = require('axios');
const ISO6391 = require('iso-639-1');
const countries = require("i18n-iso-countries");
require('dotenv').config({path: __dirname + '/.env'});


class MovieDBWrapper{
  constructor(){
    this.baseUrl = `http://api.themoviedb.org/3/`;
    this.apiKey = process.env.API_KEY;
    this.sessionID = null;
  }

  buildQueryString = (params) => {
    let queryString = `?api_key=${this.apiKey}`;
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        queryString += `&${key}=${value}`;
      }
    }
    return queryString
  }

  initializeGuestSession(){
    let apiQuery = this.buildQueryString({})
    return axios.get(`${this.baseUrl }authentication/guest_session/new${apiQuery}`)
    .then(resp => {
      if(!resp.data){
          throw ('error');
      }
      console.log(this.sessionID = resp.data.guest_session_id)
      return this.sessionID = resp.data.guest_session_id;
  }).catch(error=>{
      console.log(error);
      throw error
  })

};

  // creating the get url
  get(path, params){
    if(!this.sessionID){
      throw new Error('SessionID must be intialized')
    }
    console.log(this.sessionID);

    let apiQuery = this.buildQueryString(params)

    return axios.get(`${this.baseUrl}${path}${apiQuery}`)
      .then(resp => {
        console.log(resp.data)
        return resp.data
    })
    .catch(err=>console.log(err.data));
  }

  // the post syntax is more specific than i would like
  // the API does not have many post routes and they're all formatted differently
  post(path, params, payload){
		if(! this.sessionID){
      throw new Error('SessionID must be intialized')
    }

    let queryString = `?api_key=${this.apiKey}`;
    let movie_id = ``;

		if(params){
      const entries = Object.entries(params)
      for(const [key, value] of entries){
        if(key === 'movie_id'){
          movie_id+=`${value}`
        }
        else{        
          queryString+=`&${key}=${value}`;
      }
      };
    }

    console.log(`${this.baseUrl}/movie${movie_id}${path}${queryString}`, payload);

    return axios.post(`${this.baseUrl}/movies/${movie_id}${path}${queryString}`, payload)
  }

  getNowPlaying(language, page, region){
    let path = 'movie/now_playing';
    let params = {
      'api_key': this.apiKey,
      'language': language,
      'page': page,
      'region': region,
    }
    console.log(params);

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

  postMovieRating(apiKey, guest_session_id, movie_id, rating){
    let path = '/rating';
    let params = {
      'api_key': apiKey,
      'guest_session_id': guest_session_id,
    };
    let payload = rating;
    return this.post(path, params, payload)
  }
}
const try1 = new MovieDBWrapper();
try1.initializeGuestSession();
console.log(`try1 sessionID: ${try1.sessionID}`)
// try1.getNowPlaying('en', 1, 'US');
// try1.getPopularMovies(try1.apiKey, 'en', 1, 'US')
// try1.postMovieRating(try1.apiKey, try1.guest_session_id,501907, 4);
module.exports = router;
