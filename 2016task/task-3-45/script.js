var imgsWapper = (function () {
    var vm = new Vue({
        el: '#imgs-wapper',
        data: {
            imgs: [],
            nowImgStyle: {}
        },
        methods: {
            newImg: function (url, height, width) {
                return {
                    url: url,
                    style: {
                        width: width + 'px',
                        height: height + 'px'
                    }
                }
            },
            addImg: function (imgObj) {
                this.imgs.push(imgObj)
            },
            getImg: function (e) {
                this.nowImgStyle.width = e.target.width
                this.nowImgStyle.height = e.target.height
            }
        }
    })
    return vm
})()
$(document).ready(function () {
    var url = [
        "../../imgs/img14.jpg",
        "../../imgs/img13.jpg",
        "../../imgs/img12.jpg",
        "../../imgs/img11.jpg",
        "../../imgs/img10.jpg",
        "../../imgs/img9.jpg",
        "../../imgs/img8.jpg",
        "../../imgs/img7.jpg",
        "../../imgs/img14.jpg",
        "../../imgs/img13.jpg",
        "../../imgs/img12.jpg",
        "../../imgs/img11.jpg",
        "../../imgs/img10.jpg",
        "../../imgs/img9.jpg",
        "../../imgs/img8.jpg",
        "../../imgs/img7.jpg"
    ]
    var len = url.length;
    while (len--) {
        var img = imgsWapper.newImg(url[len],200)
        imgsWapper.addImg(img)
    }
})