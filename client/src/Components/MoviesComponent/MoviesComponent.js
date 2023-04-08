import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MoviesComponent() {

  
  const [movies, setMovies] = useState([{}]);
  const [subs, setSubs] = useState([{}]);

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

    async function getSubs() {
      let getSubs = await utils.getSubs();
      setSubs(getSubs.data);
    }
    getMovies();
    getSubs();
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
              <img className='moviePoster' src={movie.image} alt={movie.name} />
            </td>
            <td style={{fontWeight : "bold"}}>
              {movie.filmName} ({movie.released})
            </td>
            <td>
               <ul>
               {
                (movie && movie.genres) && movie.genres.map(genre => <li>{genre}</li>)
               }
              </ul> 
            </td>
            <td>
               <h4>Subscribed</h4>
                <ul>
                  {
                subs.filter(sub => sub.filmName == movie.filmName).map(sub => {
                    return (
                      <li key={sub.name}>
                        {sub.name}
                      </li>
                    )
                })
              
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

export default MoviesComponent;
