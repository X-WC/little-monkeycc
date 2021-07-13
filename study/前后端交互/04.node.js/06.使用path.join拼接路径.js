// 导入path模块
const path = require('path');

// ../会抵消前一个路径
const pathStr = path.join('/a', '/b/c', '../../', './d', '/e');
console.log(pathStr);

// 
const pathStr2 = path.join(__dirname + '/files/1.txt');
console.log(pathStr2);