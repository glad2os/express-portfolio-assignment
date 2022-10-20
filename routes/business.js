const express = require('express');
const UserDBConnector = require("../model/user");
const router = express.Router();

let userDB = new UserDBConnector();

router.get('/', async function (req, res) {
    if (await userDB.validateUserBySessionData(req.session.userid)) {
        res.render('index', {className: 'business', title: 'Express', page: "business", authenticated: req.session.userid});
    } else {
        res.render('error', {message: '403 Forbidden Error', title: 'Express', page: "business"});
    }
});

module.exports = router;
