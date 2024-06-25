const { userDTO  , updateUserDto} = require("../DTO/userDto");
const { responseData } = require("../DTO/responseDto")
const { userServices } = require("../Services/userServices")

const userController = {
    listUser: async function (req, res) {
        let message = "All done"
        try {
            const result = await userServices.listUser();
            const resDto = responseData(message, result)
            if(req.method == "POST") {
                res.status(200).json(resDto)
            }
            else {
                const users = resDto.reqData
                res.render('userData',  {users} )
            }

        }
        catch (err) {
            console.log(err)
            message = err.message;
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
    },
    creatUser: async function (req, res) {
        let message = "All done";
        let data = req.body.reqData;
        try {
            const reqDto = userDTO(data)
            const result = await userServices.creatUser(reqDto);
            const resDto = responseData(message, result)
            res.status(201).json(resDto)

        }
        catch (err) {
            console.log(err)
            message = err.message;
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
       
    },
    updateUser: async function (req , res) {
        // validating the data 
        let message = "All done";
        try {
            const reqDto = updateUserDto(req.params._Id_ , req.body.reqData , req.method)
            const result = await userServices.updateUser(reqDto)
            const resDto = responseData(message, result)
            res.status(201).json(resDto)
        }
        catch (err) {
            console.log(err)
            message = err.message
            const resDto = responseData(message, {})
            console.log(message)
            console.log(resDto)
            res.status(501).json(resDto)
        }
        
    },
    getUser: async function (req , res) {
        let message = "All done";
        console.log(req.params)
        let data = {Id: req.params._Id_}
        try {
            const result = await userServices.getUser(data)
            const resDto = responseData(message, result)
            res.status(201).json(resDto)
            
        }
        catch (err) {
            console.log(err)
            message = err.message
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
        
    },
    deleteUser: async function (req , res) {
        let message = "All done";
        let data = {Id : req.params._Id_};
        try {
            const result = await userServices.deleteUser(data)
            const resDto = responseData(message, result)
            res.status(201).json(resDto)

        }
        catch (err) {
            console.log(err)
            message = err.message
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
    }
}

module.exports = {
    userController
}