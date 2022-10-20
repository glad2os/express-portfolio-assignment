const config = require("../api/database").config;
const {mongoose} = require('mongoose');

module.exports = class contactModel {
    async addContact(user, contactDAO, callback) {
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
        let response = await config.userModel.find({
            _id: mongoose.Types.ObjectId(user._id),
        });
        return callback(response[0].contacts);
    }

    async updateContact(contactDAO, callback){
        let response = await config.userModel.updateMany({
            "contacts._id": mongoose.Types.ObjectId(contactDAO._id),
        }, {$set : {
            "contacts.$.name": contactDAO.name,
                "contacts.$.number": contactDAO.number,
                "contacts.$.email": contactDAO.email
            }});
        return callback(response);
    }

    async removeContact(contactId, callback){
        let response = await config.userModel.updateMany(
            { },
            { $pull: { contacts: {"_id": mongoose.Types.ObjectId(contactId)}} }
        )

        return callback(response);
    }
}