module.exports = {
    entry: './www/es6/index.js',
    output: {
        path: __dirname + '/www/es6/',
        publicPath: "/www/es6/",
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    }
};