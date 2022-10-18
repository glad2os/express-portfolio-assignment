const mongoose = require('mongoose');

class config {
    static database = mongoose;
    static TestModel;
    static async initialize() {
        const schema = new config.database.Schema({
            login: String,
            password: String
        });

        await mongoose.connect(process.env.DB_HOST);

        this.TestModel = config.database.model('Users', schema);
    }
}

module.exports = {
    config
}