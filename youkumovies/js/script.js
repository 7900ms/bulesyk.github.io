//绑定upload,noti,information hover事件
var setTimeoutId, i;

function addHandleEvent(elemId, display) {
    addEvent($(elemId), 'mouseenter', function() {
        clearTimeout(setTimeoutId);
        removeClass($(elemId + '-message'), 'others');
        for (var i = 0, len = $('.others').length; i < len; i++) {
            $('.others')[i].style.display = 'none';
        }
        $(elemId + '-message').style.display = display;
    });
    addEvent($(elemId), 'mouseleave', function() {
        addClass($(elemId + '-message'), 'others');
        setTimeoutId = setTimeout(function() {
            $(elemId + '-message').style.display = 'none';
        }, 500);
    });
};
// 添加消息提示的点击不同样式
function addNotiClassEvent() {
    var button = $('#noti-message-class a');
    for (var i = 0, len = button.length; i < len; i++) {
        addEvent(button[i], 'click', function() {
            removeClass($('#noti-message-class .active')[0], 'active');
            addClass(this, 'active');
        });
    };
};
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




//提取建议
function perpareSuggestion(suggestion) {
    if (!suggestion) {
        return;
    };
    $('#suggestion').style.display = 'block';
    $('#suggestion').innerHTML = '';
    var list = [];
    var reg = new RegExp('^' + $('#header-search').value, 'i');
    for (var i = 0, len = suggestion.length; i < len; i++) {
        var letter = reg.exec(suggestion[i]);
        if (letter) {
            list[i] = document.createElement('li');
            list[i].innerHTML = '<span style="color:#e93030;">' + letter + '</span>' + RegExp.rightContext;
            $('#suggestion').appendChild(list[i]);
        }
    }
}
//鼠标点击获取值事件
function clickEvent(target) {
    var choiceValue = target.firstChild.firstChild.nodeValue + target.lastChild.nodeValue;
    $('#header-search').value = choiceValue;
}
//按键获取值事件
function keyDownEvent(e) {
    e = e || window.event;
    var list = $('#suggestion li').length || 1;
    if (e.keyCode === 40) {
        if (i < list) {
            e.preventDefault();
            removeClass($('.active'), 'active');
            if ($('#suggestion li').length) {
                i++;
                addClass($('#suggestion li')[i - 1], 'active');
            } else {
                i++;
                addClass($('#suggestion li'), 'active');
            };
        }
    } else if (e.keyCode === 38) {
        if (i !== 1) {
            e.preventDefault();
            removeClass($('.active'), 'active');
            if ($('#suggestion li').length) {
                i--;
                addClass($('#suggestion li')[i - 1], 'active');
            } else {
                i--;
                addClass($('#suggestion li'), 'active');
            };
        }
    } else if (e.keyCode === 13) {
        $('#header-search').value = $('#suggestion li')[i - 1].firstChild.firstChild.nodeValue + $('#suggestion li')[i - 1].lastChild.nodeValue;
    };
}

(function() {
    addNotiClassEvent();
    addHandleEvent('#upload', 'flex');
    addHandleEvent('#noti', 'block');
    addHandleEvent('#information', 'block');
    addEvent($('#header-search'), 'input', function(e) {
        i=0;
        ajax('http://bulesyk.github.io/suggest.json', {
            onsuccess: function(responseText) {
                if ($('#header-search').value) {
                    perpareSuggestion(responseText[$('#header-search').value[0]]);
                } else {
                    $('#suggestion').innerHTML = '';
                    $('#suggestion').style.border = 'none';
                }
            }
        })
    });
    // addEvent($('#header-search'),'click',function)
    addEvent($('#header-search'), 'focus', function(e) {
        addEvent($('html'), 'keydown', keyDownEvent);
    });
    delegateEvent($('#suggestion'), 'li', 'click', clickEvent);
})();
