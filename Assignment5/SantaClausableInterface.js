function isSantaClausable(obj) {
    var flag = false;
    return typeof (obj.sayHoHoHo) === typeof (obj.distributeGifts) &&
        typeof (obj.distributeGifts) === typeof (obj.goDownTheChimney) &&
        typeof (obj.goDownTheChimney) === 'function';
}