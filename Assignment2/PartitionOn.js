function partitionOn(pred, items) {
    var falseArray = [];
    var trueArray = [];
    var boundaryIndex;
    for (i of items) {
        if (pred(i)) {
            trueArray.push(i);
        }
        else {
            falseArray.push(i);
        }
    }
    boundaryIndex = falseArray.length;
    items.length = 0;
    Array.prototype.push.apply(items, falseArray.concat(trueArray));
    return boundaryIndex;
}