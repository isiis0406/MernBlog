import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  // const [cookies, setCookies] = useCookies(["acces_token"]);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();


  const handleLogout = () => {
    // setCookies('acces_token', "");
    // window.localStorage.removeItem("userID");
    logout();
    navigate('/auth/login');

  }

  return (
     <>
      {user &&
        (
          <div>
            <span>{user.data.email}</span>
            <Link to="/auth/login" onClick={handleLogout}>Logout</Link>
          </div>
        )
      }
      {!user &&
        (
          <div>
            <NavLink to="/auth/register">Register</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
          </div>
        )
      }
    </>
  )
}

export default Navbar