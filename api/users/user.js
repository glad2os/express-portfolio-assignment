const express = require('express');

const md5 = require('md5');
const UserDBConnector = require("../../model/user");
const router = express.Router();

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
    userDB.getUser(userDAO, (r) => {
        if (r[0] !== undefined) {
            req.session.userid = r[0].id;
            res.status(200);
            res.end();
        } else {
            res.status(400);
            res.end();
        }
    });
});

module.exports = {
    router
}