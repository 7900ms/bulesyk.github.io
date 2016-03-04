var inputDate = document.getElementById('date');
var btn = document.getElementById('btn');
var result = document.getElementById('result');
//获取用户输入的值
function getValue() {
    var value = inputDate.value;
    value = /(\d{4})\-(\d{1,2})\-(\d{1,2})/g.exec(value);
    if (value) {
        var date = [value[1], value[2], value[3]];
    } else {
        result.innerHTML = result.innerHTML = '你输错了';
    }
    return date;
}

function outputTime() {
    btn.onclick = function() {
        function setTime() {
            var nowDate = new Date();
            var date = getValue();
            if (date) {
                var userDate = new Date(date[0], date[1] - 1, date[2]);
                //获得秒数
                var sub = Math.floor((userDate.getTime() - nowDate.getTime()) / 1000);
                if (!sub) {
                    result.innerHTML = "时间到了啊!";
                    return false;
                };
                var D = Math.floor(sub / (24 * 60 * 60)),
                    H = Math.floor(sub / (60 * 60) % 24),
                    M = Math.floor(sub / 60 % 60),
                    S = Math.floor(sub % 60);
                if (sub > 0) {
                    //如果输入日期大于当前日期
                    var resultTime = '距离' + date[0] + '年' + date[1] + '月' + date[2] + '日还有' + D + '天' + H + '小时' + M + '分' + S + '秒';
                };
                if (sub < 0) {
                    //如果输入日期小于当前日期
                    sub = Math.abs(sub);
                    D = Math.floor(sub / (24 * 60 * 60));
                    H = Math.floor(sub / (60 * 60) % 24);
                    M = Math.floor(sub / 60 % 60);
                    S = Math.floor(sub % 60);
                    resultTime = '距离' + date[0] + '年' + date[1] + '月' + date[2] + '日已有' + D + '天' + H + '小时' + M + '分' + S + '秒';
                };
                result.innerHTML = resultTime;
                //循环
                var timeChange = setTimeout(setTime, 1000);
            } else {
                result.innerHTML = '你输错了';
            };
        };
        setTime();
    };
};


window.onload = function() {
    outputTime();
};
