// 导入fs模块
const fs = require('fs');

fs.readFile('./files/成绩.txt', 'utf8', function(err, result) {
    if (err) {
        return console.log('文件读取失败' + err.message);
    }
    // 分割字符串转化给数组
    const arrOld = result.split(' ');
    const arrNew = [];
    arrOld.forEach(item => {
        // "="替换":"
        arrNew.push(item.replace('=', ':'))
    })
    const newStr = arrNew.join('\r\n');
    fs.writeFile('./files/成绩-ok.txt', newStr, function(err) {
        if (err) {
            return console.log('文件写入失败' + err.message);
        }
        console.log('成绩写入成功');
    })
})