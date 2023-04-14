import '../../App.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import utils from '../../API/utils';

function AddMovieComponent() {
const navigate = useNavigate();

const [movieImage, setMovieImage] = useState("");
const [newMovie, setNewMovie] = useState();
const [error, setError] = useState("");


async function addMovie() {
  let newFilm = await utils.addMoive(newMovie);
  if(newFilm.data) {
    navigate("/");
  }
  else {
    setError(newFilm);
  }
}

function handleGenres(event) {
  let movieGenres = event.target.value;
  let genres = movieGenres.split(",").map(genre => genre.trim());
  console.log(genres);
  setNewMovie({...newMovie, genres : genres});
}

function handleMovieImage(event) {
  setMovieImage(event.target.value);
  setNewMovie({...newMovie, image : event.target.value});
} 


  return (
    <div className="App">
       <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
          Add Film 
      </h2>

      <br/>

      <section>
     Name <input onChange={e => setNewMovie({...newMovie, filmName : e.target.value})} type='text' placeholder='Citizen Kane ' /> <br /> <br />
     Release Year <input onChange={(e) => setNewMovie({...newMovie, released : e.target.value})} type='number' placeholder='1941'/> <br /> <br />
      Genres <input onChange={(e) => handleGenres(e) } type='text' placeholder='Drama' /> <br /> <br />
      Image URL<input onChange={(e) => handleMovieImage(e)} type='text' placeholder='citizen_kane_poster.jpg' /> <br /> <br />
      { 
      movieImage.length > 0 &&
      <span style={{right : 0, position : 'absolute', top : "10%"}}>
        <h5> 
        Image Preview
         </h5>
        <img alt='Movie poster preview' width={"200px"} src={movieImage} /> 
      </span>
      }
      </section>
      <button onClick={() => addMovie(newMovie)}>Add Film</button> &nbsp;
       <Link to={"/"} className='goBack'> <button>Cancel</button> </Link>
       <br />
      {
        error.length > 0 && <span style={{fontWeight : "800"}}> {error} </span>
      }
    </div>
  );
}

export default AddMovieComponent;
