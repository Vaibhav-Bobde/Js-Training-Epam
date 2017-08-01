function createFunctions(n) {
    var callbacks = [];
    for (var i = 0; i < n; i++) {
        (function () {
            var pos = i;
            callbacks.push(function () {
                return pos;
            });
        }())
    }
    return callbacks;
}