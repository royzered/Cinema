import '../../App.css';
import utils  from '../../API/utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SubscriptionsComponent() {
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

  async function getSubs() {
    let getSubs = await utils.getSubs();
    dispatch({type : "GETSUBSDATA", payload : getSubs.data})
  };
  
  getSubs();

  },[]);


  return (
    <div className="App">
      <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
      Members
      </h2>
                <ul>
                  {
                subStoreData.subs.map(sub => {
                    return (
                      <li key={sub._id}>
                        {sub.name} Watched {sub.filmName} @ {sub.date} 
                      </li>
                    )
                })
              }
              </ul>
    </div>
  );
}

export default SubscriptionsComponent;
