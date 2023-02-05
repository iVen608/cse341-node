const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 
let updateId;

const displayTowns = async (req, res, next) => {
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
}

const displayInventory = async (req, res, next) => {
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
}

const addTown = async (req, res, next) => {
    const collection = await mongodb.getDb().db().collection('towns')
    collection.insertOne(req.body).then(result => {
        res.status(201).send(result);
    }).catch(err => res.status(500).send());
}


module.exports = {displayTowns, displayInventory, addTown};