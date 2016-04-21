/**
 * @param  {obj} config
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
    float.yes.addEventListener('click',function (e) {
        elem.value = true
        elem.hide()
        config.methods.yes.call(elem.container)
    })
    float.no.addEventListener('click',function (e) {
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
        document.addEventListener('click',function (e) {
            if (!elem.wapper.contains(e.target)) {
                elem.hide()
            }
        })
        document.onmousewheel = function (e) {
            e.preventDefault()
        }
    },
    hide: function () {
        this.container.classList.add('hide')
        document.onmousewheel = null
    }
}