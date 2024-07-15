const dotenv = require('dotenv').config();

const mongo = require('mongodb');

async function Database(){
    const password = encodeURIComponent(process.env.MONGO_URL)
    const URL = `mongodb+srv://emiliozamarrons:${password}@cluster1.lgljyqa.mongodb.net/Family`;
    const client = new mongo.MongoClient(URL);
    try{
        await client.connect();
        console.log('DB Connected')
    }catch(error){
        console.log(error)
    } finally {
        await client.close();
    }
}

module.exports = {
    Database
} 


