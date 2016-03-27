// 表单测试
(function Form() {
	var inputBoxs = document.querySelectorAll('input.text'),
		infos = document.querySelector('.info'),
		submitBtn = document.getElementById('submit'),
		result = {};
	// 测试
	var test = {
		name: function(value) {
			var chineseReg = /[^\x00-\xff]/g;
			value = value.replace(/^\s+|\s+$/g, '').replace(chineseReg, 'zz');
			var valueReg = /^.{4,16}$/;
			return valueReg.test(value);
		},
		email: function(value) {
			var reg = /[\w_-]+@[\w_-]+\.com/;
			return reg.test(value);
		},
		phone: function(value) {
			var reg = /\w{11}/;
			return reg.test(value);
		}
	}
	//改变颜色函数
	function changeColor(parentElem, text, color) {
		parentElem.querySelector('.info').innerHTML = text;
		parentElem.querySelector('.info').style.color = color;
		parentElem.querySelector('input').style.borderColor = color;
	}
	// 检测事件
	function checkEvent(e) {
		var e = e || window.event,
			target = e.target || e.srcElement;
		removeClass(this.parentNode.querySelector('.info'), 'hide');
		switch (this.id) {
			case "name":
				if (this.value) {
					if (test.name(this.value)) {
						changeColor(this.parentNode, '输入名称规范', '#0f0');
						result.name = this.value;
					} else {
						changeColor(this.parentNode, '输入名称不规范', '#f00');
					}
				} else {
					changeColor(this.parentNode, '名称不能为空', '#f00');
				}
				break;
			case "password":
				if (this.value) {
					if (test.name(this.value)) {
						changeColor(this.parentNode, '输入密码规范', '#0f0');
						result.password = this.value;
					} else {
						changeColor(this.parentNode, '输入密码在4-16位之间', '#f00');
					}
				} else {
					changeColor(this.parentNode, '密码不能为空', '#f00');
				}
				break;
			case "password-ok":
				if (this.value) {
					if (this.value === result.password) {
						changeColor(this.parentNode, '确认密码一致', '#0f0');
						result.passwordOk = true;
					} else {
						changeColor(this.parentNode, '确认密码不一致', '#f00');
					}
				} else {
					changeColor(this.parentNode, '密码确认不能为空', '#f00');
				}
				break;
			case "email":
				if (this.value) {
					if (test.email(this.value)) {
						changeColor(this.parentNode, '邮箱格式正确', '#0f0');
						result.email = this.value;
					} else {
						changeColor(this.parentNode, '邮箱格式不正确', '#f00');
					}
				} else {
					changeColor(this.parentNode, '邮箱不能为空', '#f00');
				}
				break;
			case "phone":
				if (this.value) {
					if (test.phone(this.value)) {
						changeColor(this.parentNode, '输入手机格式正确', '#0f0');
						result.phone = this.value;
					} else {
						changeColor(this.parentNode, '输入手机格式不正确', '#f00');
					}
				} else {
					toggleClass(this.parentNode.querySelector('.info'), 'hide');
					changeColor(this.parentNode, '选填', '#818181');
					this.parentNode.querySelector('input.text').style.removeProperty('border-color');
				}
				break;
			case "job":
				if (this.value) {
					result.job = this.value;
				}
				break;
		}
	}
	//显示提示
	function displayInfo(e) {
		var e = e || window.event,
			target = e.target || e.srcElement;
		removeClass(this.parentNode.querySelector('.info'), 'hide');
	}
	// 绑定每个input的事件
	for (var i = 0, len = inputBoxs.length; i < len; i++) {
		inputBoxs[i].addEventListener('blur', checkEvent);
		inputBoxs[i].addEventListener('focus', displayInfo);
	}
	// 绑定提交的事件
	submitBtn.addEventListener('click', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement;
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		// 检测有几input验证成功的
		var form = (function checkNumbers() {
			var count = 0, resultStr = '';
			var event = new Event('blur');
			for (var i = 0, len = inputBoxs.length; i < len; i++) {
				inputBoxs[i].dispatchEvent(event);
			}
			// 检测选择的学校还是工作
			if (document.getElementById('in-schoole').checked) {
				delete result.job;
				var schoole = document.getElementById('schoole-name');
				result.schoole = schoole[schoole.selectedIndex].innerHTML;
			} else {
				delete result.schoole;
			}
			for (var key in result) {
				if (key === 'phone') {
					resultStr += key + ':' + result[key] + ' ';
					continue;
				}
				count++;
				resultStr += key + ':' + result[key] + ' ';
			}
			return {
				count: count,
				result: resultStr
			};
		})();
		if (form.count >= 4) {
			alert(form.result);
		} else {
			alert("请按要求输入!");
		}
	});
	// 选择时隐藏所有其他input-wapper
	function hideOthers(parentElem) {
		var inputBoxs = parentElem.querySelectorAll('.input-wapper');
		var len = inputBoxs.length;
		while (len--) {
			addClass(inputBoxs[len], 'hide');
		}
	}
	// 绑定选择填写的事件
	(function choiceEvent(parentElem) {
		var radios = parentElem.querySelectorAll('input.choice'),
			len = radios.length;
		while (len--) {
			radios[len].addEventListener('focus', function(e) {
				parentElem.querySelector('.checked').checked = false;
				removeClass(parentElem.querySelector('.checked'), 'checked');
				addClass(this, 'checked');
				parentElem.querySelector('.checked').checked = true;
				hideOthers(parentElem);
				removeClass(parentElem.querySelector('.' + this.id), 'hide');
			});
		}
		var schooleCity = document.getElementById('schoole-city');
		// 获取对应学校
		function getSchooleName(cityName) {
			var schooleNames = {
				beijing: ["北京大学", "华中科技大学", "清华大学", "北京邮电大学"],
				shanghai: ["上海大学", "复旦大学", "上海交通大学"],
				city: ["学校"]
			}
			return schooleNames[cityName];
		}
		schooleCity.addEventListener('change', function(e) {
			var schooleName = parentElem.querySelector('#schoole-name');
			schooleName.innerHTML = '';
			var city = this.value;
			var schooleNames = getSchooleName(city),
				len = schooleNames.length;
			while (len--) {
				var option = document.createElement('option');
				option.value = 'value' + len;
				option.innerHTML = schooleNames[len];
				if (schooleName.firstElementChild) {
					insertBefore(option, schooleName.firstElementChild);
				} else {
					schooleName.appendChild(option);
				}
			}

		});
	})(document.querySelector('.multiple-choice'));
})();

// 表单元素生成
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
	//创建wapper
	var inputWapper = (function() {
		var inputWapper = elemGenerate('div', { class: 'input-wapper' }),
			label = elemGenerate('label', { for: config.id }, config.labelText),
			inputText = elemGenerate('input', { class: 'text', type: config.type, id: config.id }),
			hint = elemGenerate('span', { class: 'info' }, config.rules);
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
					return '空';
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
	inputWapper.querySelector('input').addEventListener('blur', function(e) {
		this.validatorResult = this.validator(config.validator);
		console.log(this.validatorResult);
	});
	return inputWapper;
}
var inputWapperName = inputWapperGenerate({
	id: 'name',
	type: 'text',
	labelText: '名称:',
	rules: '必填，长度为4~16个字符',
	validator: function() {
		var reg = /^[\w_-]+@[\w_-]+\.com$/;
		return reg.test(this.value);
	}
});
document.body.appendChild(inputWapperName);