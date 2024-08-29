import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// MiddleWares That Run In Middle Of Request ..

// You Can Set The Origin From Where Can Request Come
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Set The Limit Of Json Data
app.use(express.json({ limit: "16kb" }))

// Allow Url To Encode space And Encode The Url
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//To Define One Public Folder In Which All File Can Be Easily Access
app.use(express.static("public"))

// Cookie To Perform CURD Operation ON Cookie
app.use(cookieParser())

// Importing User Routes
import userRouter from './routes/user.routes.js'
import todosRouter from './routes/todos.routes.js'
app.use('/api/users', userRouter)
app.use('/api/todos', todosRouter)

export { app }

