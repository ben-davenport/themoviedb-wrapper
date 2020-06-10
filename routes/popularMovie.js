var axios = require('axios');
var util = require('./utility');

const getPopMovies = ()=>{
    return axios.post(util.popularMovieURL)
    .then(resp => {
        if(!resp.data){
            thorw ('error');
        }
        console.log(resp.data)
        return resp.data
    }).catch(error=>{
        console.log(error);
        throw error
    })
}

module.exports.getPopMovies = getPopMovies;