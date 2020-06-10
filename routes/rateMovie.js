var axios = require('axios');
var express = require('express');
var router = express.Router();
const auth = require('./auth');


async function createURL(movie_id){
    const key = process.env.API_KEY;
    const baseURL=`http://api.themoviedb.org/3`;
    const apiQuery= `?api_key=${key}`;
    const sessionAuth = await auth.newGuestSession();
    console.log(sessionAuth);
    return `${baseURL}/movie/${movie_id}/rating${apiQuery}&guest_session_id=${sessionAuth}`
}


const rateMovies = async (movie_id, rating)=>{
    const rateMovieURL = await createURL(movie_id);
    return axios.post(rateMovieURL, {"value": rating})
    .then(resp => {
        if(!resp.data){
            throw ('error');
        }
        if(resp.data.status_message = 'Success.'){
            console.log(`Movie rating (${rating}) successfully posted`)
        }
        return resp.data
    }).catch(error=>{
        console.log(error);
        throw error
    })
}
module.exports.postRating = rateMovies;