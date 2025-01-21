
const hypot = (a, b) => {
    let ca = a;
    ca *= a;
    let cb = b;
    cb *= b;
    let ret = ca + cb;
    return ret ** (1/2);
}

