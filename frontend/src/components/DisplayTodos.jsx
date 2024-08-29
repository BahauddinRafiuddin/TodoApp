import React from 'react'
import './css/DisplayTodo.css'
import { useLocation } from 'react-router-dom'

const DisplayTodos = () => {
    const location=useLocation()
    const userId=location.state?.userId
    console.log("User ID: ",userId)
    // Write Logic Of Geting User Todos By User Id

    
    const todos = [
        {
            title: "First Todo",
            description: "First Todo Description"
        },
        {
            title: "Secound Todo",
            description: "Secound Todo Description"
        },
        {
            title: "Third Todo",
            description: "Third Todo Description"
        },
        {
            title: "Fourth Todo",
            description: "Fourth Todo Description"
        },

    ]
    // console.log(todos)
    return (
        <>
            <div className="display-todos-container">
                <div className="display-todos">
                    <div className='todos-header-div'>
                        <h3>Your Todos</h3>
                    </div>
                    <div className='todos-div'>
                        {todos.map((todo, index) => (
                            <div key={index} className="todo-item">
                                <div className="title">
                                    {todo.title}
                                </div>
                                <div className="description">
                                    {todo.description}
                                </div>
                                <div className="action-btn">
                                    <button>Edit</button><button>Delete</button>
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