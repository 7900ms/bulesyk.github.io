function WTool() {

}
WTool.prototype = Array.prototype
WTool.addPrototype = function (prototype) {
    for (var key in prototype) {
        this.prototype[key] = prototype[key]
    }
}
WTool.addPrototype({
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
var w = (function () {
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