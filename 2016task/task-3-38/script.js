/**
 * @param  {array} head 表格的头部信息
 * @param  {obj} content 表格的内容
 * @param  {obj} config 排序算法
 */
function Sort(head, content, config) {
    if (!head) return;
    var table = document.createElement('table'),
        tHead = document.createElement('thead'),
        tHeadTr = document.createElement('tr'),
        tBody = document.createElement('tbody')
    tHead.appendChild(tHeadTr)
    table.appendChild(tHead)
    table.appendChild(tBody)
    head.forEach(function (value, index, list) {
        var th = document.createElement('th')
        th.innerHTML = value
        tHead.appendChild(th)
    })
    for (var key in content) {
        var tr = document.createElement('tr'),
            td = document.createElement('td')
        td.innerHTML = key
        tr.appendChild(td)
        content[key].forEach(function (value) {
            var td = document.createElement('td')
            td.innerHTML = value
            tr.appendChild(td)
        })
        tBody.appendChild(tr)
    }
    this.container = table
}
/**
 * @param  {number} column 需要获取的列
 * @return {array} result 
 */
Sort.prototype.getColumn = function (column) {
    column = column - 1
    var result = []
    var trs = w(this).w('tbody').w('tr')
    trs.forEach(function (value, index, list) {
        var tds = w(value).w('td')
        if (tds[column]) {
            result.push(tds[column].innerHTML)
        } else {
            result.push(undefined)
        }
    })
    return result
}