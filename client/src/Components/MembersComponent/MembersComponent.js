import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import SubscriptionsComponent from '../SubscriptionsComponent/SubscriptionsComponent';
import AddSubscriptionsComponent from '../AddSubscriptionComponent/AddSubscriptionComponent';

function MembersComponent() {
 


  const [members, setMembers] = useState([]);
  const [addSubSpan, setAddSubSpan] = useState({});
  
  const deleteMember = async (id) => {
    await utils.removeMember(id);
    let newMembersList = members.filter(member => member._id !== id);
      setMembers(newMembersList);    
  }



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
      <span>
      <Link to={"/members/add"} title="Add Member" style={{fontSize : "30px", position : 'absolute', width : "2%", top: "9.5%", right : "2%"}}> + </Link>

      </span>

                <ul>
                  {
                members.map((member, indx )=> {
                    return (
                      <li key={indx}>
                        <span>
                        <h2> <Link to={`/member/${member._id}`}> {member.name}</Link></h2>
                        <hr />
                        <section>
                        <b> City </b> {member.city} <br />
                        <b> Email </b> {member.email} <br />
                      <Link to={`/member/edit/${member._id}`}> <button>Edit </button> </Link>  &nbsp;
                        <button onClick={() => deleteMember(member._id)}>Delete </button>
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
                    )
                })
              }
              </ul>
    </div>
  );
}

export default MembersComponent;
