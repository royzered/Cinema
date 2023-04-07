import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import FilmComponent from './Components/MovieComponent/FilmComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';

function App() {


  return (
    <div className="App">
      <header>
        <h1> 
          OnFilm
        </h1>
      </header>

      <Routes>
        <Route path={"/login"} element={<LoginComponent />}></Route>
        <Route path={"/"} element={<FilmComponent  />}></Route>
      </Routes>

    </div>
  );
}

export default App;
