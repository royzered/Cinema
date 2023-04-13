import '../../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import utils from '../../API/utils';

function EditMemberComponent() {
const navigate = useNavigate();

const id = useParams().id;

useEffect(() => {
  async function getMember() {
    let update = await utils.getMember(id);
    setUpdateMember(update.data);
    };
    getMember();
}, [])

const [updateMember, setUpdateMember] = useState({});
const [error, setError] = useState("");


async function update(id, updateMember) {
  let updateData = await utils.updateMember(id, updateMember);
  if(updateData.data) {
    navigate("/members");
  }
  else {
    setError(update);
  }
}

  return (
    <div className="App">
       <h2 style={{background : "lime", color : 'black', fontSize: "32px"}}>
          Edit Member 
      </h2>

      <br/>

      <section>

     Name <input onChange={e => setUpdateMember({...updateMember, name : e.target.value})} type='text' defaultValue={updateMember.name} /> <br /> <br />
      Email <input onChange={e => setUpdateMember({...updateMember, email : e.target.value})} type='text' defaultValue={updateMember.email} /> <br /> <br />
     City <input onChange={e => setUpdateMember({...updateMember, city : e.target.value})} type='text' defaultValue={updateMember.city} /> <br /> <br />

      </section>
      <button onClick={() => update(id, updateMember)}>Update {updateMember.name}</button> &nbsp;
       <Link to={"/members"} className='goBack'> <button>Cancel</button> </Link>
       <br />
      {
        error.length > 0 && <span style={{fontWeight : "800"}}> {error} </span>
    }
    </div>
  );
}

export default EditMemberComponent;
