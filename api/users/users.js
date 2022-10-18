const express = require('express');

let md5 = require('md5');
let session = require('express-session');
const {config} = require("../database");
let router = express.Router();

class UserDBConnector{
    async addUser() {
        await config.TestModel.collection.insertOne({name: 'Test 2'});
    }

    async getAllUsers(callback) {
        return callback(await config.TestModel.find({name: 'Test 2'}));
    }

}

let userDB = new UserDBConnector();

router.post('/reguser', function (req, res) {
    userDB.addUser().then(r => {
        res.status(200);
        res.end();
    }).catch(ex => {
        res.json(ex);
    })
});

router.post('/getuser', function (req, res) {
    userDB.getAllUsers((r) => res.json(r));
});

module.exports = {
    router
}