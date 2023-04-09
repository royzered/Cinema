import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MovieComponent() {

const token = sessionStorage["token"];
const moviesData =  useSelector(state => state.movies);
const subStoreData =  useSelector(state => state.subs);

const [movie, setMovie] = useState({});
const [subs, setSubs] = useState([{}]);

let id = useParams().id;

const navigate = useNavigate();

useEffect(() => {
  if(!token) {
    navigate("/login");
  }
},token );


useEffect(() => {
 setMovie( moviesData.movies.find(movie => movie._id === id));
 setSubs(subStoreData.subs.filter(sub => sub.movieID === id));
}, []);

  return (
    <div className="App">
    <h1 className='filmName'>{movie.filmName}</h1>
    <img src={movie.image} width={"200px"}/>
    <section>
     <h5> Release Year </h5> 
     {movie.released}
    
    </section>
    <br />
    <h3>Watched Film</h3>
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
    </div>
  );
}

export default MovieComponent;
