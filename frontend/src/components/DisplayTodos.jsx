import React from 'react'
import './css/DisplayTodo.css'
import { useEffect ,useState} from 'react'
import { useLocation } from 'react-router-dom'

const DisplayTodos = () => {
    const [todos, setTodos] = useState([]); // State to store todos
    useEffect(() => {
        const fetchUserTodos = async() => {
            try {
                const response=await fetch('http://localhost:3000/api/todos/',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    credentials:'include'
                })

                if(!response.ok){
                    console.log("Cant Fetch Todos!")
                }

                const result=await response.json()
                console.log('All Todos: ',result)
                setTodos(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserTodos()
    }, [])

    console.log(todos)
    // const todos = [
    //     {
    //         title: "First Todo",
    //         description: "First Todo Description"
    //     },
    //     {
    //         title: "Secound Todo",
    //         description: "Secound Todo Description"
    //     },
    //     {
    //         title: "Third Todo",
    //         description: "Third Todo Description"
    //     },
    //     {
    //         title: "Fourth Todo",
    //         description: "Fourth Todo Description"
    //     },

    // ]
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