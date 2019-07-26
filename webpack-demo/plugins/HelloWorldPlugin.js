const pluginName = 'HelloWorldPlugin';

module.exports = class HelloWorldPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap(pluginName, (stats) => {
            console.log('hello 明天')
        })

        compiler.hooks.afterEmit.tap(pluginName, (stats) => {
            console.log('hello 后天')
        })
    }
}