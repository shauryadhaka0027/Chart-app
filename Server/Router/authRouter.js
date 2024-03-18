const express=require('express')
const { login, signup } = require('../Controller/auth.controller')


const authRouter=express.Router()

authRouter.post("/register",signup)
authRouter.post("/login",login)



module.exports={authRouter}