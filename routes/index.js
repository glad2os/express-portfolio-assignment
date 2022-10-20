const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {className: 'home', title: 'Express', page: "home", authenticated: req.session.userid});
});

module.exports = router;
