const mongodb = require('../db/connect');

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

module.exports = {testingFunction, homeView};