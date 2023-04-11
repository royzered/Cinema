import '../../App.css';
import utils  from '../../API/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AddSubscriptionsComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const token = sessionStorage["token"];


useEffect(() => {
   function checkToken(token) {
  if(!token) {
    navigate("/login");
  }
  }
  checkToken(token);
}, [token] );


useEffect(() => {


  },[]);


  return (
    <div className="App">
          <h4>Add Subscription</h4>
    </div>
  );
}

export default AddSubscriptionsComponent;
