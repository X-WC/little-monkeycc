// 导入fs模块
const fs = require('fs');

fs.writeFile('./files/2.txt', 'Hello World', function(err) {
    if (err) {
        return console.log('文件写入失败!' + err.message);
    }
    console.log('文件写入成功');
})