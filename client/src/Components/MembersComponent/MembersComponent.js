import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionsComponent from '../SubscriptionsComponent/SubscriptionsComponent';

function MembersComponent() {
  const navigate = useNavigate();

  const token = sessionStorage["token"];

  const [members, setMembers] = useState([]);

  useEffect(() => {
     function checkToken(token) {
    if(!token) {
      navigate("/login");
    }
    }
    checkToken(token);
  }, [token] );
  
useEffect(() => {
    async function getMembers() {
      let membersData = await utils.getMembers();
      setMembers(membersData.data); 
    }
    getMembers();
  },[]);


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
                      <span className='addSub'>+</span>
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
