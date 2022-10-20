const express = require('express');

const md5 = require('md5');
const userModel = require("../../model/user");
const contactModel = require("../../model/contacts");
const router = express.Router();

let userDB = new userModel();
let contactDB = new contactModel()

router.post('/add', function (req, res) {
    const contactDAO = {
        name: req.body.name, number: req.body.number, email: req.body.email
    }

    if (contactDAO.name === undefined || contactDAO.name.length < 1 || contactDAO.number === undefined || contactDAO.number.length < 1 || contactDAO.email === undefined || contactDAO.email.length < 1) {
        res.status(405);
        res.json(contactDAO);
    } else {
        userDB.getUserById(req.session.userid, (userDAO) => userDAO).then(userDAO => {
            if (userDAO !== undefined) {
                userDB.getUserById(userDAO, (user) => user).then(user => {
                    contactDB.addContact(user, contactDAO, (response) => {
                        res.json(response)
                    });
                });
            } else {
                res.status(403);
                res.end();
            }
        });
    }
});

router.post('/update', function (req, res) {
    /*
    db.users.updateMany({ "contacts._id": ObjectId("6350ef1e43d2b4700ba65232") }, {$set : {"contacts.$.name": "testU" }});
     */

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

router.post('/getall', function (req, res) {
    userDB.getUserById(req.session.userid, (userDAO) => userDAO).then(userDAO => {
        if (userDAO !== undefined) {
            userDB.getUserById(userDAO, (user) => user).then(user => {
                contactDB.getAllContacts(user,(response) => {
                    res.json(response)
                });
            });
        } else {
            res.status(403);
            res.end();
        }
    });
});


module.exports = {
    router
}