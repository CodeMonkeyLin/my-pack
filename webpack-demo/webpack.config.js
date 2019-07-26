const path = require('path')
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin')
const HTMLPlugin = require('./plugins/HTMLPlugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        //pre>inline>normal>post
        rules: [
            {
                test: /\.js$/, use: {
                    loader: './loaders/loader1.js',
                    options: {
                        name: '那一夜'
                    }
                },

            }

            // {
            //     test: /\.js$/,
            // use: ['./loaders/loader1.js', './loaders/loader2.js', './loaders/loader3.js'],
            // },
        ]
    },
    plugins: [
        new HelloWorldPlugin(),
        // new HTMLPlugin({
        //     filename: 'index.html',
        //     template: './src/index.html'
        // })
    ],
    mode: 'development'
}