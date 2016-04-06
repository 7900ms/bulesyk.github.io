var w = (function() {
	// prototype
	WTool.prototype = {
		constructor: WTool,
		// 继承自Array
		__proto__: Array.prototype,
		// 返回一个WTool对象,内容为querySelectorAll的选择内容
		w: function(selector) {
			var result = new WTool();
			if (!selector) return result;
			if (typeof selector === 'string') {
				var len = this.length;
				while (len--) {
					var count = this[len].querySelectorAll(selector).length;
					while (count--) {
						result.unshift(this[len].querySelectorAll(selector)[count]);
					}
				}
				result = this.uniqArray(result);
			} else {
				var len = arguments.length;
				for (var i = 0; i < len; i++) {
					result.push(arguments[i]);
				}
			}
			return result;
		},
		// 一个去重函数,传入arr返回arr,传入WTool或者其他非arr的list返回去重后的WTool
		uniqArray: function(arr) {
			if (!arr) return false;
			var hash = {};
			// 检测是否为arr
			var result = (Object.prototype.toString.call(arr) === '[object Array]') ? [] : new WTool;
			if (typeof arr[0] === 'object' || typeof arr[0] === 'function') {
				for (var i = 0, len = arr.length; i < len; i++) {
					if (arr[i]) {
						result.push(arr[i]);
					}
					for (var j = i + 1; j < len; j++) {
						if (arr[j] === arr[i]) {
							arr.splice(j, 1);
						}
					}
				}
				// 如是基本值直接用hash
			} else {
				for (var i = 0, len = arr.length; i < len; i++) {
					if (!hash[arr[i]]) {
						result.push(arr[i]);
						hash[arr[i]] = true;
					}
				}
			}
			return result;
		},
		// 这个是用来去除一些重复的操作
		evalStr: function(config) {
			function checkClass(classNames, className) {
				var count = classNames.length;
				while (count--) {
					if (classNames[count] === className) {
						classNames.splice(count, 1);
					}
				}
				return classNames.join(' ');
			}
			var tool = new WTool();
			removeClass = tool.removeClass;
			addClass = tool.addClass;
			// 如果是WTool,给WTool每个DOM对象执行操作
			if (this.length) {
				var len = this.length;
				while (len--) {
					if (this.hasClass(config.className, this[len])) {
						// 如果有Class,执行haveClass的语句
						eval(config.haveClass);
					} else {
						// 如果没有 ...
						eval(config.noClass);
					}
				}
			} else {
				// 如果是elem,给elem执行操作
				if (tool.hasClass(config.className, this)) {
					eval(config.haveClass.replace(/\[len\]/g, ''));
				} else {
					eval(config.noClass.replace(/\[len\]/g, ''));
				}
			}
		},
		// 判断TWool中的所有元素的是否有Class,如果传入elem,则操作一个dom对象,返回一个dom对象
		hasClass: function(className, elem) {
			if (!className) return false;

			function checkClass(classNames, className) {
				var count = classNames.length;
				while (count--) {
					if (classNames[count] === className) {
						return true;
					}
				}
				return false;
			}
			if (elem) {
				var classNames = elem.className.split(/\s+/);
				return checkClass(classNames, className);
			} else {
				var len = this.length;
				while (len--) {
					var classNames = this[len].className.split(/\s+/);
					if (checkClass(classNames, className)) {
						return true;
					}
				}
				return false;
			}
		},
		// 增加TWool中的所有元素的Class,如果存在,什么都不做,如果传入elem,则操作一个dom对象,返回一个dom对象
		addClass: function(className, elem) {
			if (!className) return false;
			var that = elem || this;
			this.evalStr.call(that, {
				haveClass: '',
				noClass: "this[len].className = this[len].className===''?config.className:this[len].className.replace(/^\s+|\s+$/g, '') + ' ' + config.className;",
				className: className
			});
			return that;
		},
		// 删除TWool中的所有元素的Class,如果不存在,什么都不做,如果传入elem,则操作一个dom对象,返回一个dom对象
		removeClass: function(className, elem) {
			if (!className) return false;
			var that = elem || this;
			this.evalStr.call(that, {
				haveClass: "this[len].className = checkClass(this[len].className.split(/\\s+/), config.className);",
				noClass: "",
				className: className
			});
			return that;
		},
		// 操作TWool中的所有元素的Class,如果存在,删除Class,如果不存在,添加Class,如果传入elem,则操作一个dom对象,返回一个dom对象
		toggleClass: function(className, elem) {
			if (!className) return false;
			var that = elem || this;
			this.evalStr.call(that, {
				haveClass: "removeClass.call(this,config.className, this[len]);",
				noClass: "addClass.call(this,config.className, this[len]);",
				className: className
			});
			return that;
		},
		// 新建一个新的有内容的WTool对象
		createWTool: function(config, count) {
			return new WTool(config, count);
		},
		// 新建一个DOM元素
		createElement: function(tag, config) {
			var elem = document.createElement(tag);
			for (var key in config) {
				elem.setAttribute(key, config[key]);
			}
			return elem;
		},
		// 获得兼容性事件
		getEvent: function(e) {
			var e = e || window.event;
			e.target = e.target || e.srcElement;
			e.preventDefault = function() {
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			}
			return e;
		},
		// 添加事件可以传入参数
		addEvent: function(event, listener, config, elem) {
			if (!event || !listener) return;
			var that = elem || this;
			var len = that.length;
			that['listener' + listener.name] = function(e) {
				var e = that.getEvent(e);
				if (config) {
					config.push(e);
					listener.apply(this, config);
				} else {
					listener.call(this, e);
				}
			}
			if (len) {
				while (len--) {
					if (that[len].addEventListener) {
						that[len].eventListener = that.listener;
						that[len].addEventListener(event, that['listener' + listener.name]);
					} else if (true) {
						// pass
					}
				}
			} else {
				if (that.addEventListener) {
					that.eventListener = that.listener;
					that.addEventListener(event, that['listener' + listener.name]);
				} else if (true) {
					// pass
				}
			}
			return that;
		},
		// 删除事件
		removeEvent: function(event, listener) {
			if (!event || !listener) return;
			var that = this;
			var len = that.length;
			while (len--) {
				if (that[len].removeEventListener) {
					that[len].removeEventListener(event, that['listener' + listener.name]);
				} else if (true) {
					// pass
				}
			}
		},
		// 事件委托
		delegateEvent: function(parent, targetSelector, event, listener, config) {
			if (!parent || !targetSelector || !event || !listener) return;
			var len = parent.length;
			this['deleListener' + listener.name] = function(e) {
				var tool = new WTool();
				var e = tool.getEvent(e);
				if (w(this).w(targetSelector)) {
					if (this['deleListener' + listener.name]) return;
					w(this).w(targetSelector).addEvent(event, listener, config);
					// bug,只能添加一次事件
					var createEvent = new Event(event);
					e.target.dispatchEvent(createEvent);
					this['deleListener' + listener.name] = listener;
				}
			}
			this.addEvent(event, this['deleListener' + listener.name]);
		},
		// 取消事件委托
		removeDelegateEvent: function(event, listener) {
			if (!event || !listener) return;
			this.removeEvent(event, this['deleListener' + listener.name]);
		},
		addStyle: function(config, elem) {
			if (!config) return;
			var that = elem || this;
			if (elem) {
				for (var key in config) {
					that.style[key] = config[key];
				}
			} else {
				var len = that.length;
				while (len--) {
					for (var key in config) {
						that[len].style[key] = config[key];
					}
				}
			}
			return that;
		},
		removeStyle: function(config, elem) {
			if (!config) return;
			var that = elem || this;
			var count = config.length;
			if (elem) {
				while (count--) {
					that.style.removeProperty(config[count]);
				}
			} else {
				var len = that.length;
				while (len--) {
					while (count--) {
						that[len].style.removeProperty(config[count]);
					}
				}
			}
			return that;
		},
		animation: function(elem, finalX, finalY, interval) {
			if (elem.setTimeoutId) {
				clearTimeout(elem.setTimeoutId);
			}
			elem.style.position = 'absolute';
			if (!elem.style.top || !elem.style.left) {
				elem.style.top = '0';
				elem.style.left = '0';
			}
			interval = interval || 10;
			(function autoMove() {
				var left = parseInt(elem.style.left),
					top = parseInt(elem.style.top);
				if (left === finalX && top === finalY) {
					return true;
				}
				switch (true) {
					case left < finalX:
						left += Math.ceil((finalX - left) / 10);
						break;
					case left > finalX:
						left -= Math.ceil((left - finalX) / 10);
						break;
					case top < finalY:
						top += Math.ceil((finalY - top) / 10);
						break;
					case top > finalY:
						top -= Math.ceil((top - finalY) / 10);
						break;
				}
				elem.style.left = left + 'px';
				elem.style.top = top + 'px';
				elem.setTimeoutId = setTimeout(autoMove, interval);
			})();
		},
		resetPos: function(elem, left, top) {
			elem.style.position = 'absolute';
			elem.style.left = left + 'px';
			elem.style.top = top + 'px';
		},
		carousel: function(containerConfig, imgsConfig, ruleConfig) {
			var carousel = new Carousel(containerConfig, imgsConfig, ruleConfig);
			return carousel;
		}

	}

	function WTool(config, count) {
		for (var key in config) {
			var elem = document.createElement(key);
			for (var innerKey in config[key]) {
				elem.setAttribute(innerKey, config[key][innerKey]);
			}
			if (count) {
				for (var i = 0; i < count; i++) {
					this.push(elem);
				}
			} else {
				this.push(elem);
			}
		}
	}
	Carousel.prototype = new WTool();

	function Carousel(containerConfig, imgs, cssConfig, conf) {
		var that = this,
			id = containerConfig.id,
			tool = new WTool();
		var containerBox = this.createElement('div', containerConfig);
		var imgsWapper = this.createElement('div', {
			id: id + '-imgs-wapper'
		});
		var spansWapper = this.createElement('div', {
			id: id + '-spans-wapper'
		});
		var leftArrow = this.createElement('span', {
			id: id + '-left-arrow',
			class: 'arrow'
		});
		leftArrow.innerHTML = '<';
		var rightArrow = this.createElement('span', {
			id: id + '-right-arrow',
			class: 'arrow'
		});
		rightArrow.innerHTML = '>';
		// 设置cssrules
		var sheet = document.styleSheets[0];
		sheet.insertRule('#' + id + '-spans-wapper' + `{
				position:absolute;
				bottom:10px;
				font-size:0;
				width:100%;
				text-align:center;
				z-index:2;
			}`, 0);
		sheet.insertRule('#' + id + ' .arrow' + `{
				position:absolute;
				top:40%;
				display:block;
				z-index:2;
				font-size:50px;
				color:rgba(255,255,255,0.5);
			}`, 0);
		sheet.insertRule('#' + id + ' .arrow:hover' + `{
				color:rgba(255,255,255,0.9);
				cursor:pointer;
			}`, 0);
		sheet.insertRule('#' + id + '-right-arrow' + `{
				right:5px;
			}`, 0);
		sheet.insertRule('#' + id + '-left-arrow' + `{
				left:5px;
			}`, 0);
		sheet.insertRule('#' + id + '-spans-wapper span' + `{
				display:inline-block;
				height:15px;
				width:15px;
				border-radius:50%;
				background-color:rgba(255,255,255,0.5);
				margin: 0 5px;
			}`, 0);
		sheet.insertRule('#' + id + '-spans-wapper span:hover, ' + '#' + id + '-spans-wapper .active' + `{
				background-color:rgba(255,255,255,0.9);
				cursor:pointer;
			}`, 0);
		sheet.insertRule('#' + id + '-imgs-wapper img' + `{
				height:100%;
				width:100%;
				position:absolute;
			}`, 0);
		tool.addStyle(cssConfig, containerBox);
		var width = parseInt(cssConfig.width),
			height = parseInt(cssConfig.height);
		tool.addStyle({
			width: cssConfig.width,
			height: cssConfig.height,
			position: 'absolute'
		}, imgsWapper);
		containerBox.appendChild(imgsWapper);
		containerBox.appendChild(spansWapper);
		containerBox.appendChild(leftArrow);
		containerBox.appendChild(rightArrow);
		var i = 0;
		for (var key in imgs) {
			i++;
			var img = this.createElement('img');
			var span = this.createElement('span');
			img.id = key;
			tool.addClass('number' + i, img);
			tool.addClass('number' + i, span);
			img.setAttribute('src', imgs[key]);
			imgsWapper.appendChild(img);
			spansWapper.appendChild(span);
		}
		tool.addClass('now', imgsWapper.firstElementChild);
		tool.addClass('active', spansWapper.firstElementChild);
		// 开始
		function start(config) {
			var now = w('#' + id + '-imgs-wapper').w('.now');
			now.addStyle({
				zIndex: '1'
			});
			// 移动图片
			function imgMove(nextNumber, direct) {
				var now = w('#' + id + '-imgs-wapper').w('.now');
				var active = w('#' + id + '-spans-wapper .active');
				if (w('#' + id + '-imgs-wapper').w('.foil')[0]) {
					w('#' + id + '-imgs-wapper').w('.foil').removeStyle(['z-index']);
					w('#' + id + '-imgs-wapper').w('.foil').removeClass('foil');
				}
				that.resetPos(imgsWapper, 0, 0);
				that.resetPos(now[0], 0, 0);
				that.resetPos(w('#' + id + '-imgs-wapper .number' + nextNumber)[0], direct * width, 0);
				now.addClass('foil');
				now.removeClass('now');
				active.removeClass('active');
				w('#' + id + '-imgs-wapper .number' + nextNumber).addClass('now');
				w('#' + id + '-spans-wapper .number' + nextNumber).addClass('active');
				w('#' + id).w('.now').addStyle({
					zIndex: '1'
				});
				that.animation(imgsWapper, -direct * width, 0, 10);
			}
			// 自动移动图片
			function autoMove(direct, interval) {
				function move() {
					var now = w('#' + id + '-imgs-wapper').w('.now');
					if (direct === 1) {
						var next = now[0].nextElementSibling ? now[0].nextElementSibling : w('#' + id + '-imgs-wapper')[0].firstElementChild;
					} else if (direct === -1) {
						var next = now[0].previousElementSibling ? now[0].previousElementSibling : w('#' + id + '-imgs-wapper')[0].lastElementChild;
					}
					var reg = /number(\d+)/;
					var nextNumber = reg.exec(next.className)[1];
					imgMove(nextNumber, direct);
				}
				imgsWapper.intervalId = setInterval(move, interval);
			}
			// 点击小圆点的移动
			function clickSpanMove(clickNmber) {
				clearInterval(imgsWapper.intervalId);
				var reg = /number(\d+)/;
				var now = reg.exec(w('#' + id + '-imgs-wapper').w('.now')[0].className)[1];
				if (clickNmber > now) {
					imgMove(clickNmber, 1);
				} else if (clickNmber < now) {
					imgMove(clickNmber, -1);
				}
			}
			// 绑定小圆点事件
			function spanClick(e) {
				var clickNmber = /number(\d+)/.exec(this.className)[1];
				clickSpanMove(clickNmber);
			}
			w('#' + id + '-spans-wapper').delegateEvent(this, 'span', 'click', spanClick);
			// 绑定箭头事件
			function leftArrowClick(e) {
				clearInterval(imgsWapper.intervalId);
				var now = w('#' + id + '-imgs-wapper').w('.now');
				var next = now[0].previousElementSibling ? now[0].previousElementSibling : w('#' + id + '-imgs-wapper')[0].lastElementChild;
				var reg = /number(\d+)/;
				var nextNumber = reg.exec(next.className)[1];
				imgMove(nextNumber, -1);
			}

			function rightArrowClick(e) {
				clearInterval(imgsWapper.intervalId);
				var now = w('#' + id + '-imgs-wapper').w('.now');
				var next = now[0].nextElementSibling ? now[0].nextElementSibling : w('#' + id + '-imgs-wapper')[0].firstElementChild;
				var reg = /number(\d+)/;
				var nextNumber = reg.exec(next.className)[1];
				imgMove(nextNumber, 1);
			}
			w('#' + id + '-left-arrow').addEvent('click', leftArrowClick);
			w('#' + id + '-right-arrow').addEvent('click', rightArrowClick);
			if (config.autoMove) {
				config.direct = config.direct?1:-1;
				autoMove(config.direct, config.interval);
			}
		}
		function stop() {
			clearInterval(imgsWapper.intervalId);
		}
		this.containerBox = containerBox;
		this.start = start;
		this.stop = stop;
	}
	// 返回一个指向返回WTool对象的函数
	return function(selector) {
		var result = new WTool();
		if (!selector) return result;
		if (typeof selector === 'string') {
			var len = document.querySelectorAll(selector).length;
			while (len--) {
				result.unshift(document.querySelectorAll(selector)[len]);
			}
		} else {
			var len = arguments.length;
			for (var i = 0; i < len; i++) {
				result.push(arguments[i]);
			}
		}
		return result;
	}
})();
