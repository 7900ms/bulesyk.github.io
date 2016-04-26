/**
 * 
 */
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
                this._uniqActive.call(this, 'id', params)
            }
        },
        'className': {
            get: function () {
                return this[0].className
            },
            set: function (params) {
                this._uniqActive.call(this, 'className', params)
            }
        },
        'innerHTML': {
            get: function () {
                return this[0].innerHTML
            },
            set: function (params) {
                this._uniqActive.call(this, 'innerHTML', params)
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
WTool._addPrototype = function (prototype) {
    for (var key in prototype) {
        this.prototype[key] = prototype[key]
    }
}
/**
 * 添加部分封装函数到原型
 */
WTool._addPrototype({
    /**
     * @param  {string} selector CSS选择器
     * @return {obj} tool WTool对象
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
    _uniqActive: function (name, content) {
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
    ready: function (fn) {
        document.onreadystatechange = function () {
            if (document.readyState === 'interactive') {
                fn.call(document)
            }
        }
    }
})
/**
 * 关于类名的封装
 */
WTool._addPrototype({
    /**
     * @param  {string} className 要判断的类名
     * @return {boolean} result true/false
     */
    hasClass: function (className) {
        if (typeof className !== 'string') return
        var len = this.length,
            result = false
        while (len--) {
            var classNames = this[len].className.replace(/^\s+|\s+$/g, '').split(/\s+/)
            var count = classNames.length
            while (count--) {
                if (className === classNames[count]) {
                    result = true
                }
            }
        }
        return result
    },
    /**
     * @param  {string} className 要添加的类名
     * @return {obj} this 添加后的对象
     */
    addClass: function (className) {
        if (typeof className !== 'string') return
        var len = this.length
        while (len--) {
            if (!w(this[len]).hasClass(className)) {
                if (!this[len].className) {
                    this[len].className = className
                } else {
                    this[len].className = this[len].className.replace(/^\s+|\s+$/g, '') + ' ' + className
                }
            }
        }
        return this
    },
    /**
     * @param  {string} className 要删除的类名
     * @return {obj} this 删除后的对象
     */
    removeClass: function (className) {
        if (typeof className !== 'string') return
        var len = this.length
        while (len--) {
            if (w(this[len]).hasClass(className)) {
                var classNames = this[len].className.replace(/^\s+|\s+$/g, '').split(/\s+/)
                classNames.forEach(function (value, index, list) {
                    if (value === className) {
                        list.splice(index, 1)
                    }
                })
                this[len].className = classNames.join(' ')
            }
        }
        return this
    },
    /**
     * @param  {string} className 要添加/删除的类名
     * @return {obj} this 添加/删除后的对象
     */
    toggleClass: function (className) {
        if (typeof className !== 'string') return
        var len = this.length
        while (len--) {
            if (w(this[len]).hasClass(className)) {
                w(this[len]).removeClass(className)
            } else {
                w(this[len]).addClass(className)
            }
        }
        return this
    }
})
/**
 * 关于事件的封装
 */
WTool._addPrototype({
    /**
     * @param  {string} event 传入的事件类型
     * @param  {function} handle 传入的事件监听函数
     */
    addEvent: function (event, handle) {
        if (!event || !handle) return
        this.forEach(function (value) {
            value.addEventListener.call(value, event, handle)
        })
    },
    /**
     * @param  {string} event 需要取消的的事件类型
     * @param  {function} handle 取消的事件监听函数
     */
    removeEvent: function (event, handle) {
        if (!event || !handle) return
        this.forEach(function (value) {
            value.removeEventListener.call(value, event, handle)
        })
    },
    /**
     * @param  {string} tag 传入的监听标签名
     * @param  {string} event 传入的事件类型
     * @param  {function} handle 传入的事件监听函数
     */
    delegateEvent: function (tag, event, handle) {
        if (!event || !handle || !tag) return
        this.addEvent(event, function (e) {
            if (e.target.tagName.toLowerCase() === tag) {
                handle.call(e.target,e)
            }
        })
    }
})
var w = (function () {
    /**
     * @param  {dom/string} selector DOM元素或者CSS选择器
     * @return {obj} tool WTool对象
     */
    return function (selector) {
        var tool = new WTool()
        if (!selector) return tool
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