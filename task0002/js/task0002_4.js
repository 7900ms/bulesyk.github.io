//封装Ajax方法
function ajax(url, options) {
    var ajaxObj = new XMLHttpRequest();
    if (options.date) {
        url += '?';
        for (var key in options.date) {
            url += key + '=' + options.date[key] + '&';
        };
    };
    options.type = options.type || 'get';
    try {
        ajaxObj.open(options.type.toUpperCase(), url, true);
        ajaxObj.send();
    } catch (e) {
        console.log("连接出问题了!");
    }
    ajaxObj.onreadystatechange = function() {
        if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
            try {
                var responseText = JSON.parse(ajaxObj.responseText)
            } catch (e) {
                console.log('不是JSON数据');
            };
            options.onsuccess(responseText);
        }
        if (ajaxObj.status === 404) {
            if (options.onfail) {
                options.onfail(ajaxObj.status);
            } else {
                console.log('抱歉没找到资源');
            };
            ajaxObj.onreadystatechange = null;
        };
    };
};
//初始化配置
function config() {
    var suggestion = document.createElement('ul');
    suggestion.style.cssText = 'list-style-type:none;padding:0;margin:0;';
    suggestion.style.width = $('#search').offsetWidth - 2 + 'px';
    suggestion.setAttribute('id', 'suggestion');
    $('.container').appendChild(suggestion);
    setPos(suggestion, 0, 95);
}
//鼠标点击事件
function clickEvent(target) {
    var choiceValue = target.firstChild.firstChild.nodeValue + target.lastChild.nodeValue;
    $('#search').value = choiceValue;
}
//keydown事件
var i;
// 为了key的循环定义的全局变量
function keyDown(e) {
    e = e || window.event;
    //因为tool中$的原因,我的$如果只返回一个elem则它不是一个list
    var list = $('li').length || 1;
    if (e.keyCode === 40) {
        if (i < list) {
            removeClass($('.active'), 'active');
            if($('li').length) {
                i++;
                addClass($('li')[i-1], 'active');
            } else {
                i++;
                addClass($('li'),'active');
            }
        }
    } else if (e.keyCode === 38) {
        if (i !== 1) {
            removeClass($('.active'), 'active');
            if($('li').length) {
                i--;
                addClass($('li')[i-1], 'active');
            } else {
                i--;
                addClass($('li'),'active');
            }
        }
    } else if (e.keyCode === 13) {
        $('#search').value = $('li')[i - 1].firstChild.firstChild.nodeValue + $('li')[i - 1].lastChild.nodeValue;
    }
}
//提取建议
function perpareSuggestion(suggestion) {
    if (!suggestion) {
        return;
    };
    $('#suggestion').innerHTML = '';
    var list = [];
    var reg = new RegExp('^' + $('#search').value, 'i');
    for (var i = 0, len = suggestion.length; i < len; i++) {
        var letter = reg.exec(suggestion[i]);
        if (letter) {
            list[i] = document.createElement('li');
            list[i].innerHTML = '<span style="color:#e93030;">' + letter + '</span>' + RegExp.rightContext;
            $('#suggestion').appendChild(list[i]);
        }
    }
    $('#suggestion').style.border = '1px solid #ccc';
}
(function() {
    config();
    //绑定事件
    addEvent($('#search'), 'input', function() {
        i=0;
        ajax('http://bulesyk.github.io/suggest.json', {
            onsuccess: function(responseText) {
                if ($('#search').value) {
                    perpareSuggestion(responseText[$('#search').value[0]]);
                } else {
                    $('#suggestion').innerHTML = '';
                    $('#suggestion').style.border = 'none';
                }
            }
        })
    });
    addEvent($('#search'), 'focus', function() {
        addEvent($('html'), 'keydown', keyDown);
    });
    delegateEvent($('#suggestion'), 'li', 'click', clickEvent);
})();
