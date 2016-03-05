var interval = document.getElementById('interval'),
    rotation = document.getElementById('rotation'),
    trueMove = document.getElementById('trueMove'),
    spanList = document.getElementsByTagName('span'),
    imghoder = document.getElementById('imghoder'),
    intervalID;

//初始化图片位置函数
function resetPos(ElemID, posX, posY) {
    var elem = document.getElementById(ElemID);
    elem.style.position = 'absolute';
    elem.style.left = posX + 'px';
    elem.style.top = posY + 'px';
};
function autoMove(direct, rotation, interval) {
    //定义默认值
    interval = parseInt(interval) * 1000 || 2000;
    var list = [],
        imgs = imghoder.getElementsByTagName('img');
    for (var i = 0, len = imgs.length; i < len; i++) {
        imgs[i].setAttribute('id', i + 1);
        list[list.length] = imgs[i].getAttribute('id');
    };
    //循环部分
    function imgRotation() {
        if (direct) {
            list = [list[1], list[2], list[3], list[4], list[0]];
            if (!rotation) {
                if (list[0] === '5') {
                    clearInterval(intervalID);
                };
            };
            resetPos(list[3], -800, 0);
            resetPos(list[4], 0, 0);
            resetPos(list[0], 800, 0);
            animation(list[4], -800, 0);
            animation(list[0], 0, 0);
            document.getElementById(list[0]).style.zIndex = '2';
            span(list[0]);
        } else {
            list = [list[4], list[0], list[1], list[2], list[3]];
            if (!rotation) {
                if (list[1] === '3') {
                    clearInterval(intervalID);
                };
            };
            resetPos(list[0], -800, 0);
            resetPos(list[1], 0, 0);
            resetPos(list[2], 800, 0);
            animation(list[1], 800, 0);
            document.getElementById(list[0]).style.zIndex = '2';
            animation(list[0], 0, 0);
            span(list[0]);
        };
    };
    intervalID = setInterval(imgRotation, interval);
};
//获取配置
function getConfig() {
    //初始化span参数
    for (var i = 0, len = spanList.length; i < len; i++) {
        spanList[i].setAttribute('id', i + 1 + 'span');
    };
    spanList[0].className = 'active';
    //返回用户配置
    return {
        interval: interval.value,
        rotation: rotation.checked,
        trueMove: trueMove.checked
    };
};
//关联小圆点
function span(imgID) {
    for (var i = 0, len = spanList.length; i < len; i++) {
        if (parseInt(imgID) === parseInt(spanList[i].getAttribute('id'))) {
            spanList[i].className = 'active';
        } else {
            spanList[i].className = '';
        }
    };
};
//点击小圆点
function spanClick() {
    var imgs = imghoder.getElementsByTagName('img');
    for (var j=0,l=spanList.length;j<l;j++) {
        spanList[j].onclick = function () {
            clearInterval(intervalID);
            for (var i=0,len=imgs.length;i<len;i++) {
                resetPos((i+1).toString(),800,0);
                document.getElementById(i+1).style.zIndex = '0';
            };
            var paraID = parseInt(this.getAttribute('id'));
            var thisElem = document.getElementById(paraID);
            thisElem.style.zIndex = '1';
            var lastImgID = paraID-1?paraID-1:5
            resetPos(lastImgID, 0, 0);
            animation(lastImgID,-800,0)
            animation(paraID,0,0);
            span(paraID);
        };
    };
};


window.onload = function() {
    var btn = document.getElementById('btn');
    var c = {};
    interval.value = '2秒';
    rotation.checked = true;
    trueMove.checked = true;
    btn.onclick = function() {
        clearInterval(intervalID);
        c = getConfig();
        autoMove(c.trueMove, c.rotation, c.interval);
    };
    getConfig();
    spanClick();
    autoMove(getConfig().trueMove, getConfig().rotation);
};
