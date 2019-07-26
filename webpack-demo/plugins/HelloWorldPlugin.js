module.exports = class HelloWorldPlugin {
    apply(compiler){
        compiler.hooks.done.tap('hello',(stats) => {
            console.log('hello world')
        })
    }
}