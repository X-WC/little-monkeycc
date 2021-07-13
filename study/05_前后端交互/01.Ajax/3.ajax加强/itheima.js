function resolveData(data) {
    var arr = [];
    for (var k in data) {
        var str = k + '=' + data[k];
        arr.push(str);
    }
    return arr.join('&');
}

// var fn = resolveData({
//     name: 'cc',
//     age: 10
// });

// console.log(fn);

function itheima(options) {
    var xhr = new XMLHttpRequest();

    // 把外界传递过来的参数对象 转换为查询字符串
    var qs = resolveData(options.data);

    // 判断请求类型
    if (options.method.toUpperCase() === 'GET') {
        // 发起get请求
        xhr.open(options.method, options.url + '?' + qs);
        xhr.send();
    } else if (options.method.toUpperCase() === "POST") {
        // 发起post请求
        xhr.open(options.method, options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }

    // 监听请求状态改变的事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 将JSON字符串转换为JS对象
            var result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }



}