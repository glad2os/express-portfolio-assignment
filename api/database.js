const mongoose = require('mongoose');

class config {
    static mongoose;
    static userModel;
    static contactModel;

    static async initialize() {
        await mongoose.connect(process.env.DB_HOST);

        const schema = new mongoose.Schema({
            login: String, password: String, contacts: [{
                name: String, number: String, email: String
            }]
        });

        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', schema);
    }
}

module.exports = {
    config
}