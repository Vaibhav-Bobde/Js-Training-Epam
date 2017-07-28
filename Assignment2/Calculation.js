function zero(operation) {
    return calculate(0, operation);
}
function one(operation) {
    return calculate(1, operation);
}
function two(operation) {
    return calculate(2, operation);
}
function three(operation) {
    return calculate(3, operation);
}
function four(operation) {
    return calculate(4, operation);
}
function five(operation) {
    return calculate(5, operation);
}
function six(operation) {
    return calculate(6, operation);
}
function seven(operation) {
    return calculate(7, operation);
}
function eight(operation) {
    return calculate(8, operation);
}
function nine(operation) {
    return calculate(9, operation);
}

function plus(secOperand) {
    return function (firstOperand) {
        return firstOperand + secOperand;
    };
}
function minus(secOperand) {
    return function (firstOperand) {
        return firstOperand - secOperand;
    };
}
function times(secOperand) {
    return function (firstOperand) {
        return firstOperand * secOperand;
    };
}
function dividedBy(secOperand) {
    return function (firstOperand) {
        return firstOperand / secOperand;
    };
}
function calculate(operand, operation) {
    return operation ? operation(operand) : operand;
}