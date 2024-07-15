const mongo = require("mongodb");
const Objectid = require('mongodb').ObjectId;


const password = encodeURIComponent(process.env.MONGO_URL);
const URL = `mongodb+srv://emiliozamarrons:${password}@cluster1.lgljyqa.mongodb.net/Family`;
const client = new mongo.MongoClient(URL);

const getAllJokes = async(req,res) => {
    //#swagger.tags-['Jokes']
    const result = await client.db("Jokes").collection("food_jokes").find()
    result.toArray().then((joke) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(joke);
    });
}

const getJoke = async(req,res) => {
    //#swagger.tags-['Jokes']
    const jokeId = new Objectid(req.params.id);
    const result = await client.db('Jokes').collection('food_jokes').find({_id:jokeId})
    result.toArray().then((joke) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(joke[0]);
    });
}

const newJoke = async (req,res) => {
    //#swagger.tags-['Jokes']
    const joke ={
        joke: req.body.joke
    };;

    const response = await client.db('Jokes').collection('food_jokes').insertOne(joke)
    if(response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `Some error ocurred while creating the joke.`);
    }
}

const updateJoke = async(req,res) => {
    //#swagger.tags-['Jokes']
    const jokeId = new Objectid(req.params.id);
    const joke ={
        joke: req.body.joke
    };
    const response = await client.db('Jokes').collection('food_jokes').replaceOne({_id: jokeId}, joke);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `Some error ocurred while updating the joke.`);
    }
}

const deleteJoke = async(req,res) => {
    //#swagger.tags-['Jokes']
    const jokeId = new Objectid(req.params.id);
    const response = await client.db('Jokes').collection('food_jokes').deleteOne({_id: jokeId});
    if(response.deleteCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `Some error ocurred while deleting the joke.`);
    }
}




module.exports = {
    getAllJokes, getJoke, newJoke, updateJoke, deleteJoke
};