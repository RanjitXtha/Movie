import Home from './pages/Homepage';
import Login from './pages/LoginPage';
import SignIn from './pages/SignIn';
import Moviepage from './pages/Moviepage';
import Movies from './pages/movies';
import Tvshows from './pages/Tvshows';
import TvPage from './pages/TvPage';
import SearchPage from './pages/SearchPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeRoute from './ProtectedRoutes/HomeRoute';
import History from './pages/History'
function App() {
  return (
    <div>
      <Router> 
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<HomeRoute><Login /></HomeRoute>} />
          <Route path='/signup' element={<HomeRoute><SignIn /></HomeRoute>} />
    
          <Route path='/api/movies/:category' element={<Movies />} />
          <Route path='/api/movies/movie/:id' element={<Moviepage />} />

          <Route path='/api/tvshows/:category' element={<Tvshows />} />
          <Route path='/api/tvshows/tv/:tvId' element={<TvPage />} />
          <Route path='/api/search' element={<SearchPage />} />
          <Route path='/api/:userId/history' element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
