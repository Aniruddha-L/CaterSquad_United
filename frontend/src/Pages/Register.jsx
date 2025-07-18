import React, { useState } from 'react';
import '../../Assets/css/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ setUser }) {
  document.title = 'C4U - Registration';

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [user, setuser] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwd.length < 8) {
      document.getElementById('passwd').style = 'border: 2px solid red';
      return;
    }

    if (passwd !== repass) {
      document.getElementById('passwd').style = 'border: 2px solid red';
      document.getElementById('repasswd').style = 'border: 2px solid red';
      return;
    }

    const newUser = {
      name,
      username: user,
      email,
      password: passwd,
      phone,
    };

    try {
      let resp = await axios.post('http://localhost:5555/user/register', newUser);

      if (resp.status === 200) {
        setMsg('Success');
        setUser(user);
        navigate('/dashboard');
      } else {
        setMsg(resp.data.msg);
        return;
      }
    } catch (error) {
      setMsg('Error in registering, please wait');
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="user">Username</label>
        <input
          type="text"
          placeholder="Enter Unique Username"
          onChange={(e) => setuser(e.target.value)}
          name="user"
          id="user"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>

      <div className="form-group password-group">
        <label htmlFor="passwd">Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            onChange={(e) => setPass(e.target.value)}
            name="passwd"
            id="passwd"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="form-group password-group">
        <label htmlFor="repasswd">Confirm Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-Enter password"
            onChange={(e) => setRepass(e.target.value)}
            name="repasswd"
            id="repasswd"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          id="phone"
        />
      </div>

      <div className="form-group">
        <button className="submit" onClick={handleSubmit} type="submit">
          Submit
        </button>
        {msg && <p style={{ color: 'red' }}>{msg}</p>}
      </div>
    </div>
  );
}

export default Register;
