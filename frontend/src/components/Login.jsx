import React, { useState, useRef } from 'react'
import './css/Login.css'
import email from '../assets/email.svg'
import password from '../assets/password.svg'
import openeye from '../assets/openeye.svg'
import closeeye from '../assets/closeeye.svg'
import { NavLink, useNavigate } from 'react-router-dom'


const Login = ({ onLogin }) => {

    const navigate = useNavigate()

    //State For Display Password
    const passRef = useRef()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }


    // State for form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // State for form validation
    const [errors, setErrors] = useState({});

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);

            // Handle login (Login Logic................................................................)
            try {
                const response = await fetch('http://localhost:3000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },  
                    body: JSON.stringify(formData),
                    credentials: 'include'
                })

                if (!response.ok) {
                    console.log("Login Faild!!")
                }
                // If Login Succes Do Following................
                const result = await response.json()
                console.log(result)
                console.log("Data",result.data.user)
                onLogin()
                alert(result.message)
                navigate('/userprofile',{state:{user:result.data.user}})
                setFormData({
                    email: '',
                    password: ''
                });
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <>
            <div className="login-form-container">
                <div className="login-form">
                    <form onSubmit={handleSubmit} className="form">
                        <h1>Login</h1>
                        <div className="form-group">
                            {/* <label>Email:</label> */}
                            <img src={email} alt="" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                                autoFocus
                            />
                        </div>
                        {errors.email && <p className="login-error">{errors.email}</p>}
                        <div className="form-group">
                            {/* <label>Password:</label> */}
                            <img src={password} alt="" />
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Your Password"
                            />
                            <img ref={passRef} className='showPass' src={isPasswordVisible ? closeeye : openeye} alt="" onClick={handleShowPassword} />
                        </div>
                        {errors.password && <p className="login-error">{errors.password}</p>}
                        <button className="login-submit" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
