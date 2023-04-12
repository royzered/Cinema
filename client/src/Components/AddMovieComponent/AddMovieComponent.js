import '../../App.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddMovieComponent() {
const navigate = useNavigate();

const token = sessionStorage["token"];

const [movieImage, setMovieImage] = useState("");
const [newMovie, setNewMovie] = useState({ filmName : "",
                                           released : "",
                                            genres : "", 
                                            image : ""});

useEffect(() => {
   function checkToken(token) {
  if(!token) {
    navigate("/login");
  }
  }
  checkToken(token);
}, [token, navigate] );

  return (
    <div className="App">
       <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
          Add Film 
      </h2>

      <br/>

      <section>
     Name <input onChange={e => setNewMovie({...newMovie, filmName : e.target.value})} type='text' placeholder='Film Name' /> <br /> <br />
     Release Year <input type='number' placeholder='2023'/> <br /> <br />
      Genres <input type='text' placeholder='Genres' /> <br /> <br />
      Image URL<input onChange={(e) => setMovieImage(e.target.value)} type='text' placeholder='image url' /> <br /> <br />
      { 
      movieImage.includes(".jpg" || ".png" || ".webp" || ".svg") &&
      <span style={{right : 0, position : 'absolute', top : "10%"}}>
        <h5> 
        Image Preview
         </h5>
        <img alt='Movie poster preview' width={"200px"} src={movieImage} /> 
      </span>
      }
      </section>
      <button onClick={() => console.log(newMovie)}>Add Film</button> &nbsp;
       <Link to={"/"} className='goBack'> <button>Cancel</button> </Link>

    </div>
  );
}

export default AddMovieComponent;
