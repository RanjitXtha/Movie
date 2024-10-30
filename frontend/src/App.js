import Home from './pages/Homepage';
import Login from './pages/LoginPage';
import SignIn from './pages/SignIn';
import Moviepage from './pages/Moviepage';
import Movies from './pages/movies';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeRoute from './ProtectedRoutes/HomeRoute';
function App() {
  return (
    <div>
      <Router> 
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<HomeRoute><Login /></HomeRoute>} />
          <Route path='/signup' element={<HomeRoute><SignIn /></HomeRoute>} />
          <Route path='/api/movies' element={<Movies />} />
          <Route path='/api/movies/movie/:id' element={<Moviepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
