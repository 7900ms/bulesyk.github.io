/**
 * @param  {number} column 需要获取的列
 * @return {array} result 
 */
Sort.prototype.getColumnValue = function (column, content) {
    column = column - 1
    var result = []
    for (var key in content) {
        content[key].unshift(key)
        content[key].forEach(function (value, index, list) {
            if (index === column) {
                result.push({
                    sort: value,
                    obj: list
                })
            }
        })
    }
    return result
}
/**
 * @param  {number} column 需要设置的列
 */
Sort.prototype.setColumnValue = function (column, values) {
    column = column - 1
    var trs = w(this).w('tbody').w('tr')
    trs.forEach(function (value, index, list) {
        var tds = w(value).w('td')
        if (tds[column]) {
            tds[column].innerHTML = values[index]
        }
    })
}
/**
 * @param  {obj} content 传入的内容
 */
Sort.prototype.setContent = function (content, len) {
    this.innerHTML = ''
    for (var key in content) {
        var tr = document.createElement('tr'),
            td = document.createElement('td')
        td.innerHTML = key
        tr.appendChild(td)
        for (var i = 0; i < len - 1; i++) {
            if (!content[key][i]) {
                content[key][i] = ''
            }
            var td = document.createElement('td')
            td.innerHTML = content[key][i]
            tr.appendChild(td)
        }
        this.appendChild(tr)
    }
}
/**
 * @param  {obj} elem 传入的i
 * @return {number} result 所在的列数
 */
Sort.prototype.getIColumn = function (elem) {
    var th = elem.parentNode
    var tr = th.parentNode
    var result
    w(tr).w('th').forEach(function (value, index, list) {
        if (value === th) {
            result = index + 1
        }
    })
    return result
}
/**
 * @param  {string} id 表格的ID
 * @param  {array} head 表格的头部信息
 * @param  {obj} content 表格的内容
 * @param  {obj} config 排序算法
 */
function Sort(id, head, content, config) {
    if (!head) return;
    if (!config) {
        var sortFnTop = function (a, b) {
            return a.sort - b.sort
        }
        var sortFnBottom = function (a, b) {
            return b.sort - a.sort
        }
    } else {
        var sortFnTop = config.sortFnTop || function (a, b) {
            return a.sort - b.sort
        }
        var sortFnBottom = config.sortFnBottom || function (a, b) {
            return b.sort - a.sort
        }
    }
    var table = document.createElement('table'),
        tHead = document.createElement('thead'),
        tHeadTr = document.createElement('tr'),
        tBody = document.createElement('tbody')
    var tool = this
    var itemsLen = head.length
    table.id = id
    tHead.appendChild(tHeadTr)
    table.appendChild(tHead)
    table.appendChild(tBody)
    head.forEach(function (value, index, list) {
        var th = document.createElement('th'),
            sortBtnTop = document.createElement('i'),
            sortBtnBottom = document.createElement('i')
        th.innerHTML = value
        tHead.appendChild(th)
        sortBtnTop.className = 'top-btn'
        sortBtnTop.addEventListener('click', function (e) {
            w('i').removeClass('active')
            w(this).addClass('active')
            var list = tool.getColumnValue(tool.getIColumn(this), content)
            list.sort(sortFnTop)
            var newContent = {}
            list.forEach(function (value) {
                var swap = value.obj.slice(1, value.obj.length)
                newContent[value.obj[0]] = swap
            })
            tool.setContent.call(tBody, newContent, itemsLen)
            content = newContent
        })
        sortBtnBottom.className = 'bottom-btn'
        sortBtnBottom.addEventListener('click', function (e) {
            w('i').removeClass('active')
            w(this).addClass('active')
            var list = tool.getColumnValue(tool.getIColumn(this), content)
            list.sort(sortFnBottom)
            var newContent = {}
            list.forEach(function (value) {
                var swap = value.obj.slice(1, value.obj.length)
                newContent[value.obj[0]] = swap
            })
            tool.setContent.call(tBody, newContent, itemsLen)
            content = newContent
        })
        th.appendChild(sortBtnTop)
        th.appendChild(sortBtnBottom)
    })
    this.setContent.call(tBody, content, itemsLen)
    this.container = table
}