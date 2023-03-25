import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
    <h2>MERN Auth</h2>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/auth/register' element={<Register/>}></Route>
      <Route path='/auth/login' element={<Login/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
