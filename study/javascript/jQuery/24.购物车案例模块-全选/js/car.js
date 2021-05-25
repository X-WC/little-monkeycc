$(function() {
    // 总计模块
    getSum();

    // 全选 全不选功能模块
    // 把全选按钮（checkall）状态赋值给 三个（j-checkbox）就可以
    // 事件选用change
    $('.checkall').change(function() {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        // $('.cart-item').toggleClass('.check-cart-item');
        if ($(this).prop('checked')) {
            // 添加类名
            $('.cart-item').addClass('check-cart-item');
        } else {
            // 移除类名
            $('.cart-item').removeClass('check-cart-item');
        }
    })


    // 当我们每次点击小的复选框 就判断
    $('.j-checkbox').change(function() {
        // if (选中的小复选框个数 === 3) {
        //     选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // $('.j-checkbox').length 所有小复选框的个数
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop('checked')) {
            // 添加类名
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            // 移除类名
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })

    // 增减商品数量
    // 点击减号（.decrement)文本框(itxt)value值--
    // 点击减号时 一定是兄弟文本框的值改变（不然会改变所有文本框的值）

    // 加号
    $('.increment').click(function() {
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        // 修改小计(p-sum)
        // 当前商品的价格 p
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        // 小计模块
        var s = $(this).parents('.p-num').siblings('.p-sum');
        s.text('¥' + (p * n).toFixed(2)); // 保留两位小数 toFixed(2)
        getSum();
    })

    // 减号
    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            // return 结束当前程序 不执行之后的代码
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        // 修改小计(p-sum)
        // 当前商品的价格 p
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        // 小计模块
        var s = $(this).parents('.p-num').siblings('.p-sum');
        s.text('¥' + (p * n).toFixed(2));
        getSum();
    })

    // 用户修改文本框的值 计算 小计模块
    $('.itxt').change(function() {
        var value = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').html().substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('¥' + (value * p).toFixed(2));
        getSum();
    })

    // 总计和总额模块(封装函数)
    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 计算总钱数
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $('.amount-sum em').text(count);
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text('¥' + money.toFixed(2));
    }

    // 删除商品模块
    // 商品后面的删除按钮
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
    })

    // 删除选中的商品
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    })

    // 清空购物车 删除全部商品
    $('.clear-all').click(function() {
        $('.j-checkbox').parents('.cart-item').remove();
        getSum();
    })

    // 选定商品修改背景颜色


})