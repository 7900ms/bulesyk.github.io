var input = document.getElementById('input'),
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
	newSpan.innerHTML = number;
	console.log('已经创建新的',newSpan)
	return newSpan;
}
// 获取值
function getValue() {
	var inputValue = input.value;
	console.log("输入的值为" + inputValue);
	return inputValue;
}
// 给每个元素绑定删除事件
(function itemEvent() {
	result.addEventListener('click',function (e) {
		var e = e || window.event,
			target = e.target || e.srcElement;
		if (target.tagName.toLowerCase() === 'span') {
			result.removeChild(target);
			alert("删除的是"+target.innerHTML);
		}
	});
})();
leftIn.onclick = function(e) {
	result.insertBefore(newElem(),result.firstChild);
	console.log("插入新元素成功");
}
rightIn.onclick = function (e) {
	result.appendChild(newElem());
	console.log("插入新元素成功");
}
rightOut.onclick = function (e) {
	var outElem = spans[spans.length-1];
	result.removeChild(outElem);
	alert("删除的是"+outElem.innerHTML);
}
leftOut.onclick = function (e) {
	var outElem = spans[0];
	result.removeChild(outElem);
	alert("删除的是"+outElem.innerHTML);
}