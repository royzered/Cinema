import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTU0Y2NlNjM4YzU2NDAxOTI2YzBiMiIsImlhdCI6MTY4MDcyMzEzNCwiZXhwIjoxNjgyMTYzMTM0fQ.-Ob5vDz7oTt1SUw7YRy86wp6NLyYQu25Vt7kNmQKZoM";
let options = {
  headers : {
    'Authorization': 'Bearer ' + token 
  }
};

function App() {

let [movies, setMovies] = useState([{}]);

const moviesData = async () => {
let resp = await axios.get("http://127.0.0.1:8000/api/movies", options);
setMovies(resp.data);
}

useEffect(() => {
  moviesData();
}, []);

  return (
    <div className="App">
      <header>
        <h1> 
          OnFilm
        </h1>
      </header>
      <table>
        {
          movies.map(movie => {
            console.log(movie);
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

export default App;
