var input = document.getElementById('input'),
	sort = document.getElementById('sort'),
	leftIn = document.getElementById('left-in'),
	rightIn = document.getElementById('right-in'),
	leftOut = document.getElementById('left-out'),
	rightOut = document.getElementById('right-out'),
	result = document.getElementById('result'),
	spans = result.getElementsByTagName('span');
// 创建新元素
function newElem(number) {
	number = number || getValue();
	var newSpan = document.createElement('span');
	newSpan.style.width = '20px';
	newSpan.style.height = number + 'px';
	console.log('已经创建新的', newSpan)
	return newSpan;
}
// 获取值
function getValue() {
	var inputValue = parseInt(input.value);
	if (inputValue < 10 || inputValue > 100) {
		alert("请输入10-100内的数字");
		return false;
	}
	return inputValue;
}
// 给每个元素绑定删除事件
(function itemEvent() {
	result.addEventListener('click', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement;
		if (target.tagName.toLowerCase() === 'span') {
			result.removeChild(target);
			alert("删除的是" + target.style.height + "高的元素");
		}
	});
})();
// 检测是否超过一定元素
function checkElemCount(number) {
	number = number || 10;
	if (spans.length > number) {
		alert("元素超过" + number + "个啦!");
		return false;
	}
	return true;
}
// 初始化五个元素
(function initElem(number) {
	number = number || 5;
	var spans = [];
	for (var i = 0; i < 5; i++) {
		spans[i] = newElem(Math.ceil(Math.random() * 90 + 10));
		result.appendChild(spans[i]);
	}
})();
//排序
function sortList(nodeList, method) {
	var list = [];
	for (var i = 0, len = nodeList.length; i < len; i++) {
		list[i] = nodeList[i].offsetHeight;
	}
	for (i = 0; i < len; i++) {
		for (var j = 0; j < len - i; j++) {
			if (list[j] > list[j + 1]) {
				var max = list[j];
				list[j] = list[j + 1];
				list[j + 1] = max;
			}
		}
	}
	return list;
}
// 高度变化动画
function animation(elem, finalH) {
	if (elem.animaionId) {
		clearTimeout(elem.animaionId);
	}
	(function autoRun() {
		var height = parseInt(elem.style.height);
		switch (true) {
			case (height > finalH):
				height -= Math.ceil((height - finalH) / 5);
				break;
			case finalH > height:
				height += Math.ceil((finalH - height) / 5);
				break;
			case finalH === height:
				return;
		}
		elem.style.height = height + 'px';
		elem.animaionId = setTimeout(autoRun, 100);
	})();
}
//绑定事件
leftIn.onclick = function(e) {
	if (!checkElemCount() || !getValue()) {
		return;
	};
	result.insertBefore(newElem(), result.firstChild);
	console.log("插入新元素成功");
}
rightIn.onclick = function(e) {
	if (!checkElemCount() || !getValue()) {
		return;
	};
	result.appendChild(newElem());
	console.log("插入新元素成功");
}
rightOut.onclick = function(e) {
	var outElem = spans[spans.length - 1];
	result.removeChild(outElem);
	alert("删除的是" + outElem.style.height + "高的元素");
}
leftOut.onclick = function(e) {
	var outElem = spans[0];
	result.removeChild(outElem);
	alert("删除的是" + outElem.style.height + "高的元素");
}
sort.onclick = function(e) {
	var sortResult = sortList(spans);
	for (var i=0,len=spans.length;i<len;i++) {
		animation(spans[i],sortResult[i]);
	}
}