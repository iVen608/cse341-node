const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 
let updateId;

const validateTowns = function(data){
    //Check for empty inputs
    if(!data.townName || !data.population || !data.description || !data.leader || !data.climate || !data.specialty || !data.government){
        return false;
    }
    if(isNaN(parseInt(data.population))){
        console.log(false);
        return false;
    }
    return true;
}

const displayTowns = async (req, res, next) => {
    try{
        const queryId = req.query.id;
        const dbresult = await mongodb.getDb().db().collection('towns').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            if(queryId){
                const element = content.filter(contact => contact._id.toString() == queryId);
                res.status(200).json(element);
            } else {
                res.status(200).json(content);
            }
        })
    }catch(err){
        res.status(500).send();
    }
    
}

const displayInventory = async (req, res, next) => {
    try{
        const queryId = req.query.id;
        const dbresult = await mongodb.getDb().db().collection('inventory').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            if(queryId){
                const element = content.filter(contact => contact._id.toString() == queryId);
                res.status(200).json(element);
            } else {
                res.status(200).json(content);
            }
            
        })
    }catch(err){
        res.status(500).send();
    }
    
}

const addTown = async (req, res, next) => {
    try{
        const collection = await mongodb.getDb().db().collection('towns');
        const data = {
            townName: req.body.townName,
            population: req.body.population,
            description: req.body.description,
            leader: req.body.leader,
            climate: req.body.climate,
            specialty: req.body.specialty,
            government: req.body.government
            
        }
        if(!validateTowns(data)){
            console.log("error");
            res.status(500).send();
        }
        collection.insertOne(req.body).then(result => {
            res.status(201).send(result);
        }).catch(err => {console.log(err); res.status(500).send();});
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
    
}

const updateTown = async (req, res, next) => {
    try{
        const collection = await mongodb.getDb().db().collection('towns');
        if(!req.query.id){
            console.log("Missing ID");
            res.status(500).send();
        }
        if(!validateTowns(req.body)){
            console.log("Missing data");
            res.status(500).send();
        }
        const user_id = new ObjectId(req.query.id);
        collection.updateOne({"_id": user_id}, 
            {$set: {
                townName: req.body.townName,
                population: req.body.population,
                description: req.body.description,
                leader: req.body.leader,
                climate: req.body.climate,
                specialty: req.body.specialty,
                government: req.body.government
                
            }}
            ).then(result => {
                res.status(204).send();
        }).catch(err => {console.log(err); res.status(500).send();});
    } catch(err){
        res.status(500).send();
    }

    
}

const deleteTown = async (req, res) => {
    try{
        const collection = await mongodb.getDb().db().collection('towns');
        if(!req.query.id){
            res.send(500).send("Missing ID to delete town");
        }
        const user_id = new ObjectId(req.query.id);
        collection.deleteOne({"_id": user_id}, true
            ).then(result => {
                res.status(204).send();
        }).catch(err => {console.log(err); res.status(500).send();});
    }catch(err){
        res.status(500).send();
    }
    
}


module.exports = {displayTowns, displayInventory, addTown, updateTown, deleteTown};