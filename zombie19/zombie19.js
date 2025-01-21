// @ts-check

//#region types

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

//#endregion types

//#region data init

/**
 * @param {string} name 
 * @param {number} age 
 * @param {PersonStatus} status 
 * @param {Array<Person> | null} relations 
 * @returns {Person} person
 */
const Person = (name, age, status, relations) => ({ name, age, status, relations });

/** @type {(val: any) => Returner<any>} */
const retFn = (val) => () => val;
/** @type {Returner<boolean>} */
const retTrue = retFn(true);

/** @type {() => PersonStatus} */
const initSaneStatus = () => ({ infected: [], immunised: [], isAlive: true });

let dataTree = Person("god", 999, initSaneStatus(), [
	Person("David", 25, initSaneStatus(), [
		Person("Camille", 25, initSaneStatus(), null),
		Person("Julia", 25, initSaneStatus(), null),
		Person("Marie", 25, initSaneStatus(), [
			Person("Jean", 25, initSaneStatus(), null),
			Person("Pascal", 25, initSaneStatus(), null),
			Person("Kevin", 25, initSaneStatus(), null)
		]),
	]),
	Person("Julien", 25, initSaneStatus(), [
		Person("Camille", 25, initSaneStatus(), null),
		Person("Julia", 25, initSaneStatus(), null),
		Person("Marie", 25, initSaneStatus(), [
			Person("Jean", 25, initSaneStatus(), null),
			Person("Pascal", 25, initSaneStatus(), null),
			Person("Kevin", 25, initSaneStatus(), [
				Person("Jean", 25, initSaneStatus(), null),
				Person("Pascal", 25, initSaneStatus(), null),
				Person("Kevin", 25, initSaneStatus(), null),
			]),
		]),
	]),
]);

/**
 * Add the root to a tree, by reference.
 * 
 * @param {Person} tree - reference to a tree
 * @param {Person} root - reference to the root of said tree
 * @returns {void}
 */
function setRoots(tree, root) {
	tree.root = root;
	if (!tree.relations) return;
	tree.relations.forEach((t) => void setRoots(t, tree)); // void for clarity (we don't use the return value)
}

// Check (for TSC) then apply the roots.
if (dataTree.relations === null) throw new Error("No relations in the datatree.");
dataTree.relations.forEach((t) => void setRoots(t, dataTree)); // void for clarity (we don't use the return value)

//#endregion data init

/**
 * Get the base root of a tree, by reference.
 * 
 * @param {Person} tree 
 * @returns {Person}
 */
function getGodRoot(tree) {
	if (!tree.root) return tree;
	return getGodRoot(tree.root);
}

/**
 * Appends a status to a status array if not already present, by value.
 * 
 * @param {Array<string>} baseStatus 
 * @param {string} newStatus 
 * @returns {Array<string>}
 */
function addStatus(baseStatus, newStatus) {
	return [...new Set([...baseStatus, newStatus])];
}

/**
 * Removes a status from a status array if present, by value.
 * 
 * @param {Array<string>} baseStatus 
 * @param {string} toRemove 
 * @returns {Array<string>}
 */
function removeStatus(baseStatus, toRemove) {
	return baseStatus.filter((value) => value !== toRemove);
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction
 * @param {PersonCondition} cond 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function operateStatusDown(tree, status, statusFunction, cond = retTrue, addEffect) {
	/** @type {Person} */
	const newTree = structuredClone(tree);
	if (!newTree.status.isAlive) return newTree;

	const [key, val] = status;
	if (cond(newTree)) newTree.status[key] = statusFunction(newTree.status[key], val);
	if (newTree.relations === null) return newTree;

	newTree.relations = newTree.relations.map((t, i) => {
		if (!t.status.isAlive) return t;
		if (!cond(t)) return t;
		t.status[key] = statusFunction(t.status[key], val);
		t = operateStatusDown(t, status, statusFunction, cond, addEffect);
		return addEffect ? addEffect(t, i) : t;
	});
	return addEffect ? addEffect(newTree, newTree.root?.relations?.indexOf(newTree)) : newTree;
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status 
 * @param {PersonCondition} cond 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function setStatusDown(tree, status, cond = retTrue, addEffect) {
	return operateStatusDown(tree, status, addStatus, cond, addEffect);
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status 
 * @param {PersonCondition} cond 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function removeStatusDown(tree, status, cond = retTrue, addEffect) {
	return operateStatusDown(tree, status, removeStatus, cond, addEffect);
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction
 * @param {PersonCondition} cond 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function operateStatusLateral(tree, status, statusFunction, cond = retTrue, addEffect) {
	const newTree = structuredClone(tree);
	if (!newTree.status.isAlive) return newTree;

	const [key, val] = status;
	if (cond(newTree)) newTree.status[key] = statusFunction(newTree.status[key], val);
	if (!newTree.root) return newTree;

	if (newTree.root.relations === null) throw new Error("Schema compromised: parent does not contain child");
	newTree.root.relations = newTree.root.relations.map((t, i) => {
		if (!t.status.isAlive) return t;
		if (!cond(t)) return t;
		t.status[key] = statusFunction(t.status[key], val);
		return addEffect ? addEffect(t, i) : t;
	});
	return addEffect ? addEffect(newTree, newTree.root?.relations?.indexOf(newTree)) : newTree;
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status 
 * @param {PersonCondition} cond 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function setStatusLateral(tree, status, cond = retTrue, addEffect) {
	return operateStatusLateral(tree, status, addStatus, cond, addEffect);
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function removeStatusLateral(tree, status, cond = retTrue, addEffect) {
	return operateStatusLateral(tree, status, removeStatus, cond, addEffect);
}

/**
 * @param {Person} tree 
 * @param {[string, string]} status
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction
 * @param {PersonCondition} cond 
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function operateStatusUp(tree, status, statusFunction, cond = retTrue, addEffect) {
	let newTree = structuredClone(tree);
	if (!newTree.status.isAlive) return newTree;

	const [key, val] = status;
	if (cond(newTree)) newTree.status[key] = statusFunction(newTree.status[key], val);
	if (!newTree.root) return newTree;
	
	let parent = newTree.root;
	parent = operateStatusLateral(parent, status, statusFunction, cond, addEffect);
	parent = operateStatusUp(parent, status, statusFunction, cond, addEffect);
	parent = addEffect ? addEffect(parent, parent.root?.relations?.indexOf(parent)) : parent;
	newTree.root = parent;
	return addEffect ? addEffect(newTree, parent.relations?.indexOf(newTree)) : newTree;
}

/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function setStatusUp(tree, status, cond = retTrue, addEffect) {
	return operateStatusUp(tree, status, addStatus, cond, addEffect);
}

/**
 * @param {Person} tree
 * @param {[string, string]} status
 * @param {PersonCondition} cond
 * @param {(...any) => Person} [addEffect]
 * @returns {Person}
 */
function removeStatusUp(tree, status, cond = retTrue, addEffect) {
	return operateStatusUp(tree, status, removeStatus, cond, addEffect);
}

/**
 * @param {Person} tree 
 * @param {VirusType} virus 
 * @param {PersonCondition} cond 
 * @returns {Person}
 */
function spreadVirusDown(tree, virus, cond = retTrue) {
	return setStatusDown(tree, ["infected", virus], cond);
}

/**
 * @param {Person} tree 
 * @param {VirusType} virus 
 * @param {PersonCondition} cond 
 * @returns {Person}
 */
function spreadVirusLateral(tree, virus, cond = retTrue) {
	return setStatusLateral(tree, ["infected", virus], cond);
}

/**
 * @param {Person} tree 
 * @param {VirusType} virus 
 * @param {PersonCondition} cond 
 * @returns {Person}
 */
function spreadVirusUp(tree, virus, cond = retTrue) {
	return setStatusUp(tree, ["infected", virus], cond);
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function spreadVirusA(tree) {
	return spreadVirusDown(tree, "A", (t) => !t.status.immunised.includes("A"));
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function spreadVirusB(tree) {
	return spreadVirusUp(tree, "B", (t) => !t.status.immunised.includes("B"));
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function spreadVirus32(tree) {
	/** @type {PersonCondition} */
	const cond = (t) => t.age == 32 && !t.status.immunised.includes("32");
	return spreadVirusDown(spreadVirusUp(tree, "32", cond), "32", cond);
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function spreadVirusC(tree) {
	const newTree = structuredClone(tree);
	if (!newTree.status.isAlive) return newTree;
	if (!newTree.root) return newTree;
	
	if (newTree.root.relations === null) throw new Error("Schema compromised: parent does not contain child");
	newTree.root.relations = newTree.root.relations.map((t, i) => {
		if (!t.status.isAlive) return t;
		if (i % 2) return t;
		if (t.status.immunised.includes("C")) return t;
		t.status.infected = addStatus(t.status.infected, "C");
		return t;
	});
	return newTree;
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function spreadVirusUltimate(tree) {
	const newTree = structuredClone(tree);
	if (!newTree.status.isAlive) return newTree;
	if (newTree.root) return spreadVirusUltimate(newTree.root);
	
	if (newTree.status.immunised.includes("ultimate")) return newTree;

	newTree.status.infected = addStatus(newTree.status.infected, "ultimate");
	return newTree;
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function vaccinateA1(tree) {
	let newTree = structuredClone(tree);
	
	const cond = (t) => t.age >= 0 && t.age <= 30;
	const effect = (tree, index) => {
		tree.status.infected = removeStatus(tree.status.infected, "A");
		tree.status.infected = removeStatus(tree.status.infected, "32");
		tree.status.immunised = addStatus(tree.status.immunised, "A");
		tree.status.immunised = addStatus(tree.status.immunised, "32");
		return tree;
	};

	// Goes to heal and immunise from both A and 32 in one iteration because of the effect.
	newTree = removeStatusDown(removeStatusUp(newTree, ["infected", "A"], cond, effect), ["infected", "A"], cond, effect);
	return newTree;
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function vaccinateB1(tree) {
	let newTree = structuredClone(tree);

	const effect = (tree, index) => {
		if (index % 2) tree.status.isAlive = false;
		else {
			tree.status.infected = addStatus(tree.status.infected, "B");
			tree.status.infected = addStatus(tree.status.infected, "C");
		}
		return tree;
	}

	// Goes to heal both B and C because of the effect.
	newTree = removeStatusDown(removeStatusUp(newTree, ["infected", "B"], retTrue, effect), ["infected", "B"], retTrue, effect);
	return newTree;
}

/**
 * @param {Person} tree 
 * @returns {Person}
 */
function vaccinateUltimate(tree) {
	const newTree = structuredClone(tree);

	newTree.status.infected = newTree.status.infected.filter((value) => value !== "ultimate");
	newTree.status.immunised = addStatus(newTree.status.immunised, "ultimate");
	return newTree;
}










