const express = require('express');

let md5 = require('md5');
let session = require('express-session');
const {config} = require("../database");
let router = express.Router();

class UserDBConnector {
    async addUser(userDAO, callback) {
        return callback(await config.TestModel.collection.insertOne(userDAO));
    }

    async getUser(userDAO, callback) {
        return callback(await config.TestModel.find({
            $and: [{
                "login": `${userDAO.login}`, "password": `${userDAO.password}`
            }]
        }));
    }
}

let userDB = new UserDBConnector();

router.post('/reguser', function (req, res) {
    const userDAO = {
        login: req.body.login, password: md5(req.body.password)
    }
    userDB.getUser(userDAO, (r) => r).then(r => {
        if (r.length === 0) {
            userDB.addUser(userDAO, (adduserResponse) => {
                if (adduserResponse.insertedId && adduserResponse.acknowledged) {
                    res.status(200);
                    res.end();
                } else {
                    res.status(400);
                    res.end();
                }
            });
        } else {
            res.status(400);
            res.end();
        }
    });
});

router.post('/getuser', function (req, res) {
    const userDAO = {
        login: req.body.login, password: md5(req.body.password)
    }
    userDB.getUser(userDAO, (r) => res.json(r));
});

module.exports = {
    router
}