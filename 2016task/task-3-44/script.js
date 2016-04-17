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
                Height: $(window).height() + 'px',
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
    return {
        vm: vm,
        appendImg: appendImg
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
    var imgs = imgsWapper(config.conf, config.imgs)
    var vm = new Vue({
        el: '#more',
        data: {
            more: {
                text: "下拉加载更多",
                imgLine: 0
            }
        },
        methods: {
            getMoreImgs: function (e) {
                var vpH = $(window).height()
                var dH = $(document).height()
                if (e.pageY >= (dH - vpH) && e.pageY <= dH) {
                    var ajax = new XMLHttpRequest()
                    this.more.imgLine++
                    var url = "http://bulesyk.github.io/imgsUrl" + this.more.imgLine + ".json"
                    ajax.open("GET", url)
                    ajax.send()
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState === 4 && ajax.status === 200) {
                            var imgsUrl = JSON.parse(ajax.responseText)
                            var list = []
                            for (var key in imgsUrl) {
                                list.push(imgsUrl[key])
                            }
                            var len = list.length
                            while (len--) {
                                var count = list[len].length
                                while (count--) {
                                    imgs.appendImg(list[len][count])
                                }
                            }
                        } if (ajax.status > 400) {
                            vm.more.text = "没有更多了"
                            document.removeEventListener('mousewheel',vm.getMoreImgs)
                        }
                    }
                }
            }
        }
    })
    document.addEventListener('mousewheel', vm.getMoreImgs)
})