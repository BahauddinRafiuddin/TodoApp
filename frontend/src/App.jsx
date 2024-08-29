import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Register from './components/register'
import Login from './components/Login';
import Home from './components/Home';
import AddTodo from './components/AddTodo';
import DisplayTodos from './components/DisplayTodos';
import UserProfile from './components/UserProfile';

function App() {

  // State to manage user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  })
    
  // State to manage registration status
  const [isRegistered, setIsRegistered] = useState(()=>{
    return localStorage.getItem('isRegistered') === 'true';
  });

  // Function to handle registration
  const handleRegister = () => {
    setIsRegistered(true);
    localStorage.setItem('isRegistered','true')
  };

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated','true')
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={!isRegistered ? <Register onRegister={handleRegister} /> : <Navigate to="/login" />} />
          <Route path="/login" element={isRegistered ? <Login onLogin={handleLogin} /> : <Navigate to="/register" />} />
          {/* <Route path="/addtodo" element={isAuthenticated ? <AddTodo /> : <Navigate to="/login" />} /> */}
          <Route path="/viewtodo" element={isAuthenticated ? <DisplayTodos /> : <Navigate to="/login" />} />
          <Route path="/userprofile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path='/addtodo' element={<AddTodo/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
