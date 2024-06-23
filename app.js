const express = require ("express")
const {userController} = require("./Controller/Controller")
const app = express() ;




app.use(authentication)


// app.get()

app.listen(8000 , ()=>{
    console.log("server is listeingin on 8000")
})