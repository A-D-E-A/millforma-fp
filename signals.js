const obj = {
    x: 1
};

const proxy = new Proxy(obj, {
    get: (target, property) => {
        console.log(`Getting property ${property}`);
        return Reflect.get(target, property);
    },
    set: (target, property, value) => {
        console.log(`Setting property ${property}`);
        return Reflect.set(target, property, value)
    }
});

console.log(proxy);
proxy.key = 3;
const _ = proxy.key;

function createSignal(x) {
    let value = x;
    return [
        () => value,
        (y) => { x = y }
    ];
}

const mystate = useState(0);
const [getState, setState] = createSignal(0);
console.log(getState());
setState(1);
console.log(getState());
