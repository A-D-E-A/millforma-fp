
function adder(a) {
    return function adda(b) {
        return a + b
    }
}

const _adder = (a) => (b) => a + b;

const add5 = adder(5);
console.log(add5(3));

globalThis.logLevel = "DEBUG";
const levels = ["ERROR", "WARNING", "NORMAL", "DEBUG", "VERBOSE"];

const shouldLog = (level) => {
    return levels.indexOf(level) <= levels.indexOf(globalThis.logLevel);
}

const makeLogger = (level) => (text) => {
    if (!shouldLog(level)) return;
    console.log(`[${level}] (${new Date().toISOString()}): ${text}`);
};

const debugLogger = makeLogger("DEBUG");
const verboseLogger = makeLogger("VERBOSE");
debugLogger("COUCOU");
verboseLogger("HEY");

function curry3(fn) {
    return (arg1) => (arg2) => (arg3) => fn(arg1, arg2, arg3)
};

// In solidjs, adaptable to react et al

const [firstName, setFirstName] = createSignal("");
const [lastName, setLastName] = createSignal("");

const toReturn = { firstName: firstName(), lastName: lastName() };

const makeChanger = (fieldName) => (e) => {
    toReturn[fieldName] = e.target.value;
};

const changeFirstName = makeChanger("firstName");
const changeLastName = makeChanger("lastName");

<input type="text" name="firstName" onChange={changeFirstName} />



