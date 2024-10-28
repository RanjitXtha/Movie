import Home from './pages/Homepage';
import Login from './pages/LoginPage';
import SignIn from './pages/SignIn';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
