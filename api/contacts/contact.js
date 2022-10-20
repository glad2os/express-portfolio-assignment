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
    const contactDAO = {
        _id: req.body._id, name: req.body.name, number: req.body.number, email: req.body.email
    }

    if (contactDAO.name === undefined || contactDAO.name.length < 1 || contactDAO.number === undefined || contactDAO.number.length < 1 || contactDAO.email === undefined || contactDAO.email.length < 1) {
        res.status(405);
        res.json(contactDAO);
    } else {
        userDB.getUserById(req.session.userid, (userDAO) => userDAO).then(userDAO => {
            if (userDAO !== undefined) {
                contactDB.updateContact(contactDAO, (r) => r).then(r => res.json(r));
            } else {
                res.status(403);
                res.end();
            }
        });
    }
});

router.post('/remove', function (req, res) {
    const contactId = req.body._id;

    if (contactId === undefined) {
        res.status(405);
        res.json({_id: contactId});
    } else {
        userDB.getUserById(req.session.userid, (userDAO) => userDAO).then(userDAO => {
            if (userDAO !== undefined) {
                contactDB.removeContact(contactId, (r) => r).then(r => res.json(r));
            } else {
                res.status(403);
                res.end();
            }
        });
    }
});

router.post('/getall', function (req, res) {
    userDB.getUserById(req.session.userid, (userDAO) => userDAO).then(userDAO => {
        if (userDAO !== undefined) {
            userDB.getUserById(userDAO, (user) => user).then(user => {
                contactDB.getAllContacts(user, (response) => {
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