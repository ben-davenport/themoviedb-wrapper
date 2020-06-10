

const key = process.env.API_KEY;
const baseURL=`http://api.themoviedb.org/3`;
const apiQuery= `?api_key=${key}`;

const utility = {
    popularMovieURL: `${baseURL}/movie/popular${apiQuery}`,
    nowPlayingURL: `${baseURL}/movie/now_playing${apiQuery}`,
    guestURL: `${baseURL}/authentication/guest_session/new${apiQuery}`
}

module.exports = utility;