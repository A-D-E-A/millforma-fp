import Immutable from "immutable";

const map = new Immutable.Map({ 
    a: 1, 
    b: 2, 
    c: 3 
});

let map2;

for (let i = 0; i < 1000000; i++) {
    map2 = map.set("a", 10);
}


