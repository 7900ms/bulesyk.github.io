/* 移动动画
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
/* 数组去重
 *param: arr(arrObj) 需要去重的arr
 *return: arr(arrObj) 去重后的一个新的arr
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
//简化insertBefore
function insertBefore(elem, targetElem) {
    targetElem.parentNode.insertBefore(elem, targetElem);
};
//
//构建insertAfter
function insertAfter(elem, targetElem) {
    var parent = targetElem.parentNode;
    if (parent.lastChild === targetElem) {
        parent.appendChild(elem);
    } else {
        insertBefore(elem, targetElem.nextSilbing());
    };
};
//
