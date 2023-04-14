import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import {  Link, useNavigate, useParams } from 'react-router-dom';
import SubscriptionsComponent from '../SubscriptionsComponent/SubscriptionsComponent';
import { useDispatch } from 'react-redux';
import AddSubscriptionsComponent from '../AddSubscriptionComponent/AddSubscriptionComponent';

function MemberComponent() {


  let id = useParams().id;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const [addSubSpan, setAddSubSpan] = useState(false);

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
                        <Link to={`/member/edit/${member._id}`}> <button>Edit </button> </Link> &nbsp;
                        <button onClick={() => deleteMember(id)}> Delete </button>
                        <br /> <br />
                        </section> 
                        <SubscriptionsComponent member={member} /> 
                        <span className='plus' key={member._id} onClick={() => setAddSubSpan({...addSubSpan, [member._id] : !addSubSpan[member._id]})}>
                        +
                        </span>
                        {
                          addSubSpan[member._id] && 
                          <AddSubscriptionsComponent  memberID={member} /> 

                        }
                    
                        </span>  <br /> <br />
                      </li>
                    
      
              }
              </ul>
    </div>
  );
}

export default MemberComponent;
