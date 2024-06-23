const { userDTO } = require("../DAO/userDAO");
const { responseData } = require("../DTO/responseDto")
const { userServices } = require("../Services/userServices")

const userController = {
    listUser: async function (req, res) {
        let message = "All done"
        try {
            const result = userServices.listUser();
            const resDto = responseData(message, result)
            res.status(201).json(resDto)

        }
        catch (err) {
            message = err;
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
        return result;
    },
    creatUser: async function (req, res) {
        let message = "All done";
        let data = req.body.reqData;
        try {
            const reqDto = userDTO(data)
            const result = userServices.creatUser(reqDto);
            const resDto = responseData(message, result)
            res.status(201).json(resDto)

        }
        catch (err) {
            message = err;
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
        return result;
    },
    updateUser: async function (req , res) {
        // validating the data 
        let message = "All done";
        let data = req.body.reqData;
        try {
            const result = userServices.updateUser(data)
            const resDto = responseData(message, result)
            res.status(201).json(resDto)
        }
        catch (err) {
            message = err
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
        return result
    },
    getUser: async function (req , res) {
        let message = "All done";
        let data = req.body.reqData;
        try {
            const result = userServices.getUser(data)
            const resDto = responseData(message, result)
            res.status(201).json(resDto)
            return result
        }
        catch (err) {
            message = err
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
        
    },
    deleteUser: async function (Data) {
        let message = "All done";
        let data = req.body.reqData;
        try {
            const result = userServices.updateUser(data)
            const resDto = responseData(message, result)
            res.status(201).json(resDto)
            return result
        }
        catch (err) {
            message = err
            const resDto = responseData(message, {})
            res.status(501).json(resDto)
        }
    }
}

module.exports = {
    userController
}