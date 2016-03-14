//绑定upload,noti,information hover事件
var setTimeoutId;

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




//@取消a的默认行为
function removeA() {
    var as = document.getElementsByTagName('a');
    for (var i = 0, len = as.length; i < len; i++) {
        as[i].onclick = function() {
            return false;
        };
    };
};
//提取建议
function perpareSuggestion(suggestion) {
    console.log(suggestion)
    if (!suggestion) {
        return;
    };
    $('#suggestion').innerHTML = '';
    var list = [];
    if (suggestion[0] === '没有记录') {
        for (var i = 0, len = suggestion.length; i < len; i++) {
            console.log(suggestion)
            list[i] = document.createElement('li');
            list[i].innerHTML =   'asd' ;
            console.log(list[i])
            $('#suggestion').appendChild(list[i]);
        }
    }

    // var reg = new RegExp('^' + $('#header-search').value, 'i');
    // for (var i = 0, len = suggestion.length; i < len; i++) {
    //     var letter = reg.exec(suggestion[i]);
    //     if (letter) {
    //         list[i] = document.createElement('li');
    //         list[i].innerHTML = '<span style="color:#e93030;">' + letter + '</span>' + RegExp.rightContext;
    //         $('#suggestion').appendChild(list[i]);
    //     }
    // }
}
window.onload = function() {
    removeA();
    addNotiClassEvent();
    addHandleEvent('#upload', 'flex');
    addHandleEvent('#noti', 'block');
    addHandleEvent('#information', 'block');
    addEvent($('#header-search'), 'focus', function() {
        // addEvent($('html'), 'keydown', keyDownEvent);
        ajax('http://bulesyk.github.io/suggest.json', {
            onsuccess: function(responseText) {
                $('#suggestion').style.display = 'block';
                console.log(responseText.history)
                perpareSuggestion(responseText.history);
                $('#suggestion').innerHTML = '';
            },
            onfail: function() {
                $('#suggestion').style.display = 'block';
                $('#suggestion').innerHTML = '没有找到记录!';
            }
        })
    });

}









// delegateEvent($('#suggestion'), 'li', 'click', clickEvent);
//
//
//
//
//
//
//
//
//
// function config() {}
// //鼠标点击事件
// function clickEvent(target) {
//     var choiceValue = target.firstChild.firstChild.nodeValue + target.lastChild.nodeValue;
//     $('#header-search').value = choiceValue;
// }
// //keydown事件
// var i;
//
// function keyDownEvent(e) {
//     console.log(e.keyCode, i, $('li').length);
//     e = e || window.event;
//     var list = $('li').length || 1;
//     if (e.keyCode === 40) {
//         if (i < list) {
//             removeClass($('.active'), 'active');
//             if ($('li').length) {
//                 i++;
//                 addClass($('li')[i - 1], 'active');
//                 console.log(i);
//             } else {
//                 i++;
//                 addClass($('li'), 'active');
//                 console.log(i);
//             }
//         }
//     } else if (e.keyCode === 38) {
//         if (i !== 1) {
//             removeClass($('.active'), 'active');
//             if ($('li').length) {
//                 i--;
//                 addClass($('li')[i - 1], 'active');
//                 console.log(i);
//             } else {
//                 i--;
//                 addClass($('li'), 'active');
//                 console.log(i);
//             }
//         }
//     } else if (e.keyCode === 13) {
//         $('#header-search').value = $('li')[i - 1].firstChild.firstChild.nodeValue + $('li')[i - 1].lastChild.nodeValue;
//     }
// }
// //提取建议
