/*
*param: (arr) 需要去重的arr
*return: (arr) 去重后的一个新的arr
*/
function uniqArray(arr) {
    var result = [],
        hash = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!hash[arr[i]]) {
            result.push(arr[i]);
            hash[arr[i]] = true;
        };
    };
    return result;
};
//
//简化insertBefore
function insertBefore(elem, targetElem) {
    targetElem.parentNode.insertBefore(elem, targetElem);
};
//
//构建insertAfter
function insertAfter(elem, targetElem) {
    var parent = targetElem.parentNode;
    if (parent.lastChild === targetElem) {
        parent.appendChild(elem);
    }
    else {
        insertBefore(elem,targetElem.nextSilbing());
    };
};
//
