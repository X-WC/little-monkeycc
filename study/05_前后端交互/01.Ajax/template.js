function template(id, data) {
    var str = document.querySelector(id).innerHTML;
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;
    var patternResult = null;
    while (patternResult = pattern.exec(str)) {
        str = str.replace(patternResult[0], data[patternResult[1]]);
    }
    return str;
}