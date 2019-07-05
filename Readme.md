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