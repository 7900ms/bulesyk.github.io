var root = document.getElementsByTagName('div')[0],
    searchText = document.getElementById('search-text'),
    search = document.getElementById('search'),
    deleteBtn = document.getElementById('delete'),
    insertText = document.getElementById('insert-text'),
    insertBtn = document.getElementById('insert'),
    handles = document.querySelectorAll('.handle'),
    list = [];
// 遍历
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
            document.querySelector('.clicked').style.removeProperty('background-color');
            document.querySelector('.clicked').classList.remove('clicked');
        }
        if (i === len) {
            alert('未找到选择元素!')
            return;
        }
        list[i].classList.add('clicked');
        list[i].classList.remove('hide');
        if (list[i].firstElementChild) {
            list[i].firstElementChild.classList.add('handle-hide');
            if (list[i].firstElementChild.innerHTML === "展开") {
                list[i].firstElementChild.innerHTML = "隐藏";
            }
        }
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
    newElem.style.marginLeft = '5%';
    newElem.innerHTML = value;
    if (!clickedElem.firstElementChild) {
        var newSpan = document.createElement('span');
        newSpan.innerHTML = "隐藏";
        newSpan.className = "handle-hide";
        clickedElem.appendChild(newSpan);
    }
    clickedElem.appendChild(newElem);
});
// 绑定click事件
(function divClick() {
    if (list.length === 0) {
        preOrder(root);
    }
    root.addEventListener('click', function(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === 'div') {
            if (document.querySelector('.clicked')) {
                document.querySelector('.clicked').classList.remove('clicked');
            }
            e.stopPropagation();
            target.classList.add('clicked');
        }
    });
})();
// 返回子元素
function children(node, tag) {
    var children = [];
    var childrens = node.getElementsByTagName(tag.toLowerCase());
    for (var i = 0, len = childrens.length; i < len; i++) {
        if (childrens[i].parentNode === node) {
            children.push(childrens[i]);
        }
    }
    return children;
}
// 折叠隐藏事件
(function handleEvent() {
    root.addEventListener('click', function(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === 'span') {
            target.innerHTML = target.innerHTML === "隐藏" ? "展开" : "隐藏";
            target.classList.toggle('handle-hide')
            var childrens = children(target.parentNode, 'div');
            for (var j = 0, l = childrens.length; j < l; j++) {
                childrens[j].classList.toggle('hide');
            }
        }
    });
})();