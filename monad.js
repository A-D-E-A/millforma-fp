/**
 * Une monade est un type de donnée qui encapsule une valeur
 * et qui permet de chaîner des opérations sur cette valeur.
 * 
 * Un exemple connu de monade est le type Promise en JavaScript.
 * C'est une monade car elle encapsule une valeur qui n'est pas
 * encore connue, et qui permet de chaîner des opérations asynchrones
 * sur cette valeur.
 * 
 * En JavaScript, on peut créer une monade en utilisant une fonction
 * qui prend une valeur en argument et qui retourne un objet avec
 * une méthode `map` qui prend une fonction en argument et qui retourne
 * un nouvel objet monadique.
 */

// Exemple de code de monade "Maybe"
//
// const Maybe = (value) => ({
//     map: (fn) => value ? Maybe(fn(value)) : Maybe(null),
//     value: value
// });

// const maybe = Maybe(42);
// const result = maybe
//     .map((value) => value + 1)
//     .map((value) => value * 2)
//     .value;

// L'intérêt des monades est de pouvoir chaîner des opérations
// sur des valeurs sans avoir à vérifier si la valeur est définie
// ou non à chaque étape.

const Nothing = { value: undefined, tag: Symbol("__NOTHING") };

const Maybe = (value) => ({
    map: (fn) => value !== Nothing ? Maybe(fn(value)) : Maybe(Nothing),
    unwrap: () => value,
    value: value
});


