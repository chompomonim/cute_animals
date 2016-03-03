var path = require("path");

module.exports = {
    devtool: 'eval-source-map',

    entry:  {
        app: ["./app/main.jsx"]
    },

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/public/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    },

    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true
    }
}
