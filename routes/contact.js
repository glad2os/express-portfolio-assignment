const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {className: 'contact', title: 'Express', page: "contact"});
});

module.exports = router;
