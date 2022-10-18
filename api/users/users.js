const express = require('express');

let md5 = require('md5');
let session = require('express-session');
const {config} = require("../database");
const mongoose = require("mongoose");

let router = express.Router();

class UserDB extends config{

    addUser(){
        super.database.insertOne
    }
    constructor() {
        super();
    }
}
router.post('/reguser', function (req, res) {
    res.json(req.body);
});

module.exports = {
    router
}