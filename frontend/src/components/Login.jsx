import React, { useState, useRef } from 'react'
import './css/Login.css'
import email from '../assets/email.svg'
import password from '../assets/password.svg'
import openeye from '../assets/openeye.svg'
import closeeye from '../assets/closeeye.svg'


const Login = () => {

    //State For Display Password
    const passRef = useRef()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleShowPassword=() => {
      setIsPasswordVisible(!isPasswordVisible)
      if(isPasswordVisible===true){
        passRef.current.src=closeeye
      }
      else{
        passRef.current.src=openeye
      }
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            // Handle login (e.g., send data to an API)
            // Reset the form data (optional)
            setFormData({
                email: '',
                password: ''
            });
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
                                type={isPasswordVisible?"text":"password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Your Password"
                            />
                            <img ref={passRef} className='showPass' src={openeye} alt="" onClick={handleShowPassword}/>
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
