import '../../App.css';
import utils  from '../../API/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SubscriptionsComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const subStoreData = useSelector(state => state.subs);
  

  const [userSubs, setUserSubs] = useState([])


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
                  <h3>Subscriptions</h3> 
                  <hr />
                <ul>
                  {
                userSubs.map(sub => {
                    return (
                      <li key={sub._id}>
                        <span>
                        <section style={{padding : "3.5px"}}>
                        
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
