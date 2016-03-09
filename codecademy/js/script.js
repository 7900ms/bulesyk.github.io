//初始化配置
function config() {
    $('.in-skill').style.backgroundColor = '#d5d5d5';
    var cSkills = $('.c-skills');
    for (var i=0,len=cSkills.length;i<len;i++) {
        cSkills[i].style.display = 'none';
    };
};
(function clickEvent() {
    $('.in-skill').onclick = function(){
        this.style.backgroundColor = '#d5d5d5';
        $('.c-skill').style.backgroundColor = '#e8e8e8';
        $('.in-skills').style.display = 'block';
        var cSkills = $('.c-skills');
        for (var i=0,len=cSkills.length;i<len;i++) {
            cSkills[i].style.display = 'none';
        };
        return false;
    };
    $('.c-skill').onclick = function(){
        this.style.backgroundColor = '#d5d5d5';
        $('.in-skill').style.backgroundColor = '#e8e8e8';
        $('.in-skills').style.display = 'none';
        var cSkills = $('.c-skills');
        for (var i=0,len=cSkills.length;i<len;i++) {
            cSkills[i].style.display = 'block';
        };
        return false;
    };
    $('#notification').onclick = function() {
        $('.noti').style.zIndex = '1';

        $('.account').style.zIndex = '-1';
        return false;
    };
    $('#header-head').onclick = function() {
        console.log('1');
        console.log($('.account'));
        $('.account').style.zIndex = '1';
        $('.noti').style.zIndex = '-1';
        return false;
    };
    $('article').onclick = function() {
        $('.noti').style.zIndex = '-1';
        $('.account').style.zIndex = '-1';
    };
})();

window.onload = function() {
    config();
};
