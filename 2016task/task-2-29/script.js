// 表单测试
(function testForm() {
    var inputBoxs = document.getElementsByTagName('input'),
        infos = document.querySelector('.info'),
        submitBtn = document.getElementById('submit'),
        result = {};
    // 取消input的默认行为
    // (function preventDefault(list) {
    // 	for (var i=0,len=list.length;i<len;i++) {

    // 	}
    // })(inputBoxs);
    // 测试输入名称是否要求
    function testName(value) {
        var chineseReg = /[^\x00-\xff]/g;
        value = value.replace(/^\s+|\s+$/g, '').replace(chineseReg, 'zz');
        var valueReg = /^.{4,16}$/;
        return valueReg.test(value);
    }
    // 测试邮箱
    function testEmail(value) {
        var reg = /[\w_-]+@[\w_-]+\.com/;
        return reg.test(value);
    }
    //测试手机
    function testPhone(value) {
        var reg = /\w{11}/;
        return reg.test(value);
    }
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
    })
})();
