// 窗口加载事件
window.addEventListener('load', function() {
    // 1.获取元素
    var cloud = document.querySelector('.cloud');
    var c_nav = document.querySelector('.c-nav');
    var lis = c_nav.querySelectorAll('li');
    var current = 0;
    // 2.给所有的小li绑定事件
    for (var i = 0; i < lis.length; i++) {
        // 鼠标经过当前小li的位置作为目标值
        lis[i].addEventListener('mouseenter', function() {
            animate(cloud, this.offsetLeft);
        });
        // 鼠标离开就复原为0
        lis[i].addEventListener('mouseleave', function() {
            animate(cloud, current);

        });
        // 鼠标点击之后 把点击后的作为复原值
        lis[i].addEventListener('click', function() {
            current = this.offsetLeft;
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = '';
            }
            this.className = 'current';
        })
    }
})