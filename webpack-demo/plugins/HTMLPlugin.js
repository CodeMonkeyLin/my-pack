const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')
module.exports = class HelloWorldPlugin {
    constructor(options) {
        this.options = options
        console.log(options)
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('HTMLPlugin', compilation => {
            let res = fs.readFileSync(this.options.template, 'utf-8')
            let $ = cheerio.load(res)
            Object.keys(compilation.assets).forEach(item => $(`<script src="${item}"></script>`).appendTo('body'))
            fs.writeFileSync(path.join(process.cwd(), 'dist', this.options.filename), $.html())
        })
    }
}