import '../../App.css';
import utils  from '../../API/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function MoviesComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieStoreData = useSelector(state => state.movies);
  const subStoreData = useSelector(state => state.subs);

  const [search, setSearch] = useState([]);


useEffect(() => {
  async function getMovies() {
      let moviesFromServer = await utils.getMovies();
      setSearch(moviesFromServer.data)
      dispatch({type : "GETDATA", payload : moviesFromServer.data})
  }
  
  async function getSubs() {
    let getSubs = await utils.getSubs();
    dispatch({type : "GETSUBSDATA", payload : getSubs.data})
  };
  
  getMovies();
  getSubs();
  

  },[dispatch, navigate]);

  const deleteMovie = async (id) => {
    let deleteMovie = await utils.removeMovie(id);
    dispatch({type : "DELETEMOVIE", payload : id});
    let newMovies = search.filter(movie => movie._id !== id);
      setSearch(newMovies);    
    return deleteMovie;
  }

    const searchFilm = (input) => {
       setSearch(movieStoreData.movies.filter(movie => {
        const movieName = movie.filmName.toLowerCase();
        const searchInput = input.toLowerCase();
        return movieName.includes(searchInput);
      }));
    }


  return (
    <div className="App">
      <span>
      <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
      Films 
      </h2>
      <input onKeyUpCapture={(e) => {searchFilm(e.target.value)}} onClick={(e) => { searchFilm(e.target.value); e.target.value = '';}} className='searchInput' type='text' placeholder='Search'/> 
      <Link to={"/movie/add"} title="Add Film" style={{fontSize : "30px", position : 'absolute', width : "2%", top: "9.5%", right : "2%"}}> + </Link>
      </span>
      <table>
        {
        search.map(movie => {
           return( <tbody> <tr>
            <td>
             <Link to={`movie/${movie._id}`}> <img className='moviePoster' src={movie.image} alt={movie.name}/> </Link>
            </td>
            <td style={{fontWeight : "bold"}}>
             <Link to={`movie/${movie._id}`}> <span className='filmNameSpan'>{movie.filmName}</span> ({movie.released})  </Link>
            </td>
            <td>
               <ul>
               {
                (movie && movie.genres) && movie.genres.map(genre => <li>{genre}</li>)
               }
              </ul> 
            </td>
            <td>
             { subStoreData.subs.filter(sub => sub.movieID === movie._id).length > 0 ? <h4>Subscribed</h4> : <h4>No Subscriptions</h4> }
                <ul>
                  {
                subStoreData.subs.filter(sub => sub.movieID === movie._id).map(sub => {
                    return (
                      <li key={sub.name}>
                       <Link to={`/member/${sub.memberID}`}>{sub.name}</Link> {sub.date}
                      </li>
                    )
                })
              }
              </ul>
            </td>
            <td>
             <Link to={`/movie/edit/${movie._id}`}> <button className='editButton'> EDIT </button> </Link> 
            </td>
            <td>
            <button className='deleteButton' onClick={() => {deleteMovie(movie._id)}}> DELETE </button>
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
