import React, { useState } from 'react'
import './css/Navbar.css'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {


  const navigate = useNavigate()

  const [activeLink, setActiveLink] = useState('home');

  // Handle navigation to /home
  const handleHomeClick = () => {
    navigate('/');
    setActiveLink('home')
  };

  // Handle navigation to /addtodo
  const handleAddTodoClick = () => {
    navigate('/addtodo')
    setActiveLink('addTodo')
  }
  // Handle navigation to /viewtodo
  const handleViewTodoClick = () => {
    navigate('/viewtodo')
    setActiveLink('viewTodo')
  }

  // Handle  Navigate to the /register 
  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Handle navigation to /login
  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const data = await response.json();

      // Log the successful response (for debugging purposes)
      console.log('Logout successful', data);
      onLogout()
      navigate('/login');
      alert(data.message)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="container">
        <div className="nav">
          <img src={logo} alt="logo" title='Todo App' />
          <li onClick={handleHomeClick} className={activeLink === 'home' ? 'active' : ''}>Home</li>
          <li onClick={handleAddTodoClick} className={activeLink === 'addTodo' ? 'active' : ''} >Add Todos</li>
          <li onClick={handleViewTodoClick} className={activeLink === 'viewTodo' ? 'active' : ''} >View Todos</li>
        </div>

        <div className="btn">
          {isAuthenticated ? (
            <button onClick={handleLogoutClick}>Logout</button>
          ) : (
            <>
              <button onClick={handleRegisterClick}>Register</button>
              <button onClick={handleLoginClick}>Login</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
