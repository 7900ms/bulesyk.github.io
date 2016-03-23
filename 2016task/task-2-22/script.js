var root = document.getElementsByTagName('div')[0],
    preBtn = document.getElementById('pre'),
    postBtn = document.getElementById('post'),
    searchText = document.getElementById('search-text'),
    search = document.getElementById('search'),
    list = [];
function preOrder(elem) {
    if (elem) {
        list.push(elem);
        var elems = elem.querySelectorAll('div');
        for (var i = 0, len = elems.length; i < len; i++) {
            if (elems[i].parentNode === elem) {
                preOrder(elems[i]);
            }
        }
    }
}

// 自动改变颜色
var i, len, setTimeoutId;
function autoChangeColor(list) {
    if (list[i - 1]) {
        list[i - 1].style.removeProperty('background-color');
    }
    if (i === len) {
        return;
    }
    list[i].style.backgroundColor = '#0f0';
    i++;
    setTimeoutId = setTimeout(function() {
        autoChangeColor(list);
    }, 500);
}
preBtn.addEventListener('click', function() {
    clearTimeout(setTimeoutId);
    if (list[i - 1]) {
        list[i - 1].style.removeProperty('background-color');
    }
    list = [];
    preOrder(root);
    i = 0, len = list.length;
    autoChangeColor(list);
})
postBtn.addEventListener('click', function() {
    clearTimeout(setTimeoutId);
    if (list[i - 1]) {
        list[i - 1].style.removeProperty('background-color');
    }
    list.reverse();
    i = 0, len = list.length;
    autoChangeColor(list);
})
search.addEventListener('click', function(e) {
    clearTimeout(setTimeoutId);
    if (list[i - 1]) {
        list[i - 1].style.removeProperty('background-color');
    }
    list = [];
    preOrder(root);
    var text = searchText.value;
    i = 0, len = list.length;
    (function autoChangeColor() {
        if (list[i - 1]) {
            list[i - 1].style.removeProperty('background-color');
        }
        if (i === len) {
            alert('未找到选择元素!')
            return;
        }
        list[i].style.backgroundColor = '#0f0';
        if (list[i].firstChild.nodeValue.toLowerCase().replace(/^\s+|\s+$/g,'') == text.toLowerCase()) {
            list[i].style.backgroundColor = '#00f';
            return;
        }
        i++;
        setTimeoutId = setTimeout(function() {
            autoChangeColor(list);
        }, 500);
    })();
})