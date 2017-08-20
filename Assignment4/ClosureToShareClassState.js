var Cat = (function () {
    var weights = {};

    function Constructor(name, weight) {
        if (!name || !weight) {
            throw Error('Must specify name and weight');
        }
        var cat = {};
        weights[name] = weight;
        Object.defineProperty(cat, 'weight', {
            get: function () {
                return weight;
            },
            set: function (val) {
                weight = val;
                weights[name] = val;
            }
        });
        cat.constructor = Cat;
        return cat;
    }
    Constructor.averageWeight = function () {
        var avWeight = 0;
        for (var el in weights) {
            avWeight += weights[el];
        }
        avWeight = avWeight / Object.keys(weights).length;
        return avWeight;
    }
    return Constructor;
}());