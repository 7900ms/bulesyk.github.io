var width = $('#imgholder').offsetWidth,
    height = $('#imgholder').offsetHeight,
    imgs = $('#imgholder img'),
    intervalId,rotationId=0;
//初始化配置
function config() {
    //动态写入标记元素
    (function elemConfig() {
        var bulid = {
            spanholder: document.createElement('div'),
            left: document.createElement('span'),
            right: document.createElement('span')
        };
        bulid.spanholder.setAttribute('id', 'spanholder');
        bulid.left.setAttribute('id', 'left');
        bulid.left.innerHTML = "&lt;";
        bulid.right.setAttribute('id', 'right');
        bulid.right.innerHTML = "&gt;";
        var spans = [];
        for (var i = 0, len = imgs.length; i < len; i++) {
            imgs[i].setAttribute('id', 'img-' + i);
            spans[i] = document.createElement('span');
            spans[i].setAttribute('id', 'span-' + i);
            bulid.spanholder.appendChild(spans[i]);
        };
        for (var key in bulid) {
            $('#imgholder').appendChild(bulid[key]);
        };
    })();
    addClass($('#img-0'), 'now');
    addClass($('#span-0'), 'active');
};
//获取配置
function getConfig() {
    return {
        interval: 3000,
        rotation: true,
        trueMove: true
    };
};
//点击箭头的移动
function clickArrowMove(clickArrow) {
    clearInterval(intervalId);
    var clickArrow = this;
    if (clickArrow.getAttribute('id') === 'right') {
        var imgIdn = parseInt($('.now').getAttribute('id').replace(/\D/g, ''));
        var nextId = imgIdn + 1 === imgs.length ? 0 : imgIdn + 1;
        moveImg(nextId, 1);
    } else {
        var imgIdn = $('.now').getAttribute('id').replace(/\D/g, '');
        var nextId = imgIdn - 1 === -1 ? imgs.length - 1 : imgIdn - 1;
        moveImg(nextId, -1);
    };
};
//获取配置移动图片
function removeImg() {
    clearInterval(intervalId);
    rotationId = 0;
    var conf = getConfig();
    console.log('获取配置',conf);
    intervalId = setInterval(function(){
        autoMove(conf.rotation, conf.trueMove);
    },conf.interval);
};
//点击小圆点图片的移动
function clickSpanMove(clickSpan) {
    clearInterval(intervalId);
    var spanIdn = clickSpan.getAttribute('id').replace(/\D/g, '');
    var imgIdn = $('.now').getAttribute('id').replace(/\D/g, '');
    if (spanIdn > imgIdn) {
        moveImg(spanIdn, 1)
    } else {
        moveImg(spanIdn, -1)
    };
};
//向左或向右移动图片
function moveImg(nextId, direct) {
    for (var i = 0, len = imgs.length; i < len; i++) {
        if (imgs[i].className === 'now') {
            continue;
        };
        setPos(imgs[i], direct * width, 0);
    };
    animation($('.now'), -direct * width, 0);
    $('.now').style.zIndex = '-1';
    removeClass($('#spanholder .active')[0], 'active');
    removeClass($('.now'), 'now');
    $('#img-' + nextId).style.zIndex = '0';
    animation($('#img-' + nextId), 0, 0);
    addClass($('#img-' + nextId), 'now');
    addClass($('#span-' + nextId), 'active');
};
//自动移动
function autoMove(rotation, direct) {
    rotationId++;
    console.log('循环第'+rotationId+'次')
    var imgIdn = parseInt($('.now').getAttribute('id').replace(/\D/g, ''));
    if (direct) {
        var nextId = imgIdn + 1 === imgs.length ? 0 : imgIdn + 1;
        if (rotation) {
            moveImg(nextId, 1);
        } else {
            moveImg(nextId, 1)
            if (rotationId === 5) {
                clearInterval(intervalId);
            };
        };
    } else {
        var imgIdn = $('.now').getAttribute('id').replace(/\D/g, '');
        var nextId = imgIdn - 1 === -1 ? imgs.length - 1 : imgIdn - 1;
        if (rotation) {
            moveImg(nextId, -1);
        } else {
            moveImg(nextId, -1)
            if (rotationId === 5) {
                clearInterval(intervalId);
            };
        };
    };
};
//
(function() {
    config();
    removeImg();
    addEvent($('#btn'), 'click', removeImg);
    delegateEvent($('#spanholder'), 'span', 'click', clickSpanMove);
    addEvent($('#right'), 'click', clickArrowMove);
    addEvent($('#left'), 'click', clickArrowMove);
})();
