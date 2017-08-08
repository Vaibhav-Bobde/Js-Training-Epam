function add(n) {
    var closureFunc = function (x) {
        return add(n + x);
    };
    closureFunc.valueOf = function () {
        return n;
    };
    return closureFunc;
}