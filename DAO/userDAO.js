const { getMongoClientInstance } = require("../utils/db")



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
        const result = await collection.find({}).toArray();
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
        const result = await collection.insertOne(Data);
        return result;
    },
    updateUser: async function (Id , Data) {
        /*
        Data 
        {
            id : **********,
            change : {key1 : vlaue1 , key2 : value2 ....}  --- > key and vlaue which is need to be update
        }
        */
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const result = await collection.updateOne({ Id: Id }, { $set: Data })
        return result;
    },
    replaceUser : async function  (Id , data){
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const result = await collection.replaceOne({ Id: Id } , data);
        return result

    },
    getUser: async function (_Id_) {
        const client = await getMongoClientInstance();
        const collection = client.db("intern").collection("users");
        const user = await collection.findOne({ Id: _Id_ });
        
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