import { Todos } from '../models/todos.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandlers } from '../utils/AsyncHandler.js'


const addTodo = asyncHandlers(async (req, res) => {

    if (!req.user?._id) {
        throw new ApiError(400, "User Does Not Exits!!")
    }
    const { title, description } = req.body
    if (!(title || description)) {
        throw new ApiError(400, "Title And Description Required!!!")
    }

    const todo = await Todos.create({
        title,
        description,
        createdBy: req.user?._id
    })

    if (!todo) {
        throw new ApiError(400, "Error While Adding Todo!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(201, todo, "Todo Addes Successfully")
        )
})

const getUserAllTodos = asyncHandlers(async (req, res) => {
    const allTodos = await Todos.find({ createdBy: req.user?._id })
        .populate({
            path: "createdBy",
            select: "username email"
        })

    if (!allTodos) {
        throw new ApiError(404, "Todos Not Found!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, allTodos, "User All Todos Fetched Successfully")
        )
})

const toggleTodoStatus = asyncHandlers(async (req, res) => {

    const { todoId } = req.params
    const todo = await Todos.findById(todoId).select("-createdAt -updatedAt")
    if (!todo) {
        throw new ApiError(400, "Todo Does Not Exist !!")
    }

    todo.isComplete = !todo.isComplete
    await todo.save()

    return res.status(200)
        .json(
            new ApiResponse(200, todo, "Todo Status Changed Succesfully")
        )
})

const showTodoBasedOnStatus = asyncHandlers(async (req, res) => {
    const { status } = req.params

    const todos = await Todos.find({ isComplete: status }).select("-createdAt -updatedAt")

    if (!todos) {
        throw new ApiError(400, "No Todos Available!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, todos, "Todo Fetched Successfully Based On Status")
        )
})

const updateTodo = asyncHandlers(async (req, res) => {
    const { title, description } = req.body
    const { todoId } = req.params
    if (!(title || description)) {
        throw new ApiError(400, "Title And Description Required!!")
    }

    const todo = await Todos.findByIdAndUpdate(
        todoId,
        {
            $set: {
                title,
                description
            }
        }, { new: true }
    ).select("-createdAt -updatedAt")

    if (!todo) {
        throw new ApiError(404, "Todo Does Not Exist!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, todo, "Todo Updated Successfully")
        )
})

const getTodoById = asyncHandlers(async (req, res) => {
    const { todoId } = req.params

    const todo = await Todos.findById(todoId)
    if (!todo) {
        throw new ApiError(404, "Todo Not Found!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, todo, "Todo Fetched Successfully")
        )
})

const deleteTodoByID = asyncHandlers(async (req, res) => {
    const { todoId } = req.params

    const todo = await Todos.findByIdAndDelete(todoId)
    if (!todo) {
        throw new ApiError(404, "Todo Not Found!!")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, todo, "Todo Deleted Successfully")
        )
})
export {
    addTodo,
    getUserAllTodos,
    toggleTodoStatus,
    showTodoBasedOnStatus,
    updateTodo,
    getTodoById,
    deleteTodoByID
}