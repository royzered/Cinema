import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MovieComponent() {

const [movies, setMovies] = useState([{}]);

const token = sessionStorage["token"];
const navigate = useNavigate();

useEffect(() => {
  if(!token) {
    navigate("/login");
  }
},token );

useEffect(() => {
  async function getMovie()
    {
      let getMovie = await utils.getMovie();
      setMovies(getMovie.data);
    }
    getMovie();
}, []);

  return (
    <div className="App">
      <h2>
        Films Playing
      </h2>
      <table>
        {
          movies.map(movie => {
           return( <tbody> <tr>
            <td>
              <img className='moviePoster' src={movie.image} alt={movie.nameFilm} />
            </td>
            <td style={{fontWeight : "bold"}}>
              {movie.filmName} {movie.year}
            </td>
            <td>
               <ul>
               {
                (movie && movie.genres) && movie.genres.map(genre => <li>{genre}</li>)
               }
              </ul> 
            </td>
           </tr> 
           </tbody> )
          })
        }
      </table>
     
    </div>
  );
}

export default MovieComponent;
