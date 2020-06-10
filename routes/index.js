var express = require('express');
var router = express.Router();
var axios = require('axios');
require('dotenv').config({path: __dirname + '/.env'});

class MovieDBWrapper{
  constructor(){
    this.baseUrl = `http://api.themoviedb.org/3/`;
    this.apiKey = process.env.API_KEY;
    this.sessionID = null;
  }

  // create query strings for endpoints
  buildQueryString = (params) => {
    let queryString = `?api_key=${this.apiKey}`;
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        queryString += `&${key}=${value}`;
      }
    }
    return queryString
  };

  // get guest session id - necessary for post later
  // must be asynchronous or the promise doesn't resolve
  // i have the feeling there is a redundant promise between
  // this and when it's called asnychronously,
  // but none of my efforts at simplification have worked
async initializeGuestSession() {
  let apiQuery = this.buildQueryString({});
  try {
    const sessionData = await axios.get(
      `${this.baseUrl}authentication/guest_session/new${apiQuery}`,
    );
    if (!sessionData.data) throw 'error';
    this.sessionID = sessionData.data.guest_session_id;
    return this.sessionID;
  }
  catch (err) {
    console.error(err);
    throw error;
  }
}

  // creating the get url
  get(path, params){
    if(!this.sessionID){
      throw new Error('SessionID must be intialized')
    }
    let apiQuery = this.buildQueryString(params)

    return axios.get(`${this.baseUrl}${path}${apiQuery}`)
      .then(resp => {
        console.log(resp.data)
        return resp.data
    })
    .catch(err=>console.log(err.data));
};

  // the post syntax is more specific than i would like
  // the API does not have many post routes and they're all formatted differently
  post(path, params, payload){
		if(! this.sessionID){
      throw new Error('SessionID must be intialized')
    }

    let queryString = `?api_key=${this.apiKey}`;

		if(params){
      const entries = Object.entries(params)
      for(const [key, value] of entries){
          queryString+=`&${key}=${value}`;
      };
    }

    return axios.post(`${this.baseUrl}movie/${movie_id}${path}${queryString}`, {'value': payload})
    .then(resp => {
      console.log(resp.data)
      return resp.data
  })
  .catch(err=>console.log(err.data));
};

  // get movie now playing endpoint
  getNowPlaying(language, page, region){
    let path = 'movie/now_playing';
    let params = {
      'language': language,
      'page': page,
      'region': region,
    }
    console.log(params);

    return this.get(path, params);
  }


  // get movies endpoint
    getPopularMovies(language, page, region){
      let path = 'movie/popular';
      let params = {
        'language': language,
        'page': page,
        'region': region,
      } 

    return this.get(path, params);
  }

  // post movies endpoint
  postMovieRating(guest_id, movie_id, rating){
    let path = `/rating/${movie_id}`;
    let params = {
      'guest_session_id': guest_id,
    };
    let payload = rating;
    return this.post(path, params, payload)
  }
  
};


async function genericFunctionName() {
	const try1 = new MovieDBWrapper();
	await try1.initializeGuestSession();
  // console.log(`try1 sessionID: ${try1.sessionID}`);
  try1.getNowPlaying('en', 1, 'US')
  try1.postMovieRating(try1.sessionID, 234324, 4)
};
genericFunctionName();




module.exports = router;
