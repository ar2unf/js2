
const sum = (a, b) => {
    if (a != null && a != undefined
    && b != null && b != undefined
    && typeof(a)!="string" && typeof(b)!="string") {
        return a+b
    } else {
        return 'аргумент не число'
    }
}
const sub = (a, b) => {
    if (a != null && a != undefined
    && b != null && b != undefined
    && typeof(a)!="string" && typeof(b)!="string") {
        return a-b
    } else {
        return 'аргумент не число'
    }
}

const mul = (a, b) => {
    if (a != null && a != undefined
    && b != null && b != undefined
    && typeof(a)!="string" && typeof(b)!="string") {
        return a*b
    } else {
        return 'аргумент не число'
    }
}

const div = (a, b) => {
    if (a != null && a != undefined
    && b != null && b != undefined
    && typeof(a)!="string" && typeof(b)!="string") {
        if(b==0 ){
            return 'На ноль делить нельзя'
        }
        return a/b
    } else {
        return 'аргумент не число'
    }
}

module.exports = {
    sum,
    sub,
    mul,
    div
};