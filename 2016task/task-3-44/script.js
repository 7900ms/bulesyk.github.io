var imgsWapper = function (conf, imgs, id) {
    id = id ? '#' + id : '#imgs-wapper'
    var imgsLen = imgs.length
    while (imgsLen--) {
        imgs[imgsLen] = { url: imgs[imgsLen] }
    }
    conf.space = 0.5 * conf.space
    var vm = new Vue({
        el: id,
        data: {
            imgs: imgs,
            columns: conf.column,
            imgWapperStyle: {
                width: '100%',
            },
            columnStyle: {
                width: '',
                marginLeft: '',
                marginRight: ''
            },
            display: {
                clicked: false,
                url: ''
            },
            displayStyle: {
                minHeight: $(window).height() + 'px',
                lineHeight: $(window).height() + 'px'
            }
        },
        methods: {
            hide: function (e) {
                var e = e || window.event,
                    target = e.target || e.srcElement
                if (target.tagName.toLowerCase() !== 'img') {
                    this.display.clicked = false
                }
            }
        }
    })
    vm.columnStyle.width = ($(vm.$el).width() - conf.column * conf.space * 2) / conf.column + 'px'
    vm.columnStyle.marginRight = conf.space + 'px '
    vm.columnStyle.marginLeft = conf.space + 'px '
    function appendImg(imgURL) {
        var img = document.createElement('img')
        var div = document.createElement('div')
        div.className = 'img-wapper'
        img.src = imgURL
        img.style.margin = conf.space + 'px ' + '0';
        img.onload = function () {
            var columns = $(vm.$el).find('.columns'),
                min = columns[0]
            for (var i = 0, len = columns.length; i < len; i++) {
                if (columns[i].offsetHeight < min.offsetHeight) {
                    min = columns[i]
                }
            }
            div.appendChild(img)
            $(img).on('click', function (e) {
                vm.display.clicked = true
                vm.display.url = this.src
            })
            min.appendChild(div)
        }
    }
    var count = vm.imgs.length
    for (var i = 0; i < count; i++) {
        var wappers = appendImg(vm.imgs[i].url)
    }
}

$(document).ready(function () {
    var config = {
        conf: {
            space: 16,
            column: 4
        },
        imgs: [
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg10.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg9.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg8.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg7.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg6.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg5.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg4.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg3.jpg',
            'http://7xs725.com1.z0.glb.clouddn.com/testimg/timg2.jpg'
        ],
        addImg: function (imgUrl) {
            this.imgs.push(imgUrl)
        }
    }
    imgsWapper(config.conf, config.imgs)
})