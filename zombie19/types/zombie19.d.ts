/**
 * Add the root to a tree, by reference.
 *
 * @param {Person} tree - reference to a tree
 * @param {Person} root - reference to the root of said tree
 * @returns {void}
 */
declare function setRoots(tree: Person, root: Person): void;
/**
 * Get the base root of a tree, by reference.
 *
 * @param {Person} tree
 * @returns {Person}
 */
declare function getGodRoot(tree: Person): Person;
/**
 * Appends a status to a status array if not already present, by value.
 *
 * @param {Array<string>} baseStatus
 * @param {string} newStatus
 * @returns {Array<string>}
 */
declare function addStatus(baseStatus: Array<string>, newStatus: string): Array<string>;
/**
 * Removes a status from a status array if present, by value.
 *
 * @param {Array<string>} baseStatus
 * @param {string} toRemove
 * @returns {Array<string>}
 */
declare function removeStatus(baseStatus: Array<string>, toRemove: string): Array<string>;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function operateStatusDown(tree: Person, status: [string, string], statusFunction: (base: Array<string>, next: string) => Array<string>, cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function setStatusDown(tree: Person, status: [string, string], cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function removeStatusDown(tree: Person, status: [string, string], cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function operateStatusLateral(tree: Person, status: [string, string], statusFunction: (base: Array<string>, next: string) => Array<string>, cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function setStatusLateral(tree: Person, status: [string, string], cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function removeStatusLateral(tree: Person, status: [string, string], cond?: Returner<boolean>, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function operateStatusUp(tree: Person, status: [string, string], statusFunction: (base: Array<string>, next: string) => Array<string>, cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function setStatusUp(tree: Person, status: [string, string], cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
declare function removeStatusUp(tree: Person, status: [string, string], cond?: PersonCondition, addEffect?: (...any: any[]) => Person): Person;
/**
 * @param {Person} tree
 * @param {VirusType} virus
 * @param {PersonCondition} cond
 * @returns {Person}
 */
declare function spreadVirusDown(tree: Person, virus: VirusType, cond?: PersonCondition): Person;
/**
 * @param {Person} tree
 * @param {VirusType} virus
 * @param {PersonCondition} cond
 * @returns {Person}
 */
declare function spreadVirusLateral(tree: Person, virus: VirusType, cond?: PersonCondition): Person;
/**
 * @param {Person} tree
 * @param {VirusType} virus
 * @param {PersonCondition} cond
 * @returns {Person}
 */
declare function spreadVirusUp(tree: Person, virus: VirusType, cond?: PersonCondition): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function spreadVirusA(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function spreadVirusB(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function spreadVirus32(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function spreadVirusC(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function spreadVirusUltimate(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function vaccinateA1(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function vaccinateB1(tree: Person): Person;
/**
 * @param {Person} tree
 * @returns {Person}
 */
declare function vaccinateUltimate(tree: Person): Person;
type Person = {
    name: string;
    age: number;
    status: PersonStatus;
    relations: Array<Person> | null;
    root?: Person;
};
/**
 * @typedef {Object} PersonStatus
 * @property {Array<string>} infected
 * @property {Array<string>} immunised
 * @property {boolean} isAlive
 */
/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {number} age
 * @property {PersonStatus} status
 * @property {Array<Person> | null} relations
 * @property {Person} [root]
 */
/**
 * @typedef {"A" | "B" | "C" | "32" | "ultimate"} VirusType
 */
/**
 * @template T
 * @callback Returner
 * @param {any} val
 * @returns {T}
 */
/**
 * @callback PersonCondition
 * @param {Person} value
 * @returns {boolean}
 */
/**
 * @param {string} name
 * @param {number} age
 * @param {PersonStatus} status
 * @param {Array<Person> | null} relations
 * @returns {Person} person
 */
declare function Person(name: string, age: number, status: PersonStatus, relations: Array<Person> | null): Person;
/** @type {(val: any) => Returner<any>} */
declare const retFn: (val: any) => Returner<any>;
/** @type {Returner<boolean>} */
declare const retTrue: Returner<boolean>;
/** @type {() => PersonStatus} */
declare const initSaneStatus: () => PersonStatus;
declare namespace dataTree {
    const name: string;
    const age: number;
    const status: PersonStatus;
    const relations: Array<Person> | null;
    const root: Person;
}
type PersonStatus = {
    infected: Array<string>;
    immunised: Array<string>;
    isAlive: boolean;
};
type VirusType = "A" | "B" | "C" | "32" | "ultimate";
type Returner<T> = (val: any) => T;
type PersonCondition = (value: Person) => boolean;
//# sourceMappingURL=zombie19.d.ts.map