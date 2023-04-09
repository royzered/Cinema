import '../../App.css';
import utils  from '../../API/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MovieComponent() {

const token = sessionStorage["token"];
const navigate = useNavigate();

useEffect(() => {
  if(!token) {
    navigate("/login");
  }
},token );

useEffect(() => {

}, []);

  return (
    <div className="App">
    
     
    </div>
  );
}

export default MovieComponent;
