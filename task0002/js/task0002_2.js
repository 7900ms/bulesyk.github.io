var inputDate = document.getElementById('date');
var btn = document.getElementById('btn');
var result = document.getElementById('result');
//获取用户输入的值
function getValue() {
    var value = inputDate.value;
    value = /(\d{4})\-(\d{1,2})\-(\d{1,2})/g.exec(value);
    if (value) {
        var date = [value[1], value[2], value[3]];
        return date;
    } else {
        return null;
    }
}

function outputTime() {
    var rotation;
    btn.onclick = function() {
        var userTime = getValue();
        if (!userTime) {
            //判断用户有没有输入
            result.innerHTML = '你输入的正确日期呢?';
            return false;
        };
        //每次点击将取消之前的循环
        clearTimeout(rotation);
        (function setTime() {
            //重复获取时间的部分
            var nowDate = new Date();
            var userDate = new Date(userTime[0], userTime[1] - 1, userTime[2]);
            var sub = Math.floor((userDate.getTime() - nowDate.getTime()) / 1000);
            var T = {
                d: sub / (24 * 60 * 60),
                h: sub / (60 * 60) % 24,
                m: sub / 60 % 60,
                s: sub % 60
            };
            for (var key in T) {
                T[key] = Math.abs(Math.floor(T[key]));
            };
            if (!sub) {
                result.innerHTML = '时间到了啊!';
                return false;
            } else if (sub > 0) {
                var resultTime = '距离' + userTime[0] + '年' + userTime[1] + '月' + userTime[2] + '日还有' + T.d + '天' + T.h + '小时' + T.m + '分' + T.s + '秒';
            } else {
                var resultTime = '距离' + userTime[0] + '年' + userTime[1] + '月' + userTime[2] + '日已有' + T.d + '天' + T.h + '小时' + T.m + '分' + T.s + '秒';
            };
            result.innerHTML = resultTime;
            rotation = setTimeout(setTime, 1000);
        })();
    };
};


window.onload = function() {
    outputTime();
};
