import '../../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function FilmComponent() {

let [movies, setMovies] = useState([{}]);

const moviesData = async () => {
let resp = await axios.get("http://127.0.0.1:8000/api/movies");
setMovies(resp.data);
}

useEffect(() => {
  moviesData();
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
