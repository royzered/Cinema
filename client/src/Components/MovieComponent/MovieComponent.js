import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MovieComponent() {

const moviesData =  useSelector(state => state.movies);
const subStoreData =  useSelector(state => state.subs);

const [movie, setMovie] = useState({});
const [subs, setSubs] = useState([{}]);

let id = useParams().id;

const navigate = useNavigate();

const token = sessionStorage["token"];

useEffect(() => {
   function checkToken(token) {
  if(!token) {
    navigate("/login");
  }
  }
  checkToken(token);
}, [token] );


useEffect(() => {
 setMovie( moviesData.movies.find(movie => movie._id === id));
 setSubs(subStoreData.subs.filter(sub => sub.movieID === id));
}, []);

  return (
    <div className="App">
    <img src={movie.image} style={{right : 0, position : "absolute", top : "55px", width : "40%", height : "93%"}} />
    <section className='movieDetailsSection'>
      <br />
    <h1 className='filmName'>{movie.filmName}</h1>
     <h3> Release Year </h3> 
     {movie.released}
     <br /> <br />
     <h3>Genres</h3>
      <ul>
        {
          movie.genres && movie.genres.map(genre => {
            return (
              <li>
                {genre}
              </li>
            )
          })
        }
      </ul> 
      <br /> <br />
    {
     subs.length > 0 ? <h3>Watched Film</h3> : <h4> No Subscriptions </h4>
    }
      <ul>
      {
        subs.map(sub => {
          return (
            <li>
              {sub.name} <span style={{fontSize : "12px", fontWeight : "bolder"}}>@</span> {sub.date}
            </li>
          )
        })
      }
      </ul>
    </section>
    </div>
  );
}

export default MovieComponent;
