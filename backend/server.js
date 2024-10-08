import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then( () => {
    console.log("Connected to mongoDB");
}).catch( (error) => {
    console.log(error);
})

// const app = express() 

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

// import routes
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"
import { server, app } from './socket/socket.js'

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoute)

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})