const mongoose = require('mongoose');
const logger = require('morgan');

class config {

    database;

    constructor (async_param) {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }
    }

    static async build () {
        return new config(await mongoose.connect(process.env.DB_HOST));
    }
}

module.exports = {
    config
}