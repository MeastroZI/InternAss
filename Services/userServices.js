const {userModel} = require ("../Models/userMode")


// currently i dont think we have any bussiness logic for the services 

const userServices ={
    listUser: async function () {
        const result = await userModel.listUser();
        return result;
    },
    creatUser: async function (DTO) {
        const result = await userModel.creatUser(DTO);
        return result;
    },
    updateUser: async function (Data) {
        if (Data.method == "PATCH" && "_Id_" in Data.change){
            throw new Error("Id can't be change cannont put the Id in data for PATCH req")
        }
        else if(Data.method == "PUT" && Data.change.Id == ''){
            throw new Error ("Id can't be null")
        }
        else if (Data.method == "PUT" &&  Data.change.Id != Data.Id) {
            throw new Error ("Id can't be change")
        } 
        const result = await userModel.updateUser(Data);
        return result
    },
    getUser: async function (Data) {
        const result = await userModel.getUser(Data);
        return result
    },
    deleteUser : async function (Data) {
        const result = await userModel.deleteUser(Data);
        return result;
    }
}

module.exports = {
    userServices
}