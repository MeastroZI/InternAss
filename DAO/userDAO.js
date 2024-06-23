const { getMongoClientInstance } = require("../Db_Config/db")



// Id (Generated)
// Email
// Name
// Age
// City
// Zip code

const DAO = {
    listUser: async function () {
        const client = await getMongoClientInstance()
        const collection = client.db("intern").collection("users");
        const result = collection.find({}).toArray();
        return result;
    },
    creatuser: async function (Data) {

        /*
        Data
        {
            id : *******,
            Email : **********,
            Name : ***********,
            Age : ** ,
            City : ****** ,
            ZipCode : *********
        }
        */
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const result = collection.insertOne(Data);
        return result;
    },
    updateUser: async function (Data) {
        /*
        Data 
        {
            id : **********,
            change : {key1 : vlaue1 , key2 : value2 ....}  --- > key and vlaue which is need to be update
        }
        */
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const user = getUser(Data._Id_);
        const result = collection.updateOne({ Id: Data.id }, { $set: Data.change })
        return result;
    },
    getUser: async function (_Id_) {
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const user = await collection.find({ Id: _Id_ });
        console.log(user)
        return user;
    },

    deleteUser: async function (_Id_) {
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const result = await collection.deleteOne({ Id: _Id_ });
        return result
    }
}








module.exports = {
    DAO
}