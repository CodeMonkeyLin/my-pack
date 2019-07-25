const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['./loaders/loader1.js', './loaders/loader2.js', './loaders/loader3.js'],
            // use: {
            //     loader: './loaders/loader1.js',
            //     options: {
            //         name: '那一天'
            //     }
            // },
        }]
    },
    plugins:{
        // new HelloWorldPlugin(),
        // new HTMLPlugin({
        //     filename:'index.html',
        //     template:'./src/index.html'
        // })
    },
    mode: 'development'
}