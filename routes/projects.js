const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {className: 'projects', title: 'Express', page: "projects", authenticated: req.session.userid});
});

module.exports = router;
