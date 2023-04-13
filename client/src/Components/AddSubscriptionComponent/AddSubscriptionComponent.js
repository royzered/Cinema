import '../../App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../API/utils';
import { Link, useNavigate } from 'react-router-dom';

function AddSubscriptionsComponent(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const movieStoreData = useSelector(state => state.movies);
  const subStoreData = useSelector(state => state.subs);
  const [moviesList, setMoviesList] = useState([]);
  let today = new Date().toLocaleDateString();
  const [newSub, setNewSub] = useState({memberID : props.memberID._id, 
    movieID : "", 
    date : today})
    
    
    
    useEffect(() => {
      function movieOptions() {
        const movies = movieStoreData.movies;
        const subs = subStoreData.subs.filter(sub => sub.memberID === props.memberID._id);
        const movieSubs = subs.map(sub => sub.movieID);
        const filteredMovies = movies.filter(movie => !movieSubs.includes(movie._id));
        setMoviesList(filteredMovies);
        return filteredMovies;
      }
      movieOptions();
    }, [movieStoreData, subStoreData.subs, props.memberID, newSub, navigate])

    function handleNewSub() {
      utils.addSub(newSub).then(res => {
        let film = moviesList.find(movie => movie._id === newSub.movieID);
        dispatch({
          type: "ADDSUB",
          payload: { ...newSub, filmName: film.filmName, date: newSub.date, memberID : props.member}
        });
      }).catch(error => console.log(error));
    }
    
    
return (
  <div className="addSubDiv">
          <h4 className='addSub'>Add Subscription</h4>
          <select onChange={(e) => setNewSub({...newSub, movieID : e.target.value, memberID : props.memberID})}>
            <option value={null}>Choose Film...</option>
      {
        moviesList.map(movie => {
          return ( 
            <option key={movie._id} value={movie._id}>{movie.filmName} </option>
          )
        })
      }
      </select>
     <input className='addSub' onChange={e => setNewSub({...newSub, date : new Date(e.target.value).toLocaleDateString()}) }  type='date' time style={{fontSize : "12px", border : "none"}} />
      <Link to={"/"}> <button onClick={() => handleNewSub()} className='addSub'> ✓ </button> </Link>
    </div>
  );
}

export default AddSubscriptionsComponent;
