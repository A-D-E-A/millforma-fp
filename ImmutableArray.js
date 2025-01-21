class ImmutableArray {
    #arr = [];

    constructor(arr = []) {
        this.#arr = arr;
    }

    push(x) {
        throw new TypeError("Array is immutable");
    }

    sort(x) {}

    filter = Array.prototype.filter.bind(this);
    map = Array.prototype.map.bind(this);
}

function ArrayFreeze(arr) {
    return new ImmutableArray(arr);
}

// no clear, delete, set

function MapFreeze(map) {
    /**  @type {Map} */
    const copy = structuredClone(map);
    copy.clear = () => {
        throw new TypeError("Map is immutable");
    };
    copy.delete = () => {
        throw new TypeError("Map is immutable");
    };
    copy.set = () => {
        throw new TypeError("Map is immutable");
    };
    return copy;
}



