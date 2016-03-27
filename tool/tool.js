/* @移动动画
 * @para elem(elemObj) 需要移动的元素
 * @para finalX(number) 移动的最终X轴位置
 * @para finalY(number) 移动的最终Y轴位置
 * @para constant(boolean) (可选) 默认为false 是否匀速移动
 * @para speed(number) (可选) 默认为10 匀速移动的速度
 * @oara startX(number) (可选) 默认为0 移动起点left的值
 * @para startY(number) (可选) 默认为0 移动起点top的值
 * @para fps(number) (可选) 默认为30 不好解释,应该是动画移动的速度
 * @para interval(number) (可选) 默认为10 每次动画改变的间隔
 * @return true 动画完成后
 */
function animation(elem, finalX, finalY, constant, speed, startX, startY, fps, interval) {
    //设置默认的fps和interval
    clearTimeout(elem.rotation);
    fps = fps || 30;
    interval = interval || 10;
    startX = startX || 0;
    startY = startY || 0;
    constant = constant || false;
    speed = speed || 5;
    elem.style.position = 'absolute';
    elem.parentNode.position = 'relative';
    elem.style.left = elem.style.left ? elem.style.left : startX;
    elem.style.top = elem.style.top ? elem.style.top : startY;
    (function move() {
        var left = parseInt(elem.style.left),
            top = parseInt(elem.style.top);
        //比较当前位置和最终位置
        if (left === finalX && top === finalY) {
            return true;
        };
        if (left < finalX) {
            if (constant) {
                left += speed;
            } else {
                left += Math.ceil((finalX - left) / fps);
            };
        };

        if (left > finalX) {
            if (constant) {
                left -= speed;
            } else {
                left -= Math.ceil((left - finalX) / fps);
            };
        };
        if (top < finalY) {
            if (constant) {
                top += speed;
            } else {
                top += Math.ceil((finalY - top) / fps);
            };
        };
        if (top > finalY) {
            if (constant) {
                top -= speed;
            } else {
                top -= Math.ceil((top - finalY) / fps);
            };
        };
        elem.style.left = left + 'px';
        elem.style.top = top + 'px';
        elem.rotation = setTimeout(move, interval);
    })();
};
//
/* @设置元素位置
 * @para elem(elemObj) 需要设置的元素
 * @para left(number) 相对于父元素left的位置(px)
 * @para top(number) 相对于父元素top的位置(px)
 * @return 无
 */
function setPos(elem, left, top) {
    elem.parentNode.style.position = 'relative';
    elem.style.position = 'absolute';
    elem.style.left = left + 'px';
    elem.style.top = top + 'px';
};
//
/* @数组去重
 * @para arr(arrObj) 需要去重的arr
 * @return arr(arrObj) 去重后的一个新的arr
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
// @简化insertBefore
function insertBefore(elem, targetElem) {
    targetElem.parentNode.insertBefore(elem, targetElem);
};
//
// @构建insertAfter
function insertAfter(elem, targetElem) {
    var parent = targetElem.parentNode;
    if (parent.lastChild === targetElem) {
        parent.appendChild(elem);
    } else {
        insertBefore(elem, targetElem.nextSilbing());
    };
};
//
/* @给元素增加类名
 * @para elem(elemObj) 要添加的元素
 * @para className(str) 要添加的类名
 * @return 无
 */
function addClass(elem, className) {
    var classNames = elem.className.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            var find = true;
            break;
        }
    }
    if (find) {
        return;
    }
    if (!elem.className) {
        elem.className = className;
    } else {
        elem.className += ' ';
        elem.className += className;
    };
};
//
/* @给元素去掉类名
 * @para elem(elemObj) 要取消的元素
 * @para className(str) 要取消的类名
 * @return 无
 */
function removeClass(elem, className) {
    if (!elem) {
        return;
    }
    var reg = new RegExp(className);
    if (!reg.test(elem.className)) {
        return;
    };
    var classNames = elem.className.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            classNames.splice(i, 1);
            break;
        };
    };
    elem.className = classNames.join(' ');
};
/* @给元素去掉/加上类名
 * @para elem(elemObj) 要去掉/加上的元素
 * @para className(str) 要去掉/加上的类名
 * @return 无
 */
function toggleClass(elem, className) {
    var classNames = elem.className.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            classNames.splice(i, 1);
            var find = true;
            break;
        }
    }
    if (!find) {
        addClass(elem, className);
        return;
    }
    elem.className = classNames.join(' ');
}
/* @mini$ 取消了之前练习中utils的写法,之前不让用querySelectorAll(),可以选择到第5代,用空格区分
 * @只有二代选择时会返回选择第一代中的第一个元素的后代选择列表,三代选择会返回第二代的第一个元素的后代选择列表
 * para selecter(str) 部分css选择器
 * return elemObjNodeList 如果只nodelist中只有一个elemObj,则返回elemObj
 */
function $(selecter) {
    var reg = /^(.+)\s(.+)$/g.exec(selecter), //代数选择判断
        idReg = /^(#[\w_\-]+)$/, //ID选择
        tagReg = /^([a-z]+)$/, //标签选择
        classReg = /^(\.[\w_\-]+)$/, //类名选择
        attrReg = /^([\w+]?)\[([\w_\-]+)(=['|"](.+)['|"])?\]$/, //属性值
        rootNode;
    if (!reg) {
        var para = {
            id: idReg.exec(selecter) ? idReg.exec(selecter)[1] : null,
            tag: tagReg.exec(selecter) ? tagReg.exec(selecter)[1] : null,
            class: classReg.exec(selecter) ? classReg.exec(selecter)[1] : null,
            attr: attrReg.exec(selecter) ? attrReg.exec(selecter)[0] : null
        };
        for (var key in para) {
            if (para[key]) {
                para = para[key];
                break;
            };
        };
        return document.querySelectorAll(para).length === 1 ? document.querySelectorAll(para)[0] : document.querySelectorAll(para);
    } else {
        if ($(reg[1]).length) {
            rootNode = $(reg[1])[0];
        } else {
            rootNode = $(reg[1]);
        }
        return rootNode.querySelectorAll(reg[2]);
    };
};
/* @事件代理
 * @para elem(elemObj) 要添加的事件的元素的父元素
 * @para tag(str) 要添加元素的标签名
 * @para event(str) 要添加的事件名
 * @para listener 监听函数
 * @return 无
 */
function delegateEvent(elem, tag, event, listener) {
    function parafn(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener(target);
        };
    };
    addEvent(elem, event, parafn);
};
//
/* @添加事件
 * @para elem(elemObj) 要添加的事件的元素
 * @para event(str) 要添加的事件名称
 * @para listener(fn) 触发事件后的监听函数
 * @return 无
 */
function addEvent(elem, event, listener) {
    if (elem.addEventListener) {
        elem.addEventListener(event, listener, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + event, listener);
    };
};
/* @取消事件
 * @para elem(elemObj) 要取消的事件的元素
 * @para event(str) 要取消的事件名称
 * @para listener(fn) 要取消事件的监听函数
 * @return 无
 */
function removeEvent(elem, event, listener) {
    if (elem.removeEventListener) {
        elem.removeEventListener(event, listener);
    } else {
        elem.detachEvent('on' + event, listener);
    };
};
/* 生成表单wapper,包括label,input,rule,判断程序,判断结果
 * @para obj{
 * 	id: str, input的id,默认判断根据id判断,目前有('name','email','phone') ex:'name'
 * 	type: str, input的type ex 'text'
 *  labelText: str, label内的文字 ex '名称:'
 * 	rules: '必填，长度为4~16个字符', ex '必填，长度为4~16个字符'
 *  // validator: function() { 自定义判断函数
 *  // 	if (!value) return 'empty';
 *  // 	if (success) return true;
 *  // 	if (faile) return false;
 *  // }默认根据id判断,自定义时按照上面格式,
 *  success: str, 判断正确时的显示内容 ex '名称正确'
 *  successColor: str , 判断判断正确时的显示颜色 ex '#0f0'
 *  faile: str, 判断错误时的内容 ex'验证失败'
 *  faileColor: str, 判断错误时的颜色 ex '#f00'
 *  empty: boolean 是否允许为空 ex true
 * }
 */
function inputWapperGenerate(config) {
	// 元素生成器
	function elemGenerate(tag, config, text) {
		var elem = document.createElement(tag);
		for (var key in config) {
			elem.setAttribute(key, config[key])
		}
		if (text) {
			elem.innerHTML = text;
		}
		return elem;
	}
	function changeColor(parentElem, text, color) {
		parentElem.querySelector('.info').innerHTML = text;
		parentElem.querySelector('.info').style.color = color;
		parentElem.querySelector('input').style.borderColor = color;
	}
	//创建wapper
	var inputWapper = (function() {
		var inputWapper = elemGenerate('div', { class: 'input-wapper' }),
			label = elemGenerate('label', { for: config.id }, config.labelText),
			inputText = elemGenerate('input', { class: 'text', type: config.type, id: config.id }),
			hint = elemGenerate('span', { class: 'info hide' }, config.rules);
		inputWapper.appendChild(label);
		inputWapper.appendChild(inputText);
		inputWapper.appendChild(hint);
		return inputWapper;
	})(config);
	// 验证程序
	inputWapper.querySelector('input').validator = function(validator) {
		var value = this.value.replace(/^\s+|\s+$/g, ''), type = this.id;
		if (!validator) {
			// 默认的验证程序
			validator = function() {
				if (!value) {
					return 'empty';
				}
				switch (type) {
					case 'name':
						var chineseReg = /[^\x00-\xff]/g;
						value = value.replace(/^\s+|\s+$/g, '').replace(chineseReg, 'zz');
						var reg = /^.{4,16}$/;
						return reg.test(value);
					case 'email':
						var reg = /^[\w_-]+@[\w_-]+\.com$/;
						return reg.test(value);
					case 'phone':
						var reg = /^\w{11}$/;
						return reg.test(value);
					default:
						return true;
				}
			}
		}
		return validator();
	}
	inputWapper.querySelector('input').addEventListener('focus', function(e) {
		removeClass(this.parentNode.querySelector('.info'), 'hide');
		changeColor(this.parentNode, config.rules, '#818181');
		this.style.removeProperty('border-color');
	});
	inputWapper.querySelector('input').addEventListener('blur', function(e) {
		var validatorResult = this.validator(config.validator);
		if (config.empty) {
			if (validatorResult === 'empty') {
				addClass(this.parentNode.querySelector('.info'), 'hide');
				changeColor(this.parentNode, '选填', '#818181');
				this.style.removeProperty('border-color');
				return;
			}
		} else {
			if (validatorResult === 'empty') {
				changeColor(this.parentNode, '不能为空', config.faileColor);
				return;
			}
		}
		if (validatorResult) {
			changeColor(this.parentNode, config.success, config.successColor);
			this.parentNode.inputValue = this.value;
		} else {
			changeColor(this.parentNode, config.faile, config.faileColor);
		}
	});
	return inputWapper; //inputWapper.inputValue为判断通过时保存的值
}