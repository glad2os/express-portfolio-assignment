const base = require('./config/webpack.base.js');
const {merge} = require('webpack-merge');

module.exports = (env) => {
    switch (env.MODE) {
        case 'development':
            return merge({MODE: 'development', devtool: 'source-map'}, base.commonConfig())
        case 'production':
            return merge({MODE: 'production'}, base.commonConfig())
        default:
            throw new Error('No matching configuration was found!');
    }
}