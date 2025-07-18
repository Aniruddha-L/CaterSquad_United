import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Assets/css/login.css';
import Cookies from "js-cookie"

const Login = ({setUser}) => {
  document.title = 'C4U - Login';

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState()
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const loginUser = {
        "user":username,
        "passwd":password
      }

      const resp = await axios.post('http://localhost:5555/user/login', loginUser)
      if (resp.status === 200){
        setMsg("Success")
        navigate('/dashboard')
        setUser(username)
        new Cookies.set('user', username)
        return
      }
      else{
        setMsg(resp.data.msg)
      }
    } catch (error) {
      setMsg("Error in logging in please wait")
    }
  }

  
  return (
    <div className='container-user'>
      <div className='user'>
        <input
          type="text"
          className="name"
          placeholder="Enter username or email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div><br />

      <div className='passwd password-wrapper'>
        <input
          type={showPassword ? 'text' : 'password'}
          className="passwd"
          placeholder="Enter the password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span className="toggle-icon" onClick={togglePasswordVisibility}>
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div><br />

      <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div><br />
      <button type="submit" onClick={() => navigate('/User/Register')}>Register</button>
    </div>
  );
};

export default Login;
