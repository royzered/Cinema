import '../../App.css';
import utils  from '../../API/utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function MoviesComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = sessionStorage["token"];

  const movieStoreData = useSelector(state => state.movies);
  const subStoreData = useSelector(state => state.subs);



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
    dispatch({type : "GETSUBSDATA", payload : getSubs.data})
  };
  
  getMovies();
  getSubs();

  },[]);



  const deleteMovie = async (id) => {
    let deleteMovie = await utils.removeMovie(id);
    return deleteMovie;
  }


  const deleteFilmRedux = (id) => {
    dispatch({type : "DELETEMOVIE", payload : id})
  };

  


  return (
    <div className="App">
      <span>
      <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
      Films Playing
      </h2>
      <input className='searchInput' type='text' placeholder='Search'/> 
      </span>
      <table>
        {
        movieStoreData.movies.map(movie => {
           return( <tbody> <tr>
            <td>
              <img className='moviePoster' src={movie.image} alt={movie.name} />
            </td>
            <td style={{fontWeight : "bold"}}>
             <Link to={`movie/${movie._id}`}> {movie.filmName} ({movie.released})  </Link>
            </td>
            <td>
               <ul>
               {
                (movie && movie.genres) && movie.genres.map(genre => <li>{genre}</li>)
               }
              </ul> 
            </td>
            <td>
             { subStoreData.subs.filter(sub => sub.filmName === movie.filmName).length > 0 ? <h4>Subscribed</h4> : <h4>No Subscriptions</h4> }
                <ul>
                  {
                subStoreData.subs.filter(sub => sub.filmName === movie.filmName).map(sub => {
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
            <button className='deleteButton' onClick={() => {deleteMovie(movie._id) && deleteFilmRedux(movie._id)}}> DELETE </button>
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
