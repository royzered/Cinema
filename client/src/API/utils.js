import axios from 'axios';

axios.interceptors.request.use((req) => {
   let token = sessionStorage["token"];
   req.headers = {'Authorization' : `Bearer ${token}`};
   return req;
})

const getMovies = async () => {
   return axios.get("http://127.0.0.1:8000/api/movies", { withCredentials : true});
}

export default {getMovies};