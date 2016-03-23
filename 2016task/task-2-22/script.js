var root = document.getElementsByTagName('div')[0],
    preBtn = document.getElementById('pre'),
    inBtn = document.getElementById('in'),
    postBtn = document.getElementById('post'),
    list = [];
function preOrder(elem) {
    if (elem) {
        list.push(elem);
        preOrder(elem.firstElementChild);
        preOrder(elem.lastElementChild);
    }
}
function inOrder(elem) {
    if (elem) {
        inOrder(elem.firstElementChild);
        list.push(elem);
        inOrder(elem.lastElementChild);
    }
}
function postOrder(elem) {
    if (elem) {
        inOrder(elem.firstElementChild);
        inOrder(elem.lastElementChild);
        list.push(elem);
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
    if (list[i-1]) {
        list[i-1].style.removeProperty('background-color');
    }
    list = [];
    preOrder(root);
    i = 0, len = list.length;
    autoChangeColor(list);
})
inBtn.addEventListener('click', function() {
    clearTimeout(setTimeoutId);
    if (list[i-1]) {
        list[i-1].style.removeProperty('background-color');
    }
    list = [];
    inOrder(root);
    i = 0, len = list.length;
    autoChangeColor(list);
})
postBtn.addEventListener('click', function() {
    clearTimeout(setTimeoutId);
    if (list[i-1]) {
        list[i-1].style.removeProperty('background-color');
    }
    list = [];
    postOrder(root);
    i = 0, len = list.length;
    autoChangeColor(list);
})