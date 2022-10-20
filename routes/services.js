const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {className: 'services', title: 'Express', page: "services", authenticated: req.session.userid});
});

module.exports = router;
