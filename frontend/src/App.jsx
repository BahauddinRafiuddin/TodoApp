import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Register from './components/register'
import Login from './components/login';
import Home from './components/Home';
import AddTodo from './components/AddTodo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element=<Register/> />
          <Route path="/login" element=<Login/> />
          <Route path="/addtodo" element=<AddTodo/> />
        </Routes>
      </Router>
    </>
  )
}

export default App
