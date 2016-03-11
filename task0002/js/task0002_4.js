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

function config() {
    var suggestion = document.createElement('ul');
    suggestion.style.cssText = 'list-style-type:none;padding:0;margin:0;';
    suggestion.style.width = $('#search').offsetWidth - 2 + 'px';
    suggestion.setAttribute('id', 'suggestion');
    $('.container').appendChild(suggestion);
    setPos(suggestion, 0, 95);
    delegateEvent($('#suggestion'),'li','click',function(target){
        var choiceValue = target.firstChild.firstChild.nodeValue + target.lastChild.nodeValue;
        $('#search').value = choiceValue;
    })
    addEvent($('#search'),'focus',function(){
        var i =0;
        addEvent($('html'),'keydown',function(e){
            e = e || window.event;
            if (e.keyCode === 40) {
                if (i<$('li').length) {
                    removeClass($('.active'),'active');
                    addClass($('li')[i],'active');
                    i++;
                }
            } else if (e.keyCode === 38) {
                if (i !==1 ){
                    i--;
                    removeClass($('.active'),'active');
                    addClass($('li')[i-1], 'active');
                }
            } else if (e.keyCode === 13) {
                $('#search').value = $('li')[i-1].firstChild.firstChild.nodeValue +$('li')[i-1].lastChild.nodeValue;
            }
        })
    })
}

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
window.onload = function() {
    config();
    addEvent($('#search'), 'input', function() {
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
};
