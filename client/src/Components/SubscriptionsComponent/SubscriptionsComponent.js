import '../../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';

function SubscriptionsComponent(props) {

  
  const subStoreData = useSelector(state => state.subs);
  
  const [userSubs, setUserSubs] = useState([]);

  useEffect(() => {
    let memberID = props.member._id;
    setUserSubs(subStoreData.subs.filter(sub => sub.memberID === memberID ));
  }, [subStoreData.subs, props.member]);
  
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
