
const techs = [
    {
        id: 1,
        firstName: "Alex",
        lastName: "Allies",
        phoneNumber: "0102030405"
    }
]

const arr = techs.map((t) => ({ id: t.id, label: `${t.firstName} ${t.lastName}`}))
const filer = (tech) => /a/ig.test(tech)
const filteredArray = techs
    .filter(filter)
    .map(myMapper);

const result = [];
for (const value of arr) {
    result.push(value);
}

const sorted = arr.sort((a, b) => {
    if (a.priority === "PANNE TOTALE") return -1;
    if (b.priority === "PANNE TOTALE") return 1;

});

const arr1 = [1, 2, 3];
const arr2 = arr1.toReversed();