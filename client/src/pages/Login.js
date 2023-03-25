import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Define cookie name
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies('acces_token');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try { 
            const URL = `${process.env.REACT_APP_API_ROUTE}/auth/login`;
            const response = await axios.post(URL,{email,password});
            setCookies('acces_token', response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate('/');
                  
      } catch (error) {
          alert(error.response.data.message)
      }
  }
return (
  <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder='Username'
          required
          value={email}
          onChange ={ (e) => setEmail(e.target.value)}  

          />
          <input 
          type="password" 
          required
          placeholder='Password'
          value={password}
          onChange ={ (e) => setPassword(e.target.value)}  
          />
          <button type='submit'>Login</button>
      </Form>
  </div>
)
}

export default Login

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  input {
      display: block;
      width: 40%;
      padding: 1rem;
      margin-bottom: 1rem;
      outline: none;
      border-radius: 0.4rem;        
      font-size: 1rem;
  }
  button{
      padding: 0.4rem 1rem;
      width: 20%;
      background-color: rgb(122,122,122);
      border: none;
      outline: none;
      border-radius: 0.6rem;
      color: white;
      cursor: pointer;
      transition: all ease-in 0.2s;

  }
  button:hover{
      background-color: black;

  }
`
