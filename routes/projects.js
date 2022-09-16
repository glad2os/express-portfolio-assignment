const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {className: 'projects', title: 'Express', page: "projects"});
});

module.exports = router;
