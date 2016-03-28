
// 表单元素生成
/* 生成表单wapper,包括label,input,rule,判断程序,判断结果
 * @para obj{
 * 	id: str, input的id,默认判断根据id判断,目前有('name','email','phone') ex:'name'
 * 	type: str, input的type ex 'text'
 *  labelText: str, label内的文字 ex '名称:'
 * 	rules: str, ex '必填，长度为4~16个字符'
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
 * return elemObj inputWapper inputWapper.inputValue为判断通过时的input值
 */
function inputWapperGenerate(config) {
	// 元素生成器吗
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
var inputWapperName = inputWapperGenerate({
	id: 'name',
	type: 'text',
	labelText: '名称:',
	rules: '必填，长度为4~16个字符',
	success: '名称规范',
	successColor: '#0f0',
	faile: '验证失败,长度为4~16个字符',
	faileColor: '#f00',
	empty: false
});
insertBefore(inputWapperName,document.querySelector('.multiple-choice'));
var inputWapperPassword = inputWapperGenerate({
	id: 'password',
	type: 'password',
	labelText: '密码:',
	rules: '必填，长度和上面一样为4~16个字符',
	validator: function() {
		var value = document.getElementById('password').value;
		if (!value) return 'empty';
		var chineseReg = /[^\x00-\xff]/g;
		value = value.replace(/^\s+|\s+$/g, '').replace(chineseReg, 'zz');
		var reg = /^.{4,16}$/;
		return reg.test(value);
	},
	success: '密码规范',
	successColor: '#0f0',
	faile: '验证失败,长度为4~16个字符',
	faileColor: '#f00',
	empty: false
});
insertBefore(inputWapperPassword,document.querySelector('.multiple-choice'));
var inputWapperPasswordOk = inputWapperGenerate({
	id: 'password-ok',
	type: 'password',
	labelText: '密码确认:',
	rules: '必填，和上面密码相同',
	validator: function() {
		var value = document.getElementById('password-ok').value;
		if (!value) return 'empty';
		return (value === document.getElementById('password').value);
	},
	success: '密码正确',
	successColor: '#0f0',
	faile: '验证失败',
	faileColor: '#f00',
	empty: false
});
insertBefore(inputWapperPasswordOk,document.querySelector('.multiple-choice'));
var inputWapperEmail = inputWapperGenerate({
	id: 'email',
	type: 'email',
	labelText: '邮箱:',
	rules: '必填',
	success: '邮箱正确',
	successColor: '#0f0',
	faile: '验证失败',
	faileColor: '#f00',
	empty: false
});
insertBefore(inputWapperEmail,document.querySelector('.multiple-choice'));
var inputWapperPhone = inputWapperGenerate({
	id: 'phone',
	type: 'text',
	labelText: '电话:',
	rules: '选填',
	success: '电话正确',
	successColor: '#0f0',
	faile: '验证失败',
	faileColor: '#f00',
	empty: true
});
insertBefore(inputWapperPhone,document.querySelector('.multiple-choice'));
// 之前的包括select的表单判断,
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
