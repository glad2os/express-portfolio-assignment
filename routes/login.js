const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {className: 'login', title: 'Express', page: "login", authenticated: req.session.userid});
});

module.exports = router;
