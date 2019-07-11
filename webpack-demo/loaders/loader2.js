// 其实loader 就是一个函数
module.exports = function (source) {
    // loader处理完后需要把处理的结果返回
    console.log('我是loader2')
    return source.replace(/今天/g, this.query && this.query.name || '昨天')
}