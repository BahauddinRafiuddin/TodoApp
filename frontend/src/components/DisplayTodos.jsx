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

    return (
        <>
            <div className="display-todos-container">
                <div className="display-todos">
                    <div className='todos-header-div'>
                        <h3>Your Todos</h3>
                        <button onClick={() => setShowCompleted(!showCompleted)}>
                            {showCompleted ? 'Show All Todos' : 'Show Completed Todos'}
                        </button>
                    </div>
                    <div className='todos-div'>
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
                                <div className="title">
                                    <img
                                        src={todo.isComplete ? circlefill : circle}
                                        alt=""
                                        onClick={() => changeTodoStatus(todo._id)}
                                    />
                                    {todo.title}
                                </div>
                                <div className="description">
                                    {todo.description}
                                </div>
                                <div className="action-btn">
                                    <button className='edit-btn'><img src={edit} alt="" />Edit</button>
                                    <button className='delete-btn'><img src={deleteimg} alt="" />Delete</button>
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