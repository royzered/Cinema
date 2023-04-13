import '../../App.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import utils from '../../API/utils';

function AddSubscriptionsComponent(props) {
  

  const movieStoreData = useSelector(state => state.movies);
  const subStoreData = useSelector(state => state.subs);
  const [moviesList, setMoviesList] = useState([]);
  const [subsList, setSubsList] = useState([]);
  let today = new Date().toLocaleDateString()

  const [newSub, setNewSub] = useState({memberID : props.memberID, 
                                        movieID : "", 
                                        date : today})


useEffect(() => {
  setSubsList(subStoreData.subs);
  function movieOptions() {
    const movies = movieStoreData.movies;
    const subs = subsList.filter(sub => sub.memberID === props.memberID);
    const movieIDSubs = subs.map(sub => sub.movieID);
    const filteredMovies = movies.filter(movie => !movieIDSubs.includes(movie._id));
    setMoviesList(filteredMovies);
    return filteredMovies;
  }
  movieOptions();
}, [movieStoreData, subsList, subStoreData.subs, props.memberID, newSub ])


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
       <button onClick={() => {utils.addSub(newSub)}} className='addSub'> ✓ </button>
    </div>
  );
}

export default AddSubscriptionsComponent;
