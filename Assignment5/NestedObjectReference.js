Object.prototype.hash = function (path) {
    var obj;
    return (function extractObject(traversalArr, obj) {
        if (obj !== undefined && traversalArr.length > 0) {
            obj = obj[traversalArr[0]];
            traversalArr.splice(0, 1);
            return extractObject(traversalArr, obj);
        }
        return obj;
    }(path.split('.'), this));
}