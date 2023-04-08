import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import MoviesComponent from './Components/MoviesComponent/MoviesComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import MovieComponent from './Components/MovieComponent/MoviesComponent';

function App() {


  return (
    <div className="App">
      <header>
        <h1> 
         <Link to={"/"}>
         OnFilm
         </Link>
        </h1>
      </header>

      <Routes>
        <Route path={"/login"} element={<LoginComponent />}></Route>
        <Route path={"/"} element={<MoviesComponent  />}></Route>
        <Route path={"/:id"} element={<MovieComponent  />}></Route>

      </Routes>

    </div>
  );
}

export default App;
