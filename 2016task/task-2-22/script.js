var root = document.getElementsByTagName('div')[0],
    preBtn = document.getElementById('pre'),
    postBtn = document.getElementById('post'),
    searchText = document.getElementById('search-text'),
    search = document.getElementById('search'),
    deleteBtn = document.getElementById('delete'),
    insertText = document.getElementById('insert-text'),
    insertBtn = document.getElementById('insert'),
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
// 绑定事件
preBtn.addEventListener('click', function() {
    clearTimeout(setTimeoutId);
    if (list[i - 1]) {
        list[i - 1].style.removeProperty('background-color');
    }
    if (document.querySelector('.clicked')) {
        document.querySelector('.clicked').classList.remove('clicked');
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
    if (document.querySelector('.clicked')) {
        document.querySelector('.clicked').classList.remove('clicked');
    }
    list.reverse();
    i = 0, len = list.length;
    autoChangeColor(list);
})
// 查找
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
        if (document.querySelector('.clicked')) {
            document.querySelector('.clicked').classList.remove('clicked');
        }
        if (i === len) {
            alert('未找到选择元素!')
            return;
        }
        list[i].classList.add('clicked');
        if (list[i].firstChild.nodeValue.toLowerCase().replace(/^\s+|\s+$/g, '') == text.toLowerCase()) {
            list[i].style.backgroundColor = '#00f';
            return;
        }
        i++;
        setTimeoutId = setTimeout(function() {
            autoChangeColor(list);
        }, 500);
    })();
});
// 删除元素
deleteBtn.addEventListener('click', function(e) {
    var clickedElem = document.querySelector('.clicked');
    clickedElem.parentNode.removeChild(clickedElem);
});
// 插入元素
insertBtn.addEventListener('click', function(e) {
    clearTimeout(setTimeoutId);
    if (list[i - 1]) {
        list[i - 1].style.removeProperty('background-color');
    }
    var value = insertText.value;
    var clickedElem = document.querySelector('.clicked');
    var newElem = document.createElement('div');
    if (!clickedElem) {
        alert("请选择元素!");
        return;
    }
    if (!value) {
        alert("请输入值!");
        return;
    }
    newElem.style.width = '50%';
    newElem.style.height = Math.floor(clickedElem.offsetHeight * 0.48) + 'px';
    newElem.innerHTML = value;
    clickedElem.appendChild(newElem);
});
// 绑定click事件
(function divClick() {
    if (list.length === 0) {
        preOrder(root);
    }
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener('click', function(e) {
            var e = e || window.event,
                target = e.target || e.srcElement;
            if (document.querySelector('.clicked')) {
                document.querySelector('.clicked').classList.remove('clicked');
            }
            target.classList.add('clicked');
        });
    }
})();