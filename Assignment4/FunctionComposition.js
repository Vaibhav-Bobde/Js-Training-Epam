function compose(f, g) {
    return function closure() {
        return f.call(this, g.apply(this, arguments));
    }
}