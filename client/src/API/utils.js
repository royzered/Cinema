import axios from 'axios';

axios.interceptors.request.use((req) => {
   let token = sessionStorage["token"];
   req.headers = {'Authorization' : `Bearer ${token}`};
   return req;
})

const moviesAPI = "http://127.0.0.1:8000/api/movies";

const subsAPI = "http://127.0.0.1:8000/api/subs";

const getMovies = async () => {
   return axios.get(moviesAPI, { withCredentials : true});
}

// const getMovie = async (id) => {
//    return axios.get(`${moviesAPI}/${id}`, { withCredentials : true});
// }

const removeMovie = async (id) => {
   return axios.delete(`${moviesAPI}/${id}`);
}

const getSubs = async () => {
   return axios.get(subsAPI, { withCredentials : true });
}


const utils = { getMovies, removeMovie, getSubs};

export default utils;