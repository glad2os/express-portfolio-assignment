const {authenticationSites} = require("../config/authentication");
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    if(authenticationSites("business")){

    }
    res.render('index', {className: 'business', title: 'Express', page: "business"});
});

module.exports = router;
