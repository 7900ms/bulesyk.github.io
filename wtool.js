/**
 * Author:bulesyk
 */
function WTool() {
    /**
     * 定义Id,Class,innerHTML,value的输入输出
     */
    this._defineProperties(['id', 'className', 'innerHTML', 'value'])
}
/**
 * Array的实例
 */
WTool.prototype = new Array()
/**
 * @param  {obj} 要添加的prototype
 */
WTool._addPrototype = function (prototype) {
    for (let key in prototype) {
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
            for (let i = 0; i < len; i++) {
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
        tool = tool.uniqArrayay()
        return tool
    },
    /**
     * 数组去重
     */
    uniqArrayay: function () {
        var result = new WTool()
        for (let i = 0, len = this.length; i < len; i++) {
            if (this[i]) {
                result.push(this[i])
                for (let j = i + 1; j < len; j++) {
                    if (this[j] === this[i]) {
                        this.splice(j, 1, '')
                    }
                }
            }
        }
        return result
    },
    /**
     * @param  {string} input
     */
    setSelectValue: function (input) {
        var list = Array.from(w(this[0]).w('option'))
        list.forEach(function (value) {
            if (value.value == input) {
                value.selected = true
            } else {
                value.selected = false
            }
        })
    }
})
/**
 * 关于类名的封装
 */
WTool._addPrototype({
    /**
     * 判断WTool中有没有所给类名
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
     * 添加类名,如果存在就不添加
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
     * 删除类名,如果不存在就不删除
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
     * 添加删除类名,如果存在就删除,如果不存在就添加
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
     * 为WTool中的所有元素添加事件
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
     * 为WTool中的所有元素删除事件
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
        this['delegateEvent' + handle.name] = function (e) {
            if (e.target.tagName.toLowerCase() === tag.toLowerCase()) {
                handle.call(e.target, e)
            }
        }
        this.addEvent(event, this['delegateEvent' + handle.name])
    },
    /**
     * @param  {string} tag 标签
     * @param  {string} event 事件类型
     * @param  {function} handle 要取消的监听函数
     */
    removeDelegateEvent: function (tag, event, handle) {
        this.removeEvent(event, this['delegateEvent' + handle.name])
    }
})
/**
 * 关于位置的封装
 */
WTool._addPrototype({
    getPos: function () {
        var elem = this[0]

    }
})
/**
 * 传入css选择器使用querySelAll返回一个WTool对象,传入dom元素返回WTool对象,可以传入多个dom对象
 * @param  {dom/string} selector DOM元素或者CSS选择器
 * @return {obj} tool WTool对象
 */
function w(selector) {
    var tool = new WTool()
    if (!selector) return tool
    if (w.is(selector, 'array')) {
        for (let i = 0, len = selector.length; i < len; i++) {
            tool.push(selector[i])
        }
    } else if (typeof selector !== 'string') {
        for (let i = 0, len = arguments.length; i < len; i++) {
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
    for (let key in method) {
        this[key] = method[key]
    }
}
/**
 * 新建元素
 */
w._addMethods({
    /**
     * 创建复杂的复合对象
     * @param  {obj} config 配置
     * @return {obj} result WTool对象
     */
    create: function (config) {
        if (!config) return
        var result = new WTool()
        config.forEach(function (value) {
            for (let key in value) {
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
     * 新建DOM元素
     * @param  {string} tag 新建元素的标签名
     * @param  {obj} config 配置,使用setArrribute创建
     * @return {obj} result DOM元素
     */
    createElem: function (tag, config) {
        if (!tag) return
        var result = document.createElement(tag)
        for (let key in config) {
            result.setAttribute(key, config[key])
        }
        return result
    },
    /**
     * 创建多个元素
     * @param  {obj} config 配置,,使用setArrribute创建
     * @param  {number} count=1 数量
     * @return {obj} result WTool对象
     */
    createElems: function (config, count = 1) {
        if (!config) return
        var result = new WTool()
        while (count--) {
            for (let key in config) {
                var elem = null
                elem = this.createElem(key, config[key])
                result.push(elem)
            }
        }
        return result
    }
})
/**
 * 常用函数
 */
w._addMethods({
    /**
     * @param  {obj} obj 需要判断的对象
     * @param  {string} type 需要判断的类型
     * @return {boolean} true/false
     */
    is: function (obj, type) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type.toLowerCase()
    },
    /**
     * @param  {obj} obj 要复制的obj
     * @return {obj} result 复制后的obj
     */
    cloneObj: function (obj) {
        var result = {}
        if (this.is(obj, 'array')) {
            return obj.slice()
        } else {
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    result[key] = this.cloneObj(obj[key])
                } else {
                    result[key] = obj[key]
                }
            }
        }
        return result
    }
})