import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MovieComponent() {

const token = sessionStorage["token"];
const moviesData =  useSelector(state => state.movies);
const [movie, setMovie] = useState({});
let id = useParams().id;

const navigate = useNavigate();

useEffect(() => {
  if(!token) {
    navigate("/login");
  }
},token );


useEffect(() => {
 setMovie( moviesData.movies.find(movie => movie._id === id));
}, []);

  return (
    <div className="App">
    <h1 className='filmName'>{movie.filmName}</h1>
    <img src={movie.image} width={"200px"}/>
    <h3></h3>
     
    </div>
  );
}

export default MovieComponent;
