const express = require('express');

let md5 = require('md5');
let session = require('express-session');
const {config} = require("../database");
const mongoose = require("mongoose");
const {json} = require("express");

let router = express.Router();

class UserDBConnector extends config {


    constructor() {
        super();
    }

    async addUser() {
        await config.initialize();

        const schema = config.database.Schema({
            name: String
        });
        const TestModel = config.database.model('Users', schema);

        await TestModel.collection.insertOne({name: 'Test 2'});
    }

    async getAllUsers(callback) {
        await config.initialize();

        const schema = new config.database.Schema({
            name: String
        });
        const TestModel = config.database.model('Users', schema);
        return callback(await TestModel.find({name: 'Test 2'}));
    }

}

router.post('/reguser', function (req, res) {
    let userDB = new UserDBConnector();
    userDB.addUser().then(r => {
        res.json(r);
    }).catch(ex => {
        res.json(ex);
    })
});

router.post('/getuser', function (req, res) {
    let userDB = new UserDBConnector();
    userDB.getAllUsers((r) => res.json(r));
});


module.exports = {
    router
}