// 导入fs模块
const fs = require('fs');


fs.readFile('./files/1.txt', 'utf8', function(err, result) {
    console.log(err);
    console.log(result);
    if (err) {
        return console.log('文件读取失败！' + err.message);
    }
    console.log('文件读取成功!内容是：' + result);
})