const util =  require('./utility');
const axios= require('axios')

async function createURL(language, page, region){
    const key = process.env.API_KEY;
    const baseURL=`http://api.themoviedb.org/3`;
    const apiQuery= `?api_key=${key}`;
    return `${baseURL}/movie/now_playing/${apiQuery}&language=${language}&page=${page}$region=${region}`
}


const getNowPlaying = async (language, page, region)=>{
    const nowPlayingURL = await createURL(language, page,region);

    return axios.get(nowPlayingURL)
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

module.exports.getNowPlaying = getNowPlaying;