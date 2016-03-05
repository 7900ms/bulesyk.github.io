var interval = document.getElementById('interval'),
    rotation = document.getElementById('rotation'),
    trueMove = document.getElementById('trueMove'),
    intervalID;
function autoMove(direct, rotation, interval) {
    //定义默认值
    interval = parseInt(interval)*1000 || 2000;
    var i = 0,
        j = -4000;
    clearInterval(intervalID);
    //正向循环
    function trueMove() {
        if (i >= -2400) {
            i -= 800;
            animation('imghoder', i, 0);
        } else {
            if (rotation) {
                i = 0;
                animation('imghoder', i, 0);
            } else {
                return false;
            };
        };
    };
    //反向循环
    function falseMove() {
        if (j <= -800) {
            j += 800;
            animation('imghoder', j, 0);
        } else {
            if (rotation) {
                j = -3200;
                animation('imghoder', j, 0);
            } else {
                return false;
            };
        };
    };
    if (direct) {
        intervalID = setInterval(trueMove, interval);
    }else {
        intervalID = setInterval(falseMove,interval);
    };
};
function getConfig() {
    return {
        interval: interval.value,
        rotation: rotation.checked,
        trueMove: trueMove.checked
    };
};
window.onload = function() {
    var btn = document.getElementById('btn');
    var c={};
    interval.value = '2秒';
    rotation.checked = true;
    trueMove.checked = true;
    btn.onclick = function() {
        c = getConfig();
        autoMove(c.trueMove,c.rotation,c.interval);
    };
    autoMove(getConfig().trueMove,getConfig().rotation);
};
