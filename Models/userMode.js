
const { DAO } = require("../DAO/userDAO")
const { userValidator, validateId } = require("../Validator/userValidator")

const validationTargets = ["Id" , "Email" , "Age" , "Zip_Code"]
const userModel = {
    listUser: async function () {
        const result = await DAO.listUser();
        return result;
    },
    creatUser: async function (DTO) {
        // validating the data 

        const validationObj = userValidator(DTO);
        if (await DAO.getUser(DTO.Id) != null) {
            throw new Error ("User with this Id is already present")
        }
        if (validationObj.All) {
            const result = await DAO.creatuser(DTO);
            return result;
        }
        else {
            throw new Error("Validation fail")
        }
    },
    updateUser: async function (Data) {
        
        if (await DAO.getUser(Data.Id) == null) {
            throw new Error ("No user with this Id")
        }
        const validationObj = userValidator(Data.change);
        if (!validateId(Data.Id)){       
            throw new  Error("Id is not valid")
        }   
        for (let key of validationTargets) {
            if ( (key in Data.change) && !validationObj[key]) {
                throw new  Error("Data is not valid")
            }
        }

        if (Data.method == 'PUT') {
            return await DAO.replaceUser(Data.Id , Data.change);
        }
        else if (Data.method == 'PATCH'){
            return await DAO.updateUser(Data.Id , Data.change);
        }
    },
    getUser: async function (Data) {
        // validating the data 

        if ( await DAO.getUser(Data.Id) == null) {
            throw new Error("No user with this Id")
        }
        if (validateId(Data.Id)) {
            return await DAO.getUser(Data.Id);
        }
        else {
            throw new  Error("Id is not valid")
        }
    },
    deleteUser: async function (Data) {
        // validating the data 
        if ( await DAO.getUser(Data.Id) == null) {
            throw new Error("No user with this Id")
        }
        if (validateId(Data.Id)){
            const result = await DAO.deleteUser(Data.Id);
            return result;
        }
        else  {
            throw new Error("Validation fail")
        }
    }
}

module.exports = {
    userModel
}