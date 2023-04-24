import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
    <h2>MERN Auth</h2>
    <Navbar/>
    <Routes>
      <Route path='/' element={user ? <Home/> : <Navigate to="/auth/login"/>}></Route>
      <Route path='/auth/register' element={<Register/>}></Route>
      <Route path='/auth/login' element={<Login/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
