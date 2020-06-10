var axios = require('axios');
var util = require('./utility');

async function createURL(language, page, region){
    const key = process.env.API_KEY;
    const baseURL=`http://api.themoviedb.org/3`;
    const apiQuery= `?api_key=${key}`;
    return `${baseURL}/movie/popular/${apiQuery}&language=${language}&page=${page}$region=${region}`
}


const getPopMovies = async (language, page, region)=>{
    const popularMovieURL = await createURL(language, page,region);

    return axios.get(popularMovieURL)
    .then(resp => {
        if(!resp.data){
            throw ('error');
        }
        console.log(resp.data)
        return resp.data
    }).catch(error=>{
        console.log(error);
        throw error
    })
}

module.exports.getPopMovies = getPopMovies;