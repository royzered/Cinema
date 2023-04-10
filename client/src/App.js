import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import MoviesComponent from './Components/MoviesComponent/MoviesComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import MovieComponent from './Components/MovieComponent/MovieComponent';
import SubscriptionsComponent from './Components/SubscriptionsComponent/SubscriptionsComponent';

function App() {
  const navigate = useNavigate();

  const displayUsername = sessionStorage["username"]; 

  let getToken = sessionStorage["token"];
  const logout = () => {
    if(getToken) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      navigate("/");
    };
  };


  return (
    <div className="App">
      <header>
        <h1> 
         OnFilm
        </h1>
        <nav style={{color:"whitesmoke"}}>
        <Link to={"/"}>Movies</Link>&nbsp;
        <Link to={"subscriptions"}>Subscriptions</Link>
        </nav>
        <span className='username'>
           {displayUsername}
        </span>
        {getToken 
        &&
        <button onClick={logout} className='logoutButton'>Log Out</button> }
      </header>

      <Routes>
        <Route path={"/login"} element={<LoginComponent />}></Route>
        <Route path={"/"} element={<MoviesComponent  />}></Route>
        <Route path={"/subscriptions"} element={<SubscriptionsComponent  />}></Route>
        <Route path={"/movie/:id"} element={<MovieComponent  />}></Route>

      </Routes>

    </div>
  );
}

export default App;
