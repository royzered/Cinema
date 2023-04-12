import '../../App.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddSubscriptionsComponent(props) {
  const navigate = useNavigate();
  
  const token = sessionStorage["token"];

  const movieStoreData = useSelector(state => state.movies);
  const subStoreData = useSelector(state => state.subs);
  const [moviesList, setMoviesList] = useState([]);
  const [subsList, setSubsList] = useState([]);

useEffect(() => {
   function checkToken(token) {
  if(!token) {
    navigate("/login");
  }
  }
  checkToken(token);
}, [token, navigate] );

useEffect(() => {
  setSubsList(subStoreData.subs);
  function movieOptions() {
    const movies = movieStoreData.movies;
    const subs = subsList.filter(sub => sub.memberID === props.memberID);
    const movieIDSubs = subs.map(sub => sub.movieID);
    const filteredMovies = movies.filter(movie => !movieIDSubs.includes(movie._id));
    setMoviesList(filteredMovies);
    return filteredMovies;
  }
  movieOptions();
}, [movieStoreData, subsList, subStoreData.subs, props.memberID ])


return (
  <div className="App">
          <h4>Add Subscription</h4>
          <select>

      {
        moviesList.map(movie => {
          return ( 
            <option key={movie._id} value={movie._id}>{movie.filmName} </option>
          )
        })
      }
      </select>
     
       
    </div>
  );
}

export default AddSubscriptionsComponent;
