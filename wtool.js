/**
 * Author:bulesyk
 */
function WTool() {
    /**
     * 定义Id,Class,innerHTML,value的输入输出
     */
    // this._defineProperties(['id', 'className', 'innerHTML', 'value'])
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
 * 一些内部函数
 */
WTool._addPrototype({
    /**
     * 重复动作
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
     * 重复动作
     * @param  {array} valueList 要设置的valueList
     */
    _defineProperties: function (valueList) {
        valueList.forEach(function (value) {
            Object.defineProperty(this, value, {
                get: function () {
                    return this[0][value]
                },
                set: function (params) {
                    this._uniqActive.call(this, value, params)
                }
            })
        }, this)
    }
})
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
                handle.call(e.target, e)
            }
        })
    }
})
/**
 * @param  {dom/string} selector DOM元素或者CSS选择器
 * @return {obj} tool WTool对象
 */
function w(selector) {
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
/**
 * wTool的实例
 */
w.prototype = new WTool()
/**
 * 文档结构加载完毕后执行函数
 * @param  {function} fn 文档加载后执行的函数
 */
w.ready = function (fn) {
    document.onreadystatechange = function () {
        if (document.readyState === 'interactive') {
            fn.call(document)
        }
    }
}
/**
 * @param  {obj} methods 添加的方法
 */
w._addMethods = function (method) {
    for (var key in method) {
        this[key] = method[key]
    }
}
/**
 * 新建元素
 */
w._addMethods({
    /**
     * @param  {obj} config 创建复杂元素
     * @return {obj} result WTool对象
     */
    create: function (config) {
        if (!config) return
        var result = new WTool()
        config.forEach(function (value) {
            for (var key in value) {
                var container = null
                container = document.createElement(key)
                for (let innerKey in value[key]) {
                    switch (innerKey) {
                        case 'id':
                        case 'className':
                        case 'value':
                        case 'innerHTML':
                            container[innerKey] = value[key][innerKey]
                            break
                        case 'container':
                            var innerContainer = this.create(value[key][innerKey])
                            innerContainer.forEach(function (value) {
                                container.appendChild(value)
                            })
                            break
                        default:

                    }
                }

            }
            result.push(container)
        }, this)
        return result
    },
    /**
     * @param  {string} tag 新建元素的标签名
     * @param  {obj} config 配置
     */
    createElem: function (tag, config) {
        if (!tag) return
        var result = document.createElement(tag)
        for (var key in config) {
            result.setAttribute(key, config[key])
        }
        return result
    },
    /**
     * @param  {obj} config 配置
     * @param  {number} count=1 数量
     */
    createElems: function (config, count = 1) {
        if (!config) return
        var result = new WTool()
        while (count--) {
            for (var key in config) {
                var elem = null
                elem = this.createElem(key, config[key])
                result.push(elem)
            }
        }
        return result
    }
})