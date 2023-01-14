const mongodb = require('../db/connect');

const homeView = async (req, res, next) => {
    res.send("Home view");
}

const testingFunction = async (req, res, next) => {
    const queryId = req.query.id;
    //console.log(queryId);
    const dbresult = await mongodb.getDb().db().collection('contacts').find();
    const dbresultArray = dbresult.toArray()
    dbresultArray.then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

module.exports = {testingFunction, homeView};