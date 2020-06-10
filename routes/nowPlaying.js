const util =  require('./utility');
const axios= require('axios')

const getNowPlaying = ()=>{
    return axios.post(util.nowPlayingURL)
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