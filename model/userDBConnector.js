const config = require("../api/database").config;
const {mongoose} = require('mongoose');

module.exports = class UserDBConnector {
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
        return await config.userModel.find({_id: mongoose.Types.ObjectId(userId)});
    }
}