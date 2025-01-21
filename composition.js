
const compose = (...fns) => {
    return (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

const pipe = (...fns) => {
    return (arg) => fns.reduce((acc, fn) => fn(acc), arg);
}

const myAge = 24;
const myAgeSquared = square(myAge);
const myAgeSquaredHalved = myAgeSquared / 2;

pipe(square, (x) => x /2)(myAge);
compose((x) => x / 2, square)(myAge);

const checkId = (x) => Number(x);
const getName = (id) => techniciansStore.get(id);
const getTechnicianName = pipe(checkId, getName);
