const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const users = require('./users/users');

router.use(express.json());
router.use("/users", users.router);

router.post('/', function (req, res) {
    res.json({version: process.env.npm_package_version, application: "back-end"});
});

router.post('/status', async function (req, res, next) {
    try {
        const mongodb = await mongoose.connect(process.env.DB_HOST);
        res.json({
            version: process.env.npm_package_version,
            application: "back-end",
            mongodb: mongodb.connection.readyState
        });
    } catch (ex) {
        res.json({errorMessage: ex});
    }
});

module.exports = router;