const { MongoClient, ServerApiVersion , ObjectId} = require("mongodb");
require('dotenv').config();
const uri = process.env.DBURL;
console.log(uri)
const connectionPool = []

async function getMongoClientInstance() {
    if (connectionPool.length-1 > 0) {
        console.log("resusing the cleint")
        await connectionPool[connectionPool.length-1].connect()
        return connectionPool[connectionPool.length-1]
    }
    else {
        console.log("created new client")
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
        )
        
        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            connectionPool.push(client)
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (err){
            // console.log(err)
            console.err(err)
        }
        return client
    }
}

function get_Object_id(){
    const newObjId = new ObjectId()
    return newObjId
}

module.exports = {
    getMongoClientInstance , get_Object_id
}