/* @移动动画
 * @para elemID(str) 需要移动的元素ID
 * @para finalX(number) 移动的最终X轴位置
 * @para finalY(number) 移动的最终Y轴位置
 * @oara startX(number) (可选) 默认为left:0 移动起点left的值
 * @para startY(number) (可选) 默认为top:0 移动起点top1的值
 * @para fps(number) (可选) 默认为30 不好解释,应该是动画移动的速度
 * @para interval(number) (可选) 默认为10 每次动画改变的间隔
 * @return true 动画完成后
 */
function animation(elemID, finalX, finalY, startX, startY, fps, interval) {
    var elem = document.getElementById(elemID);
    //设置默认的fps和interval
    fps = fps || 30;
    interval = interval || 10;
    startX = startX || 0;
    startY = startY || 0;
    //初始化位置
    elem.style.position = 'absolute';
    elem.parentNode.position = 'relative';
    elem.style.left = elem.style.left ? elem.style.left : startX;
    elem.style.top = elem.style.top ? elem.style.top : startY;
    clearTimeout(elem.rotation);
    (function move() {
        var left = parseInt(elem.style.left),
            top = parseInt(elem.style.top);
        //比较当前位置和最终位置
        if (left === finalX && top === finalY) {
            return true;
        };
        if (left < finalX) {
            left += Math.ceil((finalX - left) / fps);
        };

        if (left > finalX) {
            left -= Math.ceil((left - finalX) / fps);
        };
        if (top < finalY) {
            top += Math.ceil((finalY - top) / fps);
        };
        if (top > finalY) {
            top -= Math.ceil((top - finalY) / fps);
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
/* @数组去重
 * @para arr(arrObj) 需要去重的arr
 * @return arr(arrObj) 去重后的一个新的arr
 */
function uniqArray(arr) {
    var result = [],
        hash = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!hash[arr[i]]) {
            result.push(arr[i]);
            hash[arr[i]] = true;
        };
    };
    return result;
};
//
// @简化insertBefore
function insertBefore(elem, targetElem) {
    targetElem.parentNode.insertBefore(elem, targetElem);
};
//
// @构建insertAfter
function insertAfter(elem, targetElem) {
    var parent = targetElem.parentNode;
    if (parent.lastChild === targetElem) {
        parent.appendChild(elem);
    } else {
        insertBefore(elem, targetElem.nextSilbing());
    };
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
 * return elemObjList(用ID选择也是,只不过只有一个元素)
 */
function $(selecter) {
    var reg = /^(.+)\s(.+)$/g.exec(selecter), //代数选择判断
        idReg = /^(#[\w_\-]+)$/, //ID选择
        tagReg = /^([a-z]+)$/, //标签选择
        classReg = /^(\.[\w_\-]+)$/, //类名选择
        attrReg = /^([\w+]?)\[([\w_\-]+)(=['|"](.+)['|"])?\]$/; //属性值
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
        return document.querySelectorAll(para);
    } else {
        return $(reg[1])[0].querySelectorAll(reg[2]);
    };
};
