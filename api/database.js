const mongoose = require('mongoose');

class config {


    static database = mongoose;
    static async initialize() {
        return await mongoose.connect(process.env.DB_HOST)
    }
}

module.exports = {
    config
}