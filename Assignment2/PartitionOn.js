function partitionOn(pred, items) {
    var falseArray = [],
        trueArray = [];
    for (i of items) {
        if (pred(i)) {
            trueArray.push(i);
        } else {
            falseArray.push(i);
        }
    }
    items.length = 0;
    Array.prototype.push.apply(items, falseArray.concat(trueArray));
    return falseArray.length;
}