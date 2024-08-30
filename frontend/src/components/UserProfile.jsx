import React, { useState } from 'react'
import './css/UserProfile.css'
import edit from '../assets/edit.svg'
import email from '../assets/email.svg'
import username from '../assets/username.svg'
import userimg from '../assets/user.svg'
import down from '../assets/down.svg'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation()
    const user = location.state?.user
    // console.log("User : ", user)
    // State to manage the visibility of input fields
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);

    // Handlers to toggle the visibility
    const toggleUsernameInput = () => setShowUsernameInput(!showUsernameInput);
    const toggleEmailInput = () => setShowEmailInput(!showEmailInput);
    const toggleEditProfile = () => {
        setShowEditProfile(!showEditProfile)

    }

    // State for form data
    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email
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
        if (!formData.username) newErrors.username = 'UserName is required';
        setErrors(newErrors);
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);

            try {
                const response = await fetch('http://localhost:3000/api/users/updateUserDetails', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include'
                })

                if (!response.ok) {
                    console.log("Can't Update User Details!!")
                }

                const result = await response.json()
                console.log(result)
                alert(result.message)
                setFormData({
                    username: '',
                    email: ''
                });
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className='userprofile-container'>

                <div className="user-profile">
                    {showEditProfile && (
                        <div className="edit-profile ">
                            <div className="edit-form">
                                <div className="edit-header">
                                    <img src={edit} alt="edit" />
                                    <h3>Edit Profile</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="form">
                                    <div className="edit-input">
                                        <img src={username} alt="" />
                                        <input type="text"
                                            id='username'
                                            name='username'
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder='Enter UserName'
                                            autoComplete='off'
                                        />
                                    </div>
                                    {errors.username && <p className="login-error">{errors.username}</p>}
                                    <div className='edit-input'>
                                        <img src={email} alt="" />
                                        <input type="email"
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='Enter Email'
                                            autoComplete='off'
                                        />
                                    </div>
                                    {errors.email && <p className="login-error">{errors.email}</p>}
                                    <button className="edit-submit" type="submit">Save</button>
                                </form>
                                <button className="toggle-edit-pro" type="" onClick={toggleEditProfile}>Show Profile</button>

                            </div>
                        </div>
                    )}

                    {!showEditProfile && (
                        <div className="display-profile">
                            <div className='display-profile-div'>
                                <div className="display-profile-header">
                                    <img src={userimg} alt="" />
                                    <h3>Your Profile</h3>
                                </div>
                                <div className="user-details">
                                    <div className='user-username'>
                                        <h5>Username </h5> <img src={down} alt="" onClick={toggleUsernameInput} />
                                    </div>
                                    {showUsernameInput && (
                                        <input type="text" readOnly value={user.username} />
                                    )}

                                    <div className='user-email'>
                                        <h5>Email</h5> <img src={down} alt="" onClick={toggleEmailInput} />
                                    </div>
                                    {showEmailInput && (
                                        <input type="text" readOnly value={user.email} />
                                    )}

                                    <button className='Edit-profile' onClick={toggleEditProfile}>Edit Profile</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </>
    )
}

export default UserProfile