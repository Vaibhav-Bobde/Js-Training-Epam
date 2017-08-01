function prefill(n, v) {
    var arr;
    var length = parseInt(n);
    if (n % 1 !== 0 || isNaN(length) || length < 0) {
        throw new TypeError(n + " is invalid");
    }
    else {
        arr = n === 0 ? [] : Array(parseInt(n)).fill(v);
    }
    return arr;
}