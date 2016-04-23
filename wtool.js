/**
 * Author:bulesyk
 */
function WTool() {
    /**
     * 定义Id,Class,innerHTML的输入输出
     */
    Object.defineProperties(this, {
        'id': {
            get: function () {
                return this[0].id
            },
            set: function (params) {
                this.uniqActive.call(this, 'id', params)
            }
        },
        'className': {
            get: function () {
                return this[0].className
            },
            set: function (params) {
                this.uniqActive.call(this, 'className', params)
            }
        },
        'innerHTML': {
            get: function () {
                return this[0].innerHTML
            },
            set: function (params) {
                this.uniqActive.call(this, 'innerHTML', params)
            }
        }
    })
}
/**
 * Array的实例
 */
WTool.prototype = new Array()
/**
 * @param  {obj} 要添加的prototype
 */
WTool.addPrototype = function (prototype) {
    for (var key in prototype) {
        this.prototype[key] = prototype[key]
    }
}
/**
 * 添加部分封装函数到原型
 */
WTool.addPrototype({
    /**
     * @param  {string} selector CSS选择器
     * @return {obj} WTool对象
     */
    w: function (selector) {
        var tool = new WTool()
        if (!selector || typeof selector !== 'string') return tool;
        var len = this.length
        while (len--) {
            var count = this[len].querySelectorAll(selector).length
            while (count--) {
                tool.unshift(this[len].querySelectorAll(selector)[count])
            }
        }
        tool = tool.uniqArray()
        return tool
    },
    /**
     * 数组去重
     */
    uniqArray: function () {
        var result = new WTool()
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i]) {
                result.push(this[i])
                for (var j = i + 1; j < len; j++) {
                    if (this[j] === this[i]) {
                        this.splice(j, 1, '')
                    }
                }
            }
        }
        return result
    },
    /**
     * 设置id,class,innerHTML的重复动作
     * @param  {string} name 重复动作的名称
     * @param  {string/array} content 输入的值
     */
    uniqActive: function (name, content) {
        if (typeof content === 'string') {
            this[0][name] = content
        } else if (Object.prototype.toString.call(content) === '[object Array]') {
            var len = this.length,
                count = content.length
            for (var i = 0; i < len; i++) {
                if (content[i]) {
                    this[i][name] = content[i]
                }
            }
        }
    },
    /**
     * 文档结构加载完毕后执行函数
     * @param  {function} fn 文档加载后执行的函数
     */
    ready:function (fn) {
        document.onreadystatechange = function () {
            if (document.readyState === 'interactive') {
                fn.call(document)
            }
        }
    }
})
var w = (function () {
    /**
     * @param  {dom/string} selector DOM元素或者CSS选择器
     * @return {obj} WTool对象
     */
    return function (selector) {
        var tool = new WTool()
        if (!selector) return tool;
        if (typeof selector !== 'string') {
            for (var i = 0, len = arguments.length; i < len; i++) {
                tool.push(arguments[i])
            }
        } else {
            var len = document.querySelectorAll(selector).length
            while (len--) {
                tool.unshift(document.querySelectorAll(selector)[len])
            }
        }
        return tool
    }
})()