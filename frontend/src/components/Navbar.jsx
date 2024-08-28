import React from 'react'
import './css/Navbar.css'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()

  // Handle navigation to /home
  const handleHomeClick = () => {
    navigate('/');
  };

  // Handle  Navigate to the /register 
  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  // Handle navigation to /login
  const handleLoginClick =() => {
    navigate('/login');
  }
  
  return (
    <>
      <div className="container">
        <div className="nav">
          <img src={logo} alt="logo" title='Todo App' />
          <li onClick={handleHomeClick}>Home</li>
          <li>About</li>
          <li>Conatct</li>
        </div>

        <div className="btn">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>LogIn</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
