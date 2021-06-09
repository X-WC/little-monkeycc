// 核心思路
// 把所有的数据放在本地存储里面 需要用的时候再拿出来进行渲染
// 存储的数据格式

// var toDoList = [{
//     title: '123',
//     done: false
// }, {
//     title: '456',
//     done: false
// }, ]

// 1.本地存储只能存储字符串的数据格式 解决方法是把我们的数组对象转换为字符串格式 JSON.stringify()
// localStorage.setItem('todo', JSON.stringify(toDoList));
// var data = localStorage.getItem('todo');
// console.log(data);

// 2.获取本地存储的数据 将字符串转换为数组对象 JSON.parse()
// data = JSON.parse(data);
// console.log(data[0].title);
// localStorage.clear();


$(function() {
    load();
    // 按下回车把新数据添加到本地存储里面
    $('#title').on('keydown', function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入你要的操作")
            } else {
                // 先读取本地存储原来的数据
                var local = getData();
                // 把最新的数据追加给local数组
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // 把local数组存储在本地存储
                saveData(local);
                // 本地数据渲染在页面中
                load();
                $(this).val('');
            }
        }
    });

    // 删除操作
    $('ol,ul').on('click', 'a', function() {
        // alert(11);
        // 先获取本地存储
        var data = getData();
        // console.log(data);
        // 修改数据
        var index = $(this).attr('id');
        console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();
    });

    // 正在进行和已完成选项操作
    $('ol,ul').on('click', 'input', function() {
        // 先获取本地存储的数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        console.log(data);
        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();
    });
    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            // 取出存储的数据并将数据转换为数组对象
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    };

    // 渲染加载页面
    function load() {
        // 读取本地存储的数据
        var data = getData();
        // console.log(data);
        // 遍历之前要清空ol里面的内容元素
        $('ol,ul').empty();
        var todocount = 0; // 正在进行的个数
        var donecount = 0; // 已经完成的个数
        // 遍历数据
        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>' + n.title + '</p><a href="javascript:;" id="' + i + '"></a></li>');
                donecount++;
            } else {
                $('ol').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a href="javascript:;" id="' + i + '"></a></li>');
                todocount++;
            }
        });
        $('#todocount').text(todocount);
        $('#donecount').text(donecount);
    }
})