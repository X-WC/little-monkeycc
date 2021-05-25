window.addEventListener('load', function() {
    // 轮播图自动播放功能

    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // 2.获取focus的宽度
    var w = focus.offsetWidth;
    console.log(w);
    // 3.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function() {
        // 使用translate移动
        index++;
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        ul.style.transition = 'all .3s';
        console.log(ul.style.transform);
    }, 2000);
    // 等待过渡完成之后 再去判断 监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果 快速跳转
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            // 去掉过渡效果 快速跳转
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 小圆点跟随变化
        // 把ol带有current的li挑选出来
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的小li加上current
        ol.children[index].classList.add('current');
    });
    // 4.手指滑动轮播图 （本质是拖动元素）
    // 触摸元素 touchstart 获得手指的初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候就停止定时器
        clearInterval(timer);
    });
    // 滑动手指 touchmove 计算手指的滑动距离 并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子 盒子原来的位置+手指移动的距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候不需要动画效果所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // 如果用户手指移动过我们再去判断否则不做判断效果
        flag = true;
        // 阻止屏幕滚动功能
        e.preventDefault();
    });
    // 手机离开 根据移动距离去判断是回弹还是播放上一张/下一张
    ul.addEventListener('touchend', function(e) {
        if (flag = true) {
            if (Math.abs(moveX) > 50) {
                // 如果是右滑 就播放下一张
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑 就播放上一张
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // 如果移动距离小于50px 就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s'
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 手指离开的时候重新开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            // 使用translate移动
            index++;
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = 'all .3s';
            console.log(ul.style.transform);
        }, 2000);
    });

    // 返回顶部模块制作
    // 获取元素
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    // 页面滚动
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    });
})