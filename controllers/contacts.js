const mongodb = require('../db/connect');
const path = require('path');
const ObjectId = require('mongodb').ObjectId; 
let updateId;

const homeView = async (req, res, next) => {
    res.send("Home view");
}

const displayContact = async (req, res, next) => {
    const queryId = req.query.id;
    console.log(queryId);
    const dbresult = await mongodb.getDb().db().collection('contacts').find();
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

const addContactView = async (req, res, next) => {
    res.sendFile(path.join(__dirname,"../view/createContact.html"));
}

const addContact = async (req, res, next) => {
    console.log(req.body);
    const collection = await mongodb.getDb().db().collection('contacts')
    collection.insertOne(req.body).then(result => {
        res.status(201).send();
    }).catch(err => console.log(err));
}

const updateContactView = async (req, res, next) => {
    const queryId = req.query.id;
    if(queryId){
        updateId = queryId;
    } else {
        updateId = null;
    }
    res.sendFile(path.join(__dirname,"../view/updateContact.html"));
}

const updateContact = async (req, res, next) => {
    const collection = await mongodb.getDb().db().collection('contacts');
    const user_id = new ObjectId(req.query.id);
    collection.updateOne({"_id": user_id}, 
        {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
            
        }}
        ).then(result => {
            res.status(204).send();
    }).catch(err => {console.log(err); res.status(500).send();});
}

const deleteContact = async (req, res) => {
    console.log("a");
    const collection = await mongodb.getDb().db().collection('contacts');
    const user_id = new ObjectId(req.query.id);
    collection.deleteOne({"_id": user_id}, true
        ).then(result => {
            res.status(204).send();
    }).catch(err => {console.log(err); res.status(500).send();});
}

module.exports = {displayContact, homeView, addContactView, addContact, updateContactView, updateContact, deleteContact};