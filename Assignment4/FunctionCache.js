function cache(complexFunction) {
    var cacheObj = {};
    function cacheFunction() {
        var argumentCombination = JSON.stringify(arguments);
        if (cacheObj.hasOwnProperty(argumentCombination)) {
            return cacheObj[argumentCombination];
        }
        cacheObj[argumentCombination] = complexFunction.apply(this, arguments);
        return cacheObj[argumentCombination];
    }
    return cacheFunction;
}