import '../../App.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import utils from '../../API/utils';

function AddMemberComponent() {
const navigate = useNavigate();

const [newMember, setNewMember] = useState();
const [error, setError] = useState("");


async function addMember(newMember) {
  let add = await utils.addMember(newMember);
  if(add.data) {
    navigate("/members");
  }
  else {
    setError(add);
  }
}

  return (
    <div className="App">
       <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
          Add Member 
      </h2>

      <br/>

      <section>
     Name <input onChange={e => setNewMember({...newMember, name : e.target.value})} type='text' placeholder='Neo' /> <br /> <br />
      Email <input onChange={e => setNewMember({...newMember, email : e.target.value})} type='text' placeholder='mail@example.com' /> <br /> <br />
     City <input onChange={e => setNewMember({...newMember, city : e.target.value})} type='text' placeholder='New York' /> <br /> <br />
  
      </section>
      <button onClick={() => addMember(newMember)}>Add Member</button> &nbsp;
       <Link to={"/members"} className='goBack'> <button>Cancel</button> </Link>
       <br />
      {
        error.length > 0 && <span style={{fontWeight : "800"}}> {error} </span>
      }
    </div>
  );
}

export default AddMemberComponent;
