const config = require("../api/database").config;
const {mongoose} = require('mongoose');

module.exports = class contactModel {
    async addContact(user, contactDAO, callback) {
        console.log(user);
        return callback(await config.userModel.collection.updateOne({_id: mongoose.Types.ObjectId(user._id)}, {
            $push: {
                "contacts": {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": contactDAO.name,
                    "email": contactDAO.email,
                    "number": contactDAO.number
                }
            }
        }, {multi: true}));
    }

    async getAllContacts(user, callback) {
        let userDAO = await config.userModel.find({
            _id: mongoose.Types.ObjectId(user._id),
        });
        return callback(userDAO[0].contacts);
    }


    async validateUserBySessionData(userId) {
        const userDAO = await config.userModel.find({_id: mongoose.Types.ObjectId(userId)});
        return userDAO[0] !== undefined && userDAO[0].password.length > 0;
    }
}