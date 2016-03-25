// 表单测试
(function testForm() {
	var inputBox = document.getElementById('name'),
		testBtn = document.querySelector('.test'),
		info = document.querySelector('.info');
	// 测试输入值是否要求
	function testInputValue(value) {
		var chineseReg = /[^\x00-\xff]/g;
		value = value.replace(/^\s+|\s+$/g, '').replace(chineseReg, 'zz');
		var valueReg = /^.{4,16}$/;
		return valueReg.test(value);
	}
	//改变颜色
	function changeColor(text, color) {
		info.innerHTML = text;
		info.style.color = color;
		inputBox.style.borderColor = color;
	}
	// 绑定btn
	testBtn.onclick = function(e) {
		if (inputBox.value) {
			if (testInputValue(inputBox.value)) {
				changeColor("名称格式正确!", "#20f856");
			} else {
				changeColor("名称格式错误!", "#eb5528");
			}
		} else {
			changeColor("不能输入为空!", "#eb5528");
		}
	}
})();
