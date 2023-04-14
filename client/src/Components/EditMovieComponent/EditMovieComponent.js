import '../../App.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import utils from '../../API/utils';
import { useSelector } from 'react-redux';

function EditMovieComponent() {
  let id = useParams().id;
  const navigate = useNavigate();

const moviesData =  useSelector(state => state.movies);

const [movie, setMovie] = useState({});
const [updateMovie, setUpdateMovie] = useState({ filmName : "",
                                           released : 0,
                                            genres : [], 
                                            image : ""});


useEffect(() => {
  setMovie( moviesData.movies.find(movie => movie._id === id));
  setUpdateMovie(movie);
}, [id, moviesData.movies]);

const [movieImage, setMovieImage] = useState("");
const [error, setError] = useState("");

async function updateFilm(id, updateMovie) {
  let update = await utils.updateMovie(id, updateMovie);
  if(update.data) {
    navigate("/");
  }
  else {
    setError(update);
  }
}

function handleGenres(event) {
  let movieGenres = event.target.value;
  let genres = movieGenres.split(",").map(genre => genre.trim());
  setUpdateMovie({...updateMovie, genres : genres});
}

function handleMovieImage(event) {
  setMovieImage(event.target.value);
  setUpdateMovie({...updateMovie, image : event.target.value});
} 

  return (
    <div className="App">
       <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
          Edit Film 
      </h2>

      <br/>

      <section>
     Name <input defaultValue={movie.filmName} required onChange={e => setUpdateMovie({...updateMovie, filmName : e.target.value})} type='text' placeholder='Citizen Kane ' /> <br /> <br />
     Release Year <input defaultValue={movie.released} onChange={(e) => setUpdateMovie({...updateMovie, released : e.target.value})} type='number' placeholder='1941'/> <br /> <br />
      Genres <input defaultValue={movie.genres} required onChange={(e) => handleGenres(e) } type='text' placeholder='Drama' /> <br /> <br />
      Image URL<input defaultValue={movie.image} onChange={(e) => handleMovieImage(e)} type='text' placeholder='citizen_kane_poster.jpg' /> <br /> <br />
      { 
      <span style={{right : 0, position : 'absolute', top : "10%"}}>
        <h5> 
        Image Preview
         </h5>
        <img alt='Movie poster preview' width={"200px"} src={movieImage.length > 0? movieImage : movie.image} /> 
      </span>
      }
      </section>
      <button onClick={() => updateFilm(id, updateMovie)}>Edit Film</button> &nbsp;
       <Link to={"/"} className='goBack'> <button>Cancel</button> </Link>
       <br />
      {
        error.length > 0 && <span style={{fontWeight : "800"}}> {error} </span>
      }
    </div>
  );
}

export default EditMovieComponent;
