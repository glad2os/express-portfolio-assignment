const mongoose = require('mongoose');

class config {
    static mongoose;
    static userModel;

    static async initialize() {
        await mongoose.connect(process.env.DB_HOST);

        const schema = new mongoose.Schema({
            login: String, password: String
        });

        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', schema);
    }
}

module.exports = {
    config
}