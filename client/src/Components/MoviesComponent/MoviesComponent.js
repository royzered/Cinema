import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function MoviesComponent() {

  const [subs, setSubs] = useState([{}]);

  const movieStoreData = useSelector(state => state);

const token = sessionStorage["token"];
const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
   function checkToken(token) {
  if(!token) {
    navigate("/login");
  }
  }
  checkToken(token);
}, [token] );

useEffect(() => {

  async function getMovies() {
      let moviesFromServer = await utils.getMovies();
      dispatch({type : "GETDATA", payload : moviesFromServer.data})
  }
  
  async function getSubs() {
    let getSubs = await utils.getSubs();
    setSubs(getSubs.data);
  };
  
  getMovies();
  getSubs();

  },[]);

  return (
    <div className="App">
      <h2>
      Films Playing
      </h2>
      <table>
        {
          // movieStoreData.movies.map(movie => {
          //   return (
          //     <ul>
          //       <li>
          //         {movie.filmName}
          //       </li>
          //     </ul>
          //   )
          // })

        movieStoreData.movies.map(movie => {
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
                subs.filter(sub => sub.filmName === movie.filmName).map(sub => {
                    return (
                      <li key={sub.name}>
                        {sub.name} {sub.date}
                      </li>
                    )
                })
              
              }
              </ul>
            </td>
            <td>
              <button className='editButton'> EDIT </button>
            </td>
            <td>
            <button className='deleteButton'> DELETE </button>
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
