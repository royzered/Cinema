import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import SubscriptionsComponent from '../SubscriptionsComponent/SubscriptionsComponent';
import AddSubscriptionsComponent from '../AddSubscriptionComponent/AddSubscriptionComponent';

function MembersComponent() {
  const navigate = useNavigate();

  const token = sessionStorage["token"];

  const [members, setMembers] = useState([]);
  const [addSubSpan, setAddSubSpan] = useState({});

  useEffect(() => {
     function checkToken(token) {
    if(!token) {
      navigate("/login");
    }
    }
    checkToken(token);
  }, [token, navigate] );
  
useEffect(() => {
    async function getMembers() {
      let membersData = await utils.getMembers();
      setMembers(membersData.data); 
    }
    getMembers();
  },[members]);


  return (
    <div className="App">
      <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
      Members
      </h2>
                <ul>
                  {
                members.map(member => {
                    return (
                      <li key={member._id}>
                        <span>
                        <h2> {member.name}</h2>
                        <hr />
                        <section>
                        <b> City </b> {member.city} <br />
                        <b> Email </b> {member.email} <br />
                        <button>Edit </button> &nbsp;
                        <button>Delete </button>
                        </section> 
                        <SubscriptionsComponent member={member.name} /> 
                      <span className='plus' key={member._id} onClick={() => setAddSubSpan({...addSubSpan, [member._id] : !addSubSpan[member._id]})}>
                        +
                        </span>
                        {
                          addSubSpan[member._id] && 
                          <AddSubscriptionsComponent  memberID={member._id} /> 

                        }
                        </span>  <br /> <br />
                      </li>
                    )
                })
              }
              </ul>
    </div>
  );
}

export default MembersComponent;
