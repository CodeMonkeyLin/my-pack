const pluginName = 'HelloWorldPlugin';

module.exports = class HelloWorldPlugin {
    apply(compiler) {
        compiler.hooks.compile.tap(pluginName, (stats) => {
            console.log('hello compile')
        })

        compiler.hooks.emit.tap(pluginName, (stats) => {
            console.log('hello emit')
        })

        compiler.hooks.afterEmit.tap(pluginName, (stats) => {
            console.log('hello afterEmit')
        })

        // compiler.hooks.ccc.tap(pluginName, (stats) => {
        //     console.log('hello ccc')
        // })
    }
}