
const obj = Object.freeze({
    key: 1,
    piège: Object.freeze({
        hello: "world"
    })
});

const badCopy = { ...obj };
const obj2 = structuredClone(obj);

obj.key = 2;
obj2.key = 3;
obj2.piège.hello = "adam";

console.log(obj, obj2);

const parent = {
    name: "Jean Dupont",
    age: 43,
    children: []
};

const child1 = {
    name: "Gosse 1",
    age: "je sais pas",
    parent: [parent]
};

const child2 = {
    name: "Gosse moins important",
    age: "J'étais bourré",
    parent: [parent]
};

parent.children.push(child1, child2);

console.log(JSON.stringify(parent));

