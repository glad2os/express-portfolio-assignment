const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const users = require('./users/users');

const {config} = require("./database");

let database = async () => {
    await config.initialize();
};
database().then();

router.use(express.json());
router.use("/users", users.router);

router.post('/', function (req, res) {
    res.json({version: process.env.npm_package_version, application: "back-end"});
});

router.post('/status', async function (req, res) {
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