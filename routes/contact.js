const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {className: 'contact', title: 'Express', page: "contact", authenticated: req.session.userid});
});

module.exports = router;
