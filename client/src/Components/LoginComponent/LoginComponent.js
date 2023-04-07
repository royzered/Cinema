import '../../App.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginComponent() {

const navigate = useNavigate();

let [user, setUser] = useState({username : '', password : ''});

let [loginData, setloginData] = useState("");

const login = async () => {
  try {
    let trylogin = await axios.post("http://127.0.0.1:8000/login", user, { withCredentials : true });
    setloginData(trylogin.data); 
  } catch (error) {
    return error;
  }
}

  return (
    <div className="App">
     <div>

      <h2>
        Login
      </h2> <br />

      <span className='loginInputSpan'>
        
     Username  <input placeholder="Enter Username" type='text' onChange={(e) => setUser({...user, username : e.target.value})} /> <br/>
     Password <input placeholder="Enter Password" type="password" onChange={(e) => setUser({...user, password : e.target.value})}  /> <br />
    <button onClick={login}> Enter </button>
    {
     loginData && <span key={loginData.status}> {loginData.status} </span>
    }
      </span>
     </div>
     
    </div>
  );
}

export default LoginComponent;
