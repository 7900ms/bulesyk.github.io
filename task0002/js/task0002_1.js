//创建初始段落
function createElem() {
    var result = document.createElement('p');
    var waring = document.createElement('p');
    var btn = document.getElementById('btn');
    result.setAttribute('id', 'result');
    waring.setAttribute('id', 'waring');
    document.body.appendChild(result);
    btn.parentNode.insertBefore(waring, btn);
}
//按钮的点击准备
function btnClick() {
    var btn = document.getElementById('btn');
    var result = document.getElementById('result');
    var waring = document.getElementById('waring');
    //获取爱好的列表
    function getValue() {
        var elem = document.getElementById('hobby');
        var result = elem.value.split(/\s|,|;|\u3001|\003B/g);
        result = uniqArray(result);
        for (var i = 0, len = result.length; i < len; i++) {
            if (result[i] === '') {
                result.splice(i, 1);
            };
        };
        return result;
    };
    btn.addEventListener('click', function(e) {
        var hobbylist = getValue();
        if (hobbylist.length === 0) {
            waring.innerHTML = '你输入了吗?';
            result.innerHTML = '';
        }
        else if (hobbylist.length > 10) {
            waring.innerHTML = '不要超过10个!!!';
            result.innerHTML = '';
        }
        else {
            waring.innerHTML = '';
            result.innerHTML = "你的爱好:";
            for (var i = 0, len = hobbylist.length; i < len; i++) {
                result.innerHTML += '<input type="checkbox">'+ '<label>' + hobbylist[i] + '</label>';
            };
        };
    });
};
window.onload = function() {
    createElem();
    btnClick();
}
