const {userModel} = require ("../Models/userMode")

// currently i dont think we have any bussiness logic for the services 

const userServices ={
    listUser: async function () {
        const result = await userModel.listUser();
        return result;
    },
    creatUser: async function (DTO) {
        userValidator(DTO);
        const result = await userModel.creatuser(DTO);
        return result;
    },
    updateUser: async function (Data) {
        userValidator({ ...Data.change, _Id_: Data._Id_ });
        const result = await userModel.updateUser(Data);
        return result
    },
    getUser: async function (Data) {
        userValidator(validateId(Data._Id_));
        const result = userModel.getUser(Data._Id_);
        return result
    },
    deleteUser : async function (Data) {
        userValidator(validateId(Data._Id_));
        const result = userModel.deleteUser(Data._Id_);
        return result;
    }
}

module.exports = {
    userServices
}