const config = require("../api/database");
const { mongoose } = require('mongoose');

module.exports = class UserDBConnector {
    async addUser(userDAO, callback) {
        return callback(await config.TestModel.collection.insertOne(userDAO));
    }

    async getUser(userDAO, callback) {
        console.log(config.TestModel)
        return callback(await config.TestModel.collection.find({
            $and: [{
                "login": `${userDAO.login}`, "password": `${userDAO.password}`
            }]
        }));
    }
    //
    // async validateUserBySessionData(userId){
    //     return await config.TestModel.collection.find({_id: mongoose.Types.ObjectId(userId)});
    // }
}