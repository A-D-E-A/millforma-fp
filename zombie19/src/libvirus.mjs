/// <reference path="../types/zombie19.d.ts"/>
// @ts-check

import {
	setStatusDown,
	setStatusLateral,
	setStatusUp,
	removeStatusDown,
	removeStatusUp
} from './libstatus.mjs';

/**
 * Spread a given virus downwards.
 * 
 * @param {Person} tree The person to infect first, (patient 0).
 * @param {VirusType} virus The virus to give them.
 * @param {PersonCondition} cond The optional condition to know whether we should infect this person or not.
 * @returns {Person}
 */
function spreadVirusDown(tree, virus, cond = retTrue) {
	return setStatusDown(tree, ["infected", virus], cond);
}

/**
 * Spread a given virus laterally.
 * 
 * @param {Person} tree The person to infect first, (patient 0).
 * @param {VirusType} virus The virus to give them.
 * @param {PersonCondition} cond The optional condition to know whether we should infect this person or not.
 * @returns {Person}
 */
function spreadVirusLateral(tree, virus, cond = retTrue) {
	return setStatusLateral(tree, ["infected", virus], cond);
}

/**
 * Spread a given virus upwards.
 * 
 * @param {Person} tree The person to infect first, (patient 0).
 * @param {VirusType} virus The virus to give them.
 * @param {PersonCondition} cond The optional condition to know whether we should infect this person or not.
 * @returns {Person}
 */
function spreadVirusUp(tree, virus, cond = retTrue) {
	return setStatusUp(tree, ["infected", virus], cond);
}

/**
 * Infect a person with the 'A' virus.
 * (infects all relations downwards)
 * 
 * @param {Person} tree Patient 0 to infect with the virus.
 * @returns {Person}
 */
export function spreadVirusA(tree) {
	return spreadVirusDown(tree, "A", (t) => !t.status.immunised.includes("A"));
}

/**
 * Infect a person with the 'B' virus.
 * (infects all relations upwards)
 * 
 * @param {Person} tree Patient 0 to infect with the virus.
 * @returns {Person}
 */
export function spreadVirusB(tree) {
	return spreadVirusUp(tree, "B", (t) => !t.status.immunised.includes("B"));
}

/**
 * Infect a person with the '32' virus.
 * (infect all relations with the age '32' both upwards and downwards)
 * 
 * @param {Person} tree Patient 0 to infect with the virus.
 * @returns {Person}
 */
export function spreadVirus32(tree) {
	/** @type {PersonCondition} */
	const cond = (t) => t.age == 32 && !t.status.immunised.includes("32");
	return spreadVirusDown(spreadVirusUp(tree, "32", cond), "32", cond);
}

/**
 * Infect someone with the 'C' virus.
 * (infects half of the people laterally)
 * 
 * @param {Person} tree Patient 0 to infect with the virus.
 * @returns {Person}
 */
export function spreadVirusC(tree) {
	/** @type {Person} */
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
 * Infect the tree with the 'ultimate' virus.
 * (infects the absolute root of the tree)
 * 
 * @param {Person} tree Person that is either the absolute root or a child linked to it.
 * @returns {Person}
 */
export function spreadVirusUltimate(tree) {
	/** @type {Person} */
	const newTree = structuredClone(tree);
	if (!newTree.status.isAlive) return newTree;
	if (newTree.root) return spreadVirusUltimate(newTree.root);
	
	if (newTree.status.immunised.includes("ultimate")) return newTree;

	newTree.status.infected = addStatus(newTree.status.infected, "ultimate");
	return newTree;
}

/**
 * Vaccinate with the 'A1' vaccine against 'A' and '32'.
 * (heals and protects both upwards and downwards on patients less than 30 years old)
 * 
 * @param {Person} tree Patient 0 to vaccinate.
 * @returns {Person}
 */
export function vaccinateA1(tree) {
	/** @type {Person} */
	let newTree = structuredClone(tree);
	
	/** @type {PersonCondition} */
	const cond = (t) => t.age >= 0 && t.age <= 30;

	/**
	 * @param {Person} tree 
	 * @param {number} index 
	 * @returns {Person}
	 */
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
 * Vaccinate with the 'B1' vaccine against 'B' and 'C'.
 * (either kills or heals people laterally with a 50-50 chance, probably made in China)
 * 
 * @param {Person} tree Patient 0 to vaccinate.
 * @returns {Person}
 */
export function vaccinateB1(tree) {
	/** @type {Person} */
	let newTree = structuredClone(tree);

	/**
	 * @param {Person} tree
	 * @param {number} index
	 * @returns {Person}
	 */
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
 * Vaccinate with the 'ultimate' vaccine against 'ultimate'.
 * (heals and protects from ultimate, and their fanbase)
 * 
 * @param {Person} tree 
 * @returns {Person}
 */
export function vaccinateUltimate(tree) {
	/** @type {Person} */
	const newTree = structuredClone(tree);

	newTree.status.infected = newTree.status.infected.filter((value) => value !== "ultimate");
	newTree.status.immunised = addStatus(newTree.status.immunised, "ultimate");
	return newTree;
}