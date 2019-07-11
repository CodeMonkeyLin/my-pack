## npm link介绍
1. 新建`bin`目录，将打包工具主程序放入其中

   主程序的顶部应当有：`#!/usr/bin/env node`标识，指定程序执行环境为node

2. 在`package.json`中配置`bin`脚本

   ```json
   {
   	"bin": "./bin/my-pack.js"
   }
   ```

3. 通过`npm link`链接到全局包中，供本地测试使用

## 简化分析webpack打包的bundle文件

- [官方demo](https://github.com/chinanf-boy/minipack-explain)
```js
(function (modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.l = true;
        // Return the exports of the module
        return module.exports;
    }
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;
    // expose the module cache
    __webpack_require__.c = installedModules;
    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
    ({
        "./src/index.js":
            (function (module, exports, __webpack_require__) {
                eval("let news = __webpack_require__(/*! ./news.js */ \"./src/news.js\")\r\nconsole.log(news.content)\n\n//# sourceURL=webpack:///./src/index.js?");
            }),
        "./src/message.js":
            (function (module, exports) {
                eval("module.exports = {\r\n    content: '今天天气真好!!!'\r\n}\n\n//# sourceURL=webpack:///./src/message.js?");
            }),
        "./src/news.js":
            (function (module, exports, __webpack_require__) {
                eval("let message = __webpack_require__(/*! ./message.js */ \"./src/message.js\")\r\n\r\nmodule.exports = {\r\n    content: '今天我想说:' + message.content\r\n}\n\n//# sourceURL=webpack:///./src/news.js?");
            })
    });
```

其内部就是自己实现了一个`__webpack_require__`函数，递归导入依赖关系

## webpack与ast

webpack源码从 Entry 开始读取文件，根据文件类型和配置的 Loader 对文件进行编译，将loader处理后的文件通过acorn抽象成抽象语法树AST,然后遍历AST，递归分析构建该模块的所有依赖。

- [ast介绍](https://juejin.im/post/5bff941e5188254e3b31b424)
- [webpack源码之ast简介](https://segmentfault.com/a/1190000014178462)

## node模板

利用普通的 JavaScript 代码生成html等文件
- [ejs](https://ejs.bootcss.com/)
- [art-temmplate](https://aui.github.io/art-template/zh-cn/docs/)

## loader与plugins区别
### loader
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
### plugins
插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！

插件目的在于解决 loader 无法实现的其他事

### loader的分类

不同类型的loader加载时优先级不同，优先级顺序遵循：

前置 > 行内 > 普通 > 后置

pre: 前置loader

post: 后置loader

指定Rule.enforce的属性即可设置loader的种类，不设置默认为普通loader

### 在my-pack中添加loader的功能

通过配置loader和手写loader可以发现，其实webpack能支持loader，主要步骤如下：

1. 读取webpack.config.js配置文件的module.rules配置项，进行倒序迭代（rules的每项匹配规则按倒序匹配）
2. 根据正则匹配到对应的文件类型，同时再批量导入loader函数
3. 倒序迭代调用所有loader函数（loader的加载顺序从右到左，也是倒叙）
4. 最后返回处理后的代码

在实现my-pack的loader功能时，同样也可以在加载每个模块时，根据rules的正则来匹配是否满足条件，如果满足条件则加载对应的loader函数并迭代调用

depAnalyse()方法中获取到源码后，读取loader：

```js
let rules = this.config.module.rules
for (let i = rules.length - 1; i >= 0; i--) {
    // console.log(rules[i])
    let {test, use} = rules[i]
    if (test.test(modulePath)) {
        for (let j = use.length - 1; j >= 0; j--) {
            let loaderPath = path.join(this.root, use[j])
            let loader = require(loaderPath)
            source = loader(source)
        }
    }
}
```
