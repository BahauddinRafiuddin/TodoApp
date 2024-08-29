import React from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './css/Register.css'
import email from '../assets/email.svg'
import password from '../assets/password.svg'
import username from '../assets/username.svg'
import openeye from '../assets/openeye.svg'
import closeeye from '../assets/closeeye.svg'

const Register = ({ onRegister }) => {

    const navigate = useNavigate(); // Initialize useNavigate

    //State For Display Password
    const passRef = useRef()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNavigateLogin=() => {
      onRegister()
      navigate('/login')
    }
    

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            // Handle form submission (e.g., send data to an API)

            try {
                const response = await fetch('http://localhost:3000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    throw new Error('Network Response Was Not Ok!')
                }

                const result = await response.json()
                console.log(result)

                onRegister()
                alert("Registration Successfull")

                setFormData({
                    username: '',
                    email: '',
                    password: '',
                })
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }

        }
    };

    return (
        <>
            <div className="form-container">
                <div className="register-form">
                    <form onSubmit={handleSubmit} className="form">
                        <h1>Registration</h1>
                        <div className="form-group">
                            {/* <label htmlFor="username">Username</label> */}
                            <img src={username} alt="" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder='Username'
                                autoFocus
                                autoComplete='off'
                            />
                        </div>
                        {errors.username && <p className="register-error">{errors.username}</p>}


                        <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <img src={email} alt="" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                autoComplete='off'
                            />
                        </div>
                        {errors.email && <p className="register-error">{errors.email}</p>}

                        <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <img src={password} alt="" />
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                autoComplete='off'
                            />
                            <img ref={passRef} className='showPass' src={isPasswordVisible ? closeeye : openeye} alt="" onClick={handleShowPassword} />
                        </div>
                        {errors.password && <p className="register-error">{errors.password}</p>}

                        <button className="register-submit" type="submit">Submit</button>
                    </form>
                    <button
                        className="login-redirect"
                        onClick={handleNavigateLogin}
                    >
                        Already Registered? <span>Go To Login</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Register
