import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    addTodo,
    deleteTodoByID,
    getTodoById,
    getUserAllTodos,
    showTodoBasedOnStatus,
    toggleTodoStatus,
    updateTodo
} from "../controllers/todos.controller.js";


const router = Router()

router.use(verifyJwt)
router.route('/').post(addTodo).get(getUserAllTodos)
router.route('/toggle/:todoId').post(toggleTodoStatus)
router.route('/getTodoByStatus/:status').get(showTodoBasedOnStatus)
router.route('/:todoId').patch(updateTodo).get(getTodoById).delete(deleteTodoByID)
export default router