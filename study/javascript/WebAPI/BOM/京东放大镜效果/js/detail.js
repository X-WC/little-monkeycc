// 分析
// 整个案例可以分为三个功能模块
// 窗口加载
window.addEventListener('load', function() {
    var pic = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 鼠标经过小图片盒子 黄色的遮罩层和大图片盒子显示 离开隐藏
    pic.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    pic.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 黄色遮挡层根据鼠标功能
    pic.addEventListener('mousemove', function(e) {
        // 先计算鼠标盒子内的坐标 鼠标在页面中的坐标-盒子距离页面的坐标-盒子的边框
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // mask移动的距离 限定移动距离只能在小图片框内
        // mask的最大宽度 图片的宽度-遮蔽层的宽度
        var maskMaxX = pic.offsetWidth - mask.offsetWidth;
        var maskMaxY = pic.offsetHeight - mask.offsetHeight;
        // 盒子宽度的一半 mask.offsetWidth / 2
        var maskX = x - (mask.offsetWidth / 2);
        if (maskX <= 0) {
            maskX = 0;

        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX;
        }
        var maskY = y - (mask.offsetHeight / 2);
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY;
        }
        mask.style.left = maskX + "px";
        mask.style.top = maskY + "px";
        // 大图片的最大移动距离
        var bigImg = document.querySelector('.bigImg')
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离
        var bigX = bigMax * maskX / maskMaxX;
        var bigY = bigMax * maskY / maskMaxY;
        // 图片向右走 所以是负值
        bigImg.style.left = -bigX + "px";
        bigImg.style.top = -bigY + "px";
    })
});