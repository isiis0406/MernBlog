import { useState } from 'react';
import styled from 'styled-components';
import {useCookies} from 'react-cookie';
import { useLogin} from '../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login , error, isLoading } = useLogin();

  //Define cookie name
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies('acces_token');
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);
  
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
          <button disabled={isLoading} type='submit'>Login</button>
          {error && <Error>{error}</Error>}
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
const Error = styled.div`
    color: red;
    font-weight: 500;
    padding: 1rem;
`