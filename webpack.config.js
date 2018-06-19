var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: __dirname + "/src/index.js",
    externals: [nodeExternals()],
    target: 'node',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        library: 'satori-flow',
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0"],
                }
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['*', '.js']
    }
};
