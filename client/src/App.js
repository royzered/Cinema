import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import MoviesComponent from './Components/MoviesComponent/MoviesComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import MovieComponent from './Components/MovieComponent/MovieComponent';
import MembersComponent from './Components/MembersComponent/MembersComponent';
import MemberComponent from './Components/MemberComponent/MemberComponent';
import AddMovieComponent from './Components/AddMovieComponent/AddMovieComponent';

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
         On<span className='theFisForFilm'>F</span>ilm
        </h1>
        <nav style={{color:"whitesmoke"}}>
        <Link to={"/"}>Movies</Link>&nbsp;
        <Link to={"members"}>Members</Link>
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
        <Route path={"/members"} element={<MembersComponent  />}></Route>
        <Route path={"/member/:id"} element={<MemberComponent  />}></Route>
        <Route path={"/movie/:id"} element={<MovieComponent  />}></Route>
        <Route path={"/movie/add"} element={<AddMovieComponent />}></Route>

      </Routes>

    </div>
  );
}

export default App;
