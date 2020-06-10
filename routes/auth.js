var axios = require('axios');
// var express = require('express');
// var router = express.Router();
const util =  require('./utility');


const newGuestSession = ()=>{
    return axios.get(util.guestURL)
    .then(resp => {
        if(!resp.data){
            throw ('error');
        }
        return resp.data.guest_session_id;
    }).catch(error=>{
        console.log(error);
        throw error
    })
};

module.exports.newGuestSession = newGuestSession;