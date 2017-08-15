Array.prototype.square = function () {
    var arr = [];
    for (x of this) {
        arr.push(x * x);
    }
    return arr;
}

Array.prototype.cube = function () {
    var arr = [];
    for (x of this) {
        arr.push(x * x * x);
    }
    return arr;
}

Array.prototype.average = function () {
    var average = 0;
    for (x of this) {
        average += x;
    }
    average = average / this.length;
    return average;
}

Array.prototype.sum = function () {
    var total = 0;
    for (x of this) {
        total += x;
    }
    return total;
}

Array.prototype.even = function () {
    var arr = [];
    for (x of this) {
        if (x % 2 === 0) {
            arr.push(x);
        }
    }
    return arr;
}

Array.prototype.odd = function () {
    var arr = [];
    for (x of this) {
        if (x % 2 !== 0) {
            arr.push(x);
        }
    }
    return arr;
}