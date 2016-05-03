function Calendar(id, config) {
    var container = document.createElement('div'),
        title = document.createElement('div'),
        table = document.createElement('table'),
        tHead = document.createElement('thead'),
        tBody = document.createElement('tbody'),
        year = document.createElement('select'),
        month = document.createElement('select'),
        leftArrow = document.createElement('i'),
        rightArrow = document.createElement('i')
    container.id = id
    w(leftArrow).addClass('left-arrow')
    w(rightArrow).addClass('right-arrow')
    container.appendChild(title)
    title.appendChild(leftArrow)
    title.appendChild(year)
    title.appendChild(month)
    title.appendChild(rightArrow)
    container.appendChild(table)
    table.appendChild(tHead)
    table.appendChild(tBody)
    var tool = this
    /**
     * 创建头部
     */
    var tHeadTr = (function () {
        var tr = document.createElement('tr')
        var ths = ["一", "二", "三", "四", "五", "六", "日"]
        ths.forEach(function (value) {
            var th = document.createElement('th')
            th.innerHTML = value
            tr.appendChild(th)
        })
        return tr
    })()
    tHead.appendChild(tHeadTr)
    // 创建年
    var years = {}
    var months = this.generateArray(1, 12)
    for (var i = config.year.start; i <= config.year.end; i++) {
        let year = {}
        if (i % 4 === 0 && i % 100 !== 0) {
            year.days = 366
        } else {
            year.days = 365
        }
        months.forEach(function (value, index, list) {
            index++
            switch (index) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    var m31 = tool.generateArray(1, 31)
                    year[index] = m31
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    var m30 = tool.generateArray(1, 30)
                    year[index] = m30
                    break
                case 2:
                    if (year.days === 365) {
                        year[index] = tool.generateArray(1, 28)
                    } else {
                        year[index] = tool.generateArray(1, 29)
                    }
                    break
            }
        })
        years[i] = year
    }
    this.years = years
    this.tBody = tBody
    // 设置年月
    months.forEach(function (value) {
        var option = document.createElement('option')
        option.innerHTML = value + '月'
        option.value = value
        month.appendChild(option)
    })
    for (let key in years) {
        var option = document.createElement('option')
        option.innerHTML = key + '年'
        option.value = key
        year.appendChild(option)
    }
    w(year).addEvent('change', function (e) {
        var choice = this.value
        tool.generateContent(choice, month.value)
    })
    w(month).addEvent('change', function (e) {
        var choice = this.value
        tool.generateContent(year.value, choice)
    })
    // 设置现在的日期
    var date = new Date()
    var week = date.getDay()
    this.setValue(year, date.getFullYear())
    this.setValue(month, date.getMonth() + 1)
    month.dispatchEvent(new Event('change'))
    w(w(tBody).w('td')[7-week+date.getDate()]).addClass('active')
    w(tBody).delegateEvent('td', 'click', function (e) {
        if (this.innerHTML) {
            w(tool.tBody).w('.active').removeClass('active')
            w(this).addClass('active')
            tool.selectDay = year.value + '年' + month.value + '月' + this.innerHTML + '日'
            config.clicked.call(tool)
        }
    })
    // 箭头的事件
    w(container).w('i').addEvent('click', function (e) {
        var selectYear = year.value
        var selectMonth = month.value
        if (w(this).hasClass('left-arrow')) {
            selectMonth--
            if (selectMonth === 0) {
                selectMonth = 12
                selectYear--
            }
        } else {
            selectMonth++
            if (selectMonth === 13) {
                selectMonth = 1
                selectYear++
            }
        }
        tool.setValue(year, selectYear)
        tool.setValue(month, selectMonth)
        month.dispatchEvent(new Event('change'))
        year.dispatchEvent(new Event('change'))
    })
    // 绑定input
    w.ready(function () {
        var inputWapper = w('#' + config.inputId)[0].parentNode
        w(inputWapper).addEvent('click', function (e) {
            w(container).toggleClass('hide')
        })
    })
    this.container = container
}
/**
 * 生成table
 */
Calendar.prototype.generateContent = function (year, month,day) {
    this.tBody.innerHTML = ''
    var tool = this
    var days = this.years[year][month].slice()
    var date = new Date(year, month - 1)
    var week = date.getDay()
    week = week === 0 ? 7 : week
    var list = tool.generateArray(1, 6)
    list.forEach(function (value, index, list) {
        var tr = document.createElement('tr')
        var tds = tool.generateArray(1, 7)
        var firstLine = value === 1 ? true : false
        tds.forEach(function (value, index, list) {
            var td = document.createElement('td')
            tr.appendChild(td)
        })
        this.tBody.appendChild(tr)
    }, this)
    var lastWeek = week - 1
    while (lastWeek--) {
        days.unshift('')
    }
    w(this.tBody).w('td').innerHTML = days
}
Calendar.prototype.generateArray = function (start, stop) {
    var result = []
    for (let i = start; i <= stop; i++) {
        result.push(i)
    }
    return result
}
Calendar.prototype.setValue = function (select, input) {
    var options = [].slice.call(select.children)
    options.forEach(function (value) {
        if (value.value == input) {
            value.selected = true
        } else {
            value.selected = false
        }
    })
}