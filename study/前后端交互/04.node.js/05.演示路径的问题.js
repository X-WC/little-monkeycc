const fs = require('fs');

// fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) {
//     if (err) {
//         return console.log("文件读取失败！" + err.message);
//     }
//     console.log("文件读取成功!" + dataStr);
// })


// --dirname 表示当前文件的目录
console.log(__dirname);
fs.readFile(__dirname + '/files/1.txt', 'utf8', function(err, dataStr) {
    if (err) {
        return console.log("文件读取失败!" + err.message);
    }
    console.log("文件读取成功！" + dataStr);
})