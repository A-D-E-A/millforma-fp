
// On liste les nombres de 1 à 100;
// Si un nombre est multiple de 3, on affiche "Fizz"
// Si un nombre est multiple de 5, on affiche "Buzz"
// Si un nombre est multiple de 3 et 5, on affiche "FizzBuzz"
// Sinon, on affiche le nombre.

const FIZZ_BUZZ_COUNT = 106;
const fizzBuzzMap = [[3, "Fizz"], [5, "Buzz"], [7, "Bazz"]];
const naturals = Array.from({ length: FIZZ_BUZZ_COUNT }, (_, i) => i + 1);

const fizzBuzzReducer = (n) => (acc, [divisor, word]) => {
    return n % divisor === 0 ? acc + word : acc;
}

const fizzBuzzStep = (n) => fizzBuzzMap.reduce(fizzBuzzReducer(n), "") || n;

const logger = (value) => console.log(value);

naturals
    .map(fizzBuzzStep)
    .forEach(logger);
