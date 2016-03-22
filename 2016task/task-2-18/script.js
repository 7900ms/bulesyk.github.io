var input = document.getElementById('input'),
	sort = document.getElementById('sort'),
	leftIn = document.getElementById('left-in'),
	rightIn = document.getElementById('right-in'),
	leftOut = document.getElementById('left-out'),
	rightOut = document.getElementById('right-out'),
	result = document.getElementById('result'),
	spans = result.getElementsByTagName('span'),
	texts = result.getElementsByTagName('div'),
	query = document.getElementById('query'),
	queryBtn = document.getElementById('query-btn');
// 创建新元素
function newElem(method, array) {
	var numbers = array || getValue();
	for (var i = 0, len = numbers.length; i < len; i++) {
		var newSpan = document.createElement('span');
		var newSpanText = document.createElement('div');
		newSpan.style.position = 'relative';
		newSpanText.innerHTML = numbers[i];
		newSpanText.style.position = 'absolute';
		newSpanText.style.bottom = '-1.5em';
		newSpan.style.width = '20px';
		newSpan.style.height = numbers[i] + 'px';
		newSpan.appendChild(newSpanText);
		switch (method) {
			case 'leftIn':
				result.insertBefore(newSpan, spans[0]);
				break;
			case 'rightIn':
				result.appendChild(newSpan);
				break;
		}
	}
}
// 获取值
function getValue() {
	var inputValue = getTrueValue(input.value),
		result = [];
	for (var i = 0, len = inputValue.length; i < len; i++) {
		if (inputValue[i] >= 10 && inputValue[i] <= 100) {
			result.push(inputValue[i]);
		} else {
			alert("请输入10-100的数!");
			return;
		}
	}
	return result;
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
	number = number || 60;
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
		spans[i] = Math.ceil(Math.random() * 90 + 10);
	}
	newElem('rightIn', spans);
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
// 数组去重
function uniqArray(array) {
	var result = [],
		middle = {};
	for (var i = 0, len = array.length; i < len; i++) {
		if (!middle[array[i]]) {
			middle[array[i]] = true;
			result[result.length] = array[i];
		}
	}
	return result;
}
// 获取优化后的值
function getTrueValue(value) {
	var trueValue = value.split(/\s|,|;|\u3001|\003B/g);
	var resultList = uniqArray(trueValue);
	resultList = resultList.filter(function(item) {
		return item !== '';
	});
	return resultList;
}
//查询后改变颜色
function changeColor(value) {
	var reg = new RegExp(value+"\+");
	for (var i = 0, len = texts.length; i < len; i++) {
		var match = reg.exec(texts[i].innerHTML);
		if (match) {
			texts[i].innerHTML = RegExp.leftContext +'<a style="color:#f00">' + match[0] + '</a>' + RegExp.rightContext;
			texts[i].parentNode.style.backgroundColor = '#0f0';
			console.log("已找到高度为"+spans[i].style.height+"的元素!");
		}
	}
}
//绑定事件
leftIn.onclick = function(e) {
	if (!checkElemCount() || !getValue()) {
		return;
	};
	newElem('leftIn');
	console.log("插入新元素成功");
}
rightIn.onclick = function(e) {
	if (!checkElemCount() || !getValue()) {
		return;
	};
	newElem('rightIn');
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
	console.log("排序后列表" + sortResult);
	for (var i = 0, len = spans.length; i < len; i++) {
		var spanText = spans[i].getElementsByTagName('div')[0];
		spanText.innerHTML = sortResult[i];
		animation(spans[i], sortResult[i]);
	}
}
queryBtn.onclick = function(e) {
	var anchors = result.getElementsByTagName('a');
	for (var i=0,len=anchors.length;i<len;i++) {
		anchors[i].style = 'none';
	}
	for (i=0,len=spans.length;i<len;i++){
		if (spans[i].style.backgroundColor === "rgb(0, 255, 0)") {
			spans[i].style.backgroundColor = '#f00';
		}
	}
	var queryText = query.value;
	changeColor(queryText);
}