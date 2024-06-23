const { error } = require("console");
const { DAO } = require("../DAO/userDAO")
const { userValidator, validateId } = require("../Validator/userValidator")


const userModel = {
    listUser: async function () {
        const result = await DAO.listUser();
        return result;
    },
    creatUser: async function (DTO) {
        userValidator(DTO);
        const result = await DAO.creatuser(DTO);
        return result;
    },
    updateUser: async function (Data) {
        userValidator({ ...Data.change, _Id_: Data._Id_ });
        const result = await DAO.updateUser(Data);
        return result
    },
    getUser: async function (Data) {
        userValidator(validateId(Data._Id_));
        const result = DAO.getUser(Data._Id_);
        return result
    },
    deleteUser : async function (Data) {
        userValidator(validateId(Data._Id_));
        const result = DAO.deleteUser(Data._Id_);
        return result;
    }
}

module.exports = {
    userModel
}