const { error } = require("console");
const { DAO } = require("../DAO/userDAO")
const { userValidator, validateId } = require("../Validator/userValidator")


const userModel = {
    listUser: async function () {
        const result = await DAO.listUser();
        return result;
    },
    creatUser: async function (DTO) {
        // validating the data 

        const validateObj = userValidator(DTO);
        if (validateObj.All) {
            const result = await DAO.creatuser(DTO);
            return result;
        }
        else {
            throw new error("Validation fail")
        }
    },
    updateUser: async function (Data) {
        // validating the data 

        const validationObj = userValidator({ ...Data.change, _Id_: Data._Id_ });
        for (let key in Data.change) {
            if (!validatorObj[key]) {
                throw new error("validation fail")
            }
        }
        if (!validatorObj["_Id_"]) {
            return new error("Validation fail")
        }
        const result = await DAO.updateUser(Data);
        return result
    },
    getUser: async function (Data) {
        // validating the data 

        const validattionObj = userValidator(validateId(Data._Id_));
        if (!validattionObj["_Id_"]) {
            return new error("Validation fail")
        }
        const result = DAO.getUser(Data._Id_);
        return result
    },
    deleteUser: async function (Data) {
        // validating the data 

        const validattionObj = userValidator(validateId(Data._Id_));
        if (!validattionObj["_Id_"]) {
            return new error("Validation fail")
        }
        const result = DAO.deleteUser(Data._Id_);
        return result;
    }
}

module.exports = {
    userModel
}