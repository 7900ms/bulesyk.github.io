/**
 * @param  {obj} config
 * @config {
            id: 'test',
            title: '这是一个测试',
            content: '这是测试的内容吗?',
            yes: '正确',
            no: '错误',
            methods: {
                yes:function(){
                    alert('正确')
                },
                no:function(){
                    alert('错误')
                }
            }
        }
 * @generate {obj}
 */
function Float(config) {
    var vpWidth = window.innerWidth,
        vpHeight = window.innerHeight
    var float = {
        container: document.createElement('div'),
        wapper: document.createElement('div'),
        title: document.createElement('h1'),
        content: document.createElement('p'),
        yes: document.createElement('button'),
        no: document.createElement('button')
    }
    var elem = this
    float.wapper.addEventListener('mousedown', function (e) {
        if (e.target !== float.title) return;
        this.style.top = this.offsetTop + 'px'
        this.style.left = this.offsetLeft + 'px'
        this.style.position = 'absolute'
        var elem = this,
            top = e.clientY - this.offsetTop,
            left = e.clientX - this.offsetLeft
        this.move = function (e) {
            elem.style.top = e.clientY - top + 'px'
            elem.style.left = e.clientX - left + 'px'
        }
        float.container.addEventListener('mousemove', this.move)
    })
    float.wapper.addEventListener('mouseup', function (e) {
        float.container.removeEventListener('mousemove', this.move)
    })
    float.yes.addEventListener('click', function (e) {
        elem.value = true
        elem.hide()
        config.methods.yes.call(elem.container)
    })
    float.no.addEventListener('click', function (e) {
        elem.value = false
        elem.hide()
        config.methods.no.call(elem.container)
    })
    float.container.id = config.id
    float.container.className = 'hide'
    float.container.style.width = vpWidth + 'px'
    float.container.style.height = vpHeight + 'px'
    float.container.style.lineHeight = float.container.style.height
    for (var key in float) {
        this[key] = float[key]
        if (key === 'container' || key === 'wapper' || key === 'methods') continue;
        float[key].innerHTML = config[key]
        float['wapper'].appendChild(float[key])
    }
    float.container.appendChild(float.wapper)
}
Float.prototype = {
    display: function () {
        this.container.classList.remove('hide')
        var elem = this
        document.addEventListener('mousedown', function (e) {
            if (!elem.wapper.contains(e.target)) {
                elem.hide()
            }
        })
    },
    hide: function () {
        this.container.classList.add('hide')
    }
}