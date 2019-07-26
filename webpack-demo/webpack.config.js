const path = require('path')

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
    mode: 'development'
}