function compose() {
    var argFunctions = [].slice.call(arguments);

    function closure(val) {
        if (argFunctions.length === 0) {
            return val;
        } else if (argFunctions.length == 1) {
            return argFunctions[0].call(this, val);
        }
        return argFunctions.reduceRight(function (cumulative, func) {
            if (argFunctions[argFunctions.length - 1] === cumulative) {
                return func(cumulative.call(this, val));
            }
            return func(cumulative);
        });
    }
    return closure;
}