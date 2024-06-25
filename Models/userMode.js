
const { DAO } = require("../DAO/userDAO")
const {validateUser} = require ('../Validator/joiValidation')

const validationTargets = ["Id" , "Email" , "Age" , "Zip_Code"]
const userModel = {
    listUser: async function () {
        const result = await DAO.listUser();
        return result;
    },
    creatUser: async function (DTO) {
        // validating the data 
        let validationObj = {errors : "Validation error"}
        if (await DAO.getUser(DTO.Id) != null) {
            throw new Error ("User with this Id is already present")
        }
        else if ((validationObj= validateUser(DTO)).success) {
            const result = await DAO.creatuser(DTO);
            return result;
        }
        else {
            throw new Error(validationObj.errors)
        }
    },
    updateUser: async function (Data) {
        
        if (await DAO.getUser(Data.Id) == null) {
            throw new Error ("No user with this Id")
        }
        let validationObj
        if (Data.method=="PUT" && (validationObj=validateUser(Data.change)).success){       
            return await DAO.replaceUser(Data.Id , Data.change);
        }
        else if (Data.method == "PATCH" && (validationObj = validateUser({...Data.change , Id : Data.Id})).success){
            return await DAO.updateUser(Data.Id , Data.change);
        }
        else {
            console.log(validationObj.errors)
            throw new Error(validationObj.errors)
        }
        
    },
    getUser: async function (Data) {
        // validating the data 
        if ( await DAO.getUser(Data.Id) != null) {
            return await DAO.getUser(Data.Id);
        }
        else {
            throw new Error("No user with this Id")
        }
    },
    deleteUser: async function (Data) {
        // validating the data 
        if ( await DAO.getUser(Data.Id) != null) {
            const result = await DAO.deleteUser(Data.Id);
            return result;
        }
        else  {
            throw new Error("No user with this Id")
        }
    }
}

module.exports = {
    userModel
}