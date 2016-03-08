// @从tool.js中引入的需要的函数

/* @移动动画
 * @para elem(elemObj) 需要移动的元素
 * @para finalX(number) 移动的最终X轴位置
 * @para finalY(number) 移动的最终Y轴位置
 * @para constant(boolean) (可选) 默认为false 是否匀速移动
 * @para speed(number) (可选) 默认为10 匀速移动的速度
 * @oara startX(number) (可选) 默认为0 移动起点left的值
 * @para startY(number) (可选) 默认为0 移动起点top的值
 * @para fps(number) (可选) 默认为30 不好解释,应该是动画移动的速度
 * @para interval(number) (可选) 默认为10 每次动画改变的间隔
 * @return true 动画完成后
 */
function animation(elem, finalX, finalY, constant, speed, startX, startY, fps, interval) {
    //设置默认的fps和interval
    clearTimeout(elem.rotation);
    fps = fps || 30;
    interval = interval || 10;
    startX = startX || 0;
    startY = startY || 0;
    constant = constant || false;
    speed = speed || 5;
    //初始化位置
    elem.style.position = 'absolute';
    elem.parentNode.position = 'relative';
    elem.style.left = elem.style.left ? elem.style.left : startX;
    elem.style.top = elem.style.top ? elem.style.top : startY;
    (function move() {
        var left = parseInt(elem.style.left),
            top = parseInt(elem.style.top);
        //比较当前位置和最终位置
        if (left === finalX && top === finalY) {
            return true;
        };
        if (left < finalX) {
            if (constant) {
                left += speed;
            } else {
                left += Math.ceil((finalX - left) / fps);
            };
        };

        if (left > finalX) {
            if (constant) {
                left -= speed;
            } else {
                left -= Math.ceil((left - finalX) / fps);
            };
        };
        if (top < finalY) {
            if (constant) {
                top += speed;
            } else {
                top += Math.ceil((finalY - top) / fps);
            };
        };
        if (top > finalY) {
            if (constant) {
                top -= speed;
            } else {
                top -= Math.ceil((top - finalY) / fps);
            };
        };
        elem.style.left = left + 'px';
        elem.style.top = top + 'px';
        elem.rotation = setTimeout(move, interval);
    })();
};
//
/* @设置元素位置
 * @para elem(elemObj) 需要设置的元素
 * @para left(number) 相对于父元素left的位置(px)
 * @para top(number) 相对于父元素top的位置(px)
 * @return 无
 */
function setPos(elem, left, top) {
    elem.parentNode.style.position = 'relative';
    elem.style.position = 'absolute';
    elem.style.left = left + 'px';
    elem.style.top = top + 'px';
};
//
/* @给元素增加类名
 * @para elem(elemObj) 要添加的元素
 * @para className(str) 要添加的类名
 * @return 无
 */
function addClass(elem, className) {
    if (!elem.className) {
        elem.className = className;
    } else {
        elem.className += ' ';
        elem.className += className;
    };
};
//
/* @给元素去掉类名
 * @para elem(elemObj) 要取消的元素
 * @para className(str) 要取消的类名
 * @return 无
 */
function removeClass(elem, className) {
    var classNames = elem.className.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            classNames.splice(i, 1);
            break;
        };
    };
    elem.className = classNames.join(' ');
};
/* @mini$ 取消了之前练习中utils的写法,之前不让用querySelectorAll(),可以选择到第5代,用空格区分
 * @只有二代选择时会返回选择第一代中的第一个元素的后代选择列表,三代选择会返回第二代的第一个元素的后代选择列表
 * para selecter(str) 部分css选择器
 * return elemObjNodeList 如果只nodelist中只有一个elemObj,则返回elemObj
 */
function $(selecter) {
    var reg = /^(.+)\s(.+)$/g.exec(selecter), //代数选择判断
        idReg = /^(#[\w_\-]+)$/, //ID选择
        tagReg = /^([a-z]+)$/, //标签选择
        classReg = /^(\.[\w_\-]+)$/, //类名选择
        attrReg = /^([\w+]?)\[([\w_\-]+)(=['|"](.+)['|"])?\]$/, //属性值
        rootNode;
    if (!reg) {
        var para = {
            id: idReg.exec(selecter) ? idReg.exec(selecter)[1] : null,
            tag: tagReg.exec(selecter) ? tagReg.exec(selecter)[1] : null,
            class: classReg.exec(selecter) ? classReg.exec(selecter)[1] : null,
            attr: attrReg.exec(selecter) ? attrReg.exec(selecter)[0] : null
        };
        for (var key in para) {
            if (para[key]) {
                para = para[key];
                break;
            };
        };
        return document.querySelectorAll(para).length === 1 ? document.querySelectorAll(para)[0] : document.querySelectorAll(para);
    } else {
        if ($(reg[1]).length) {
            rootNode = $(reg[1])[0];
        } else {
            rootNode = $(reg[1]);
        }
        return rootNode.querySelectorAll(reg[2]);
    };
};
/* @事件代理
 * @para elem(elemObj) 要添加的事件的元素的父元素
 * @para tag(str) 要添加元素的标签名
 * @para event(str) 要添加的事件名
 * @para listener 监听函数
 * @return 无
 */
function delegateEvent(elem, tag, event, listener) {
    function parafn(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener(target);
        };
    };
    addEvent(elem, event, parafn);
};
//
/* @添加事件
 * @para elem(elemObj) 要添加的事件的元素
 * @para event(str) 要添加的事件名称
 * @para listener(fn) 触发事件后的监听函数
 * @return 无
 */
function addEvent(elem, event, listener) {
    if (elem.addEventListener) {
        elem.addEventListener(event, listener, false);
    } else {
        elem.attachEvent('on' + event, listener);
    };
};
/* @取消事件
 * @para elem(elemObj) 要取消的事件的元素
 * @para event(str) 要取消的事件名称
 * @para listener(fn) 要取消事件的监听函数
 * @return 无
 */
function removeEvent(elem, event, listener) {
    if (elem.removeEventListener) {
        elem.removeEventListener(event, listener);
    } else {
        elem.detachEvent('on' + event, listener);
    };
};
//
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
    $('#interval').value = '3秒';
    $('#rotation').checked = true;
    $('#trueMove').checked = true;
};
//获取配置
function getConfig() {
    return {
        interval: parseInt($('#interval').value) * 1000,
        rotation: $('#rotation').checked,
        trueMove: $('#trueMove').checked,
    };
};
//点击箭头的移动
function clickArrowMove(clickArrow) {
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
    removeClass($('.active'), 'active');
    removeClass($('.now'), 'now');
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

window.onload = function() {
    config();
    removeImg();
    addEvent($('#btn'), 'click', removeImg);
    delegateEvent($('#spanholder'), 'span', 'click', clickSpanMove);
    addEvent($('#right'), 'click', clickArrowMove);
    addEvent($('#left'), 'click', clickArrowMove);
};
