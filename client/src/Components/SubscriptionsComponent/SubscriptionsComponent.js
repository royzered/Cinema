import '../../App.css';
import utils  from '../../API/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SubscriptionsComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const subStoreData = useSelector(state => state.subs);
  
  const token = sessionStorage["token"];

  const [userSubs, setUserSubs] = useState([])

useEffect(() => {
   function checkToken(token) {
  if(!token) {
    navigate("/login");
  }
  }
  checkToken(token);
}, [token, navigate] );


useEffect(() => {

  async function getSubs() {
    let getSubs = await utils.getSubs();
    dispatch({type : "GETSUBSDATA", payload : getSubs.data})
  };
  
  getSubs();
  setUserSubs(subStoreData.subs.filter(sub => sub.name === props.member));
 
  },[subStoreData, props.member, navigate, dispatch]);


  return (
    <div className="App">
                  <h4>Movie Subscriptions</h4> 
                <ul>
                  {
                userSubs.map(sub => {
                    return (
                      <li key={sub._id}>
                        <span>
                        <br />
                        <section>
                          
                         
                         <Link to={`/movie/${sub.movieID}`} style={{fontWeight : "bold"}}> {sub.filmName} </Link>  | {sub.date} 
                        
                        </section>
                        </span> 
                      </li>
                    )
                })
              }
              </ul>
    </div>
  );
}

export default SubscriptionsComponent;
