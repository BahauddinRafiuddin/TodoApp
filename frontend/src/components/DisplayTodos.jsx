import React from 'react'
import './css/DisplayTodo.css'
import { useEffect, useState } from 'react'
import circle from '../assets/circle.svg'
import circlefill from '../assets/circlefill.svg'
import edit from '../assets/edit.svg'
import deleteimg from '../assets/delete.svg'

const DisplayTodos = () => {
    const [todos, setTodos] = useState([]); // State to store todos
    const [showCompleted, setShowCompleted] = useState(false); // State to track filter
    const [message, setmessage] = useState('')

    // ...............fetching User Todos............
    useEffect(() => {
        const fetchUserTodos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/todos/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })

                if (!response.ok) {
                    console.log("Cant Fetch Todos!")
                }

                const result = await response.json()
                // console.log('All Todos: ',result)
                setTodos(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserTodos()
    }, [])

    // console.log(todos)

    // State for form updateTodoData
    const [updateTodoData, setUpdateTodoData] = useState({
        id: '',
        title: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateTodoData({
            ...updateTodoData,
            [name]: value
        });
        // Clear error message when user starts typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    //....................... Handle Todo Updation........................................................
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("ID: ", updateTodoData.id)
        const newErrors = {};

        // Trim whitespace from input values
        const title = updateTodoData.title.trim();
        const description = updateTodoData.description.trim();

        // Validation
        if (title === '') {
            newErrors.title = 'Title is required *';
        }
        if (description === '') {
            newErrors.description = 'Description is required *';
        }

        // If there are errors, set errors and return early
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle successful form submission
        console.log('Todo submitted:', updateTodoData);
        // Prepare the data to be sent (excluding `id`)
        const updatedData = {
            title,
            description
        };
        // ..................Logic Of Updating Todo...................
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${updateTodoData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
                credentials: 'include'
            })

            if (!response.ok) {
                console.log("Can't Update Todo Details!!")
            }

            const result = await response.json()
            alert(result.message)
            setmessage(result.message)
            // Hide the message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setmessage('');
            }, 1000);
            // console.log(result)
            // Update the todos state with the updated todo
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === result.data._id ? result.data : todo
                )
            );

            setUpdateTodoData({
                id: '',
                title: '',
                description: '',
            })
        } catch (error) {
            console.log(error)
        }
    };


    // .....................Chnage Todo Status.........................................
    const changeTodoStatus = async (id) => {
        console.log("Todo ID: ", id)
        const todoId = id
        try {
            const response = await fetch(`http://localhost:3000/api/todos/toggle/${todoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!response.ok) {
                console.log("Can't Update Status!!")
            }

            const result = await response.json()
            // console.log(result)

            // Update the todo item in the state
            setTodos(todos.map(todo =>
                todo._id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            ));

        } catch (error) {
            console.log(error)
        }
    }

    // Filter todos based on the showCompleted state
    const filteredTodos = showCompleted
        ? todos.filter(todo => todo.isComplete)
        : todos;

    // .................Delete Todo............................................
    const handleDelete = async (id) => {
        // Ask user for confirmation
        const isConfirmed = window.confirm("Are you sure you want to delete this todo?");

        if (!isConfirmed) {
            // If the user cancels, exit the function
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                console.log("Can't Delete Todos")
            }

            const result = await response.json()
            alert(result.message)
            console.log(result)

            // Update the todos state by filtering out the deleted todo
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (id, title, description) => {
        setUpdateTodoData({
            id: id,
            title: title,
            description: description,
        })
        console.log(updateTodoData)
    }


    return (
        <>
            <div className="display-todos-container">
                <div className="display-todos">
                    <div className='todos-header-div'>
                        <h3>- Update Your Todos -</h3>
                        <form onSubmit={handleSubmit} className='update-todo-form'>
                            <div className='update-todo-input'>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder='Enter Todo Title'
                                    value={updateTodoData.title}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            {errors.title && <p>{errors.title}</p>}

                            <div className='update-todo-textarea'>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder='Enter Todo Description'
                                    value={updateTodoData.description}
                                    onChange={handleChange}
                                    rows="4"
                                // required
                                ></textarea>
                            </div>
                            {errors.description && <p>{errors.description}</p>}

                            <button type="submit" className='update-todo-btn' >Save</button>
                            <p className='success-message'>{message}</p>
                        </form>
                    </div>
                    <div className='todos-div'>
                        <button onClick={() => setShowCompleted(!showCompleted)} className={showCompleted ? 'filterTodo-btn-grey' : 'filterTodo-btn'}>
                            {showCompleted ? 'Show All Todos' : 'Show Completed Todos'}
                        </button>
                        {/* {todos.map((todo, index) => (
                            <div key={index} className="todo-item">
                                <div className="title">
                                    <img src={todo.isComplete ? circlefill : circle} alt="" onClick={() => changeTodoStatus(todo._id)} />
                                    {todo.title}
                                </div>
                                <div className="description">
                                    {todo.description}
                                </div>
                                <div className="action-btn">
                                    <button>Edit</button><button>Delete</button>
                                </div>
                            </div>
                        ))} */}
                        {filteredTodos.map((todo, index) => (
                            <div key={index} className="todo-item">
                                <div className={todo.isComplete ? "green-title" : 'title'}>
                                    <img
                                        src={todo.isComplete ? circlefill : circle}
                                        alt=""
                                        onClick={() => changeTodoStatus(todo._id)}
                                    />
                                    {todo.title}
                                </div>
                                <div className={todo.isComplete ? "green-description" : 'description'}>
                                    {todo.description}
                                </div>
                                <div className="action-btn">
                                    <button className='edit-btn' onClick={() => handleEdit(todo._id, todo.title, todo.description)}>
                                        <img src={edit} alt="" />Edit
                                    </button>
                                    <button className='delete-btn' onClick={() => handleDelete(todo._id)}>
                                        <img src={deleteimg} alt="" />Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayTodos