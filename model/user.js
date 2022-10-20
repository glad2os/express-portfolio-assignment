const config = require("../api/database").config;
const {mongoose} = require('mongoose');

module.exports = class userModel {
    async addUser(userDAO, callback) {
        return callback(await config.userModel.collection.insertOne(userDAO));
    }

    async getUser(userDAO, callback) {
        return callback(await config.userModel.find({
            $and: [{
                "login": `${userDAO.login}`, "password": `${userDAO.password}`
            }]
        }));
    }

    async validateUserBySessionData(userId) {
        const userDAO = await config.userModel.find({_id: mongoose.Types.ObjectId(userId)});
        return userDAO[0] !== undefined && userDAO[0].password.length > 0;
    }

    async getUserById(userId) {
        const userDAO = await config.userModel.find({_id: mongoose.Types.ObjectId(userId)});
        return userDAO[0];
    }
}