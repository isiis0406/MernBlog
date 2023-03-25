import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [cookies, setCookies] = useCookies(["acces_token"]);
  const navigate = useNavigate();

  const logout = () =>{
    setCookies('acces_token', "");
    window.localStorage.removeItem("userID");
    navigate('/auth/login');

  }

  return (
    <div>
      {!cookies.acces_token ? ( <><NavLink to="/auth/register">Register</NavLink><NavLink to="/auth/login">Login</NavLink></>) : <Link to="/auth/login"onClick={logout}>Logout</Link>}
    

          
   
        
    </div>
  )
}

export default Navbar