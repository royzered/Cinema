import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FilmComponent() {
const [movies, setMovies] = useState([{}]);
const token = sessionStorage["token"];
const navigate = useNavigate();

useEffect(() => {
  if(!token) {
    navigate("/login");
  }
},token );

useEffect(() => {
  async function getMovies()
    {
      let moviesFromServer = await utils.getMovies();
      setMovies(moviesFromServer.data);
    }
    getMovies();
}, []);

  return (
    <div className="App">
      <table>
        {
          movies.map(movie => {
           return( <tbody> <tr>
            <td>
              <img className='moviePoster' src={movie.image} alt={movie.name} />
            </td>
            <td>
              {movie.name}
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

export default FilmComponent;
