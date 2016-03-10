//初始化配置
function config() {
    $('.in-skill').style.backgroundColor = '#d5d5d5';
    var cSkills = $('.c-skills');
    for (var i = 0, len = cSkills.length; i < len; i++) {
        cSkills[i].style.display = 'none';
    };
    var links = $('a');
    for (var i = 0, len = links.length; i < len; i++) {
        links[i].onclick = function() {
            return false;
        };
    };
};
(function clickEvent() {
    //in-skills显示
    function inSkillDisplay() {
        this.style.backgroundColor = '#d5d5d5';
        $('.c-skill').style.backgroundColor = '#e8e8e8';
        $('.in-skills').style.display = 'block';
        var cSkills = $('.c-skills');
        for (var i = 0, len = cSkills.length; i < len; i++) {
            cSkills[i].style.display = 'none';
        };
    };
    addEvent($('.in-skill'), 'click', inSkillDisplay);
    //c-skills显示
    function cSkillDisplay() {
        this.style.backgroundColor = '#d5d5d5';
        $('.in-skill').style.backgroundColor = '#e8e8e8';
        $('.in-skills').style.display = 'none';
        var cSkills = $('.c-skills');
        for (var i = 0, len = cSkills.length; i < len; i++) {
            cSkills[i].style.display = 'block';
        };
    };
    addEvent($('.c-skill'), 'click', cSkillDisplay);
    //noti显示
    function notiDisplay() {
        removeEvent(this, 'click', notiDisplay);
        addEvent($('#header-head'), 'click', accountDisplay);
        $('.account').style.zIndex = '-1';
        $('.noti').style.zIndex = '1';
        addClass(this, 'now');
        addEvent($('.now'), 'click', noDisplay);

        function noDisplay() {
            $('.noti').style.zIndex = '-1';
            removeClass(this, 'now');
            addEvent(this, 'click', notiDisplay);
        };
    };
    addEvent($('#notification'), 'click', notiDisplay);
    //account显示
    function accountDisplay() {
        removeEvent(this, 'click', accountDisplay);
        addEvent($('#notification'), 'click', notiDisplay);
        $('.noti').style.zIndex = '-1';
        $('.account').style.zIndex = '1';
        addClass(this, 'now');
        addEvent($('.now'), 'click', noDisplay);

        function noDisplay() {
            $('.account').style.zIndex = '-1';
            removeClass(this, 'now');
            addEvent(this, 'click', accountDisplay);
        };
    };
    addEvent($('#header-head'), 'click', accountDisplay);
    //点击隐藏display
    function hiddenDisplay(e) {
        addEvent($('#notification'), 'click', notiDisplay);
        addEvent($('#header-head'), 'click', accountDisplay);
        var e = e || window.event,
            target = e.target || e.srcElement;
        if (!($('.account').contains(e.target) || $('.noti').contains(e.target))) {
            $('.account').style.zIndex = '-1';
            $('.noti').style.zIndex = '-1';
        };
    };
    addEvent($('article'), 'click', hiddenDisplay);
    var skills = $('.skills-list .skills');
    for (var i = 0, len = skills.length; i < len; i++) {
        skills[i].onmouseenter = function() {
            var theLastTime = this.getElementsByTagName('span')[2];
            theLastTime.style.zIndex = '1';
            setPos(theLastTime, 700, 50);
            animation(theLastTime, 700, 22, 5);
        };
        skills[i].onmouseleave = function() {
            var theLastTime = this.getElementsByTagName('span')[2];
            theLastTime.style.zIndex = '-1';
            setPos(theLastTime, 700, 50);
        };
    };
})();

window.onload = function() {
    config();
};
