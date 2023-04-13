import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import SubscriptionsComponent from '../SubscriptionsComponent/SubscriptionsComponent';
import { useDispatch } from 'react-redux';

function MemberComponent() {


  let id = useParams().id;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member, setMember] = useState([]);


useEffect(() => {
    async function getMember() {
      let membersData = await utils.getMembers();
      setMember(membersData.data.find(member => member._id === id)); 
    }
    
    getMember();
  },[id, dispatch, navigate]);

  const deleteMember = async (id) => {
    await utils.removeMember(id);
    navigate("/members")
  };



  return (
    <div className="App">
      <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
      {member.name}
      </h2>
                <ul>
                  {          
                      <li key={member._id}>
                        <span>
                        <section>
                        <b> City </b> {member.city} <br />
                        <b> Email </b> {member.email} <br />
                        <button>Edit </button> &nbsp;
                        <button onClick={() => deleteMember(id)}> Delete </button>
                        <br /> <br />
                        </section> 
                        <SubscriptionsComponent member={member} /> 
                    
                        </span>  <br /> <br />
                      </li>
                    
      
              }
              </ul>
    </div>
  );
}

export default MemberComponent;
