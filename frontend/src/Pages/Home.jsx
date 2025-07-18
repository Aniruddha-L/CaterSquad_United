import React, { useEffect } from 'react';
import '../../Assets/css/home.css'
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'

const Home = () => {
  let navigate = useNavigate()
  // Optional: apply body styling via class
  useEffect(() => {
    document.body.className = 'home-body';
    return () => {
      document.body.className = '';
    };
  }, []);

  const loginBtn = () =>{
    navigate('/User/Login')
  }
  const regBtn = () =>{
    navigate('/User/Register')
  }
  const signout = () =>{
      Cookies.remove('user')
  }
  return (
    <div className="home-container">
      {/* Left Partition */}
      <div className="home-partition partition-left">
        <button onClick={loginBtn} className="auth-button">Login</button>
        <button onClick={regBtn} className="auth-button">Sign Up</button>
        <button onClick={signout} className='auth-button'>Signout</button>
      </div>

      {/* Right Partition */}
      <div className="home-partition partition-right">
        <div className="partition-heading">About Cat Digital</div>
        <div className="partition-description">
          Cat Digital is the digital branch of Caterpillar Inc., leading innovation in equipment technology.
          <br /><br />
          It connects heavy machinery through telematics and IoT for smarter operations.
          <br /><br />
          With AI and data analytics, Cat Digital powers real-time performance insights.
          <br /><br />
          The platform supports predictive maintenance and remote diagnostics.
          <br /><br />
          Cat Digital enables customers to reduce downtime and maximize productivity.
          <br /><br />
          Its tools offer scalable cloud solutions for global users.
          <br /><br />
          Digital transformation drives smarter construction and mining.
          <br /><br />
          Users can monitor fleets remotely with intuitive dashboards.
          <br /><br />
          Cat Digital is committed to reliability, safety, and efficiency.
          <br /><br />
          It's shaping the future of connected machinery.
        </div>
      </div>
    </div>
  );
};

export default Home;
