const express = require ("express")
const {userController} = require("./Controller/Controller")
const app = express();
const bodyParser = require('body-parser')
const {authentication} = require("./utils/authentication")



app.use(express.json());
app.use(authentication)

app.get('/listUsers' , userController.listUser) 
app.get('/getUser/:_Id_' , userController.getUser)
app.put('/updateUser/:_Id_', userController.updateUser)
app.patch('/updateUser/:_Id_', userController.updateUser)
app.delete('/deleteUser/:_Id_' , userController.deleteUser)
app.post('/creatUser' , userController.creatUser)


app.listen(8000 , ()=>{
    // console.log("server is listeingin on 8000")
})


module.exports = {
    app
}