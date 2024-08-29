import React, { useState, useRef } from 'react'
import './css/AddTodo.css'
import add from '../assets/add.svg'
import view from '../assets/view.svg'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {

    //Ref For Add Todo..
    const ref = useRef()

    const handleRef = () => {
        ref.current.focus()
    }

    const [message, setmessage] = useState('')

    // Navating To Display Todos Page...
    const navigate = useNavigate()

    const navigateViewTodo = () => {
        navigate('/viewtodo')
    }

    // State for form data
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    // State for form validation errors
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
        if (!formData.title) newErrors.title = 'Todo Title is required';
        if (!formData.description) newErrors.description = 'Todo Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            // Handle form submission (e.g., send data to an API)
            try {
                const response = await fetch('http://localhost:3000/api/todos/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                })

                if(!response.ok){
                    console.log('Cant Add Todo!!')
                }

                const result=await response.json()
                console.log("Todo: ",result)
                alert(result.message)
                setmessage(result.message)
                setFormData({
                    title: '',
                    description: ''
                });
            } catch (error) {
                console.log(error)
            }
        }
    };


    return (
        <>
            <div className="add-todos-container">
                <div className="add-todos-form">
                    <form onSubmit={handleSubmit} className='todos-form'>
                        <div className="heading">
                            <img src={add} onClick={handleRef} />
                            <h2>Add Your Todos </h2>
                        </div>

                        <div className='add-todos-group'>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter the title"
                                ref={ref}
                            />
                        </div>
                        {errors.title && <p className="add-todos-error">{errors.title}</p>}
                        <div className='add-todos-group-textarea'>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter the description"
                                draggable="false"
                            />
                        </div>
                        {errors.description && <p className="add-todos-error">{errors.description}</p>}
                        <button className='add-todos-submit' type="submit">Submit</button>
                        <p className='form-p'>{message}</p>
                        <div className="view-todo" onClick={navigateViewTodo}>
                            <img src={view} alt="View Todos" />
                            <h4>View My Todos</h4>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTodo