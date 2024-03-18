const express=require("express")
const { connection } = require("./Config/db")
const { authRouter } = require("./Router/authRouter")
const cookieParser=require("cookie-parser")
const { messageRouter } = require("./Router/messageRouter")
const { userRouter } = require("./Router/userRouter")
require("dotenv").config()
const PORT=process.env.PORT
const app= express()

app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRouter)
app.use("/msg",messageRouter)
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Chart app")
})






app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`Server is start ${PORT} and db is also connected`)
    } catch (error) {
        
    }
})
