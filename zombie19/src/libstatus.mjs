/// <reference path="../types/zombie19.d.ts"/>
// @ts-check

import { retTrue } from './types.mjs';

/**
 * Do something with the status of a person (either add or delete something), then iterate on all descendants.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction Either 'addStatus' or 'removeStatus'.
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
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
 * Add a certain status to a person and all its descendants.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
export function setStatusDown(tree, status, cond = retTrue, addEffect) {
	return operateStatusDown(tree, status, addStatus, cond, addEffect);
}

/**
 * Remove a certain status from a person and all its descendants.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
export function removeStatusDown(tree, status, cond = retTrue, addEffect) {
	return operateStatusDown(tree, status, removeStatus, cond, addEffect);
}

/**
 * Operate on a person's status (either add or delete something) and all persons connected "laterally",
 * meaning persons with the same root.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction Either 'addStatus' or 'removeStatus'.
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
function operateStatusLateral(tree, status, statusFunction, cond = retTrue, addEffect) {
    /** @type {Person} */
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
 * Add a status to all persons laterally connected to this one.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
export function setStatusLateral(tree, status, cond = retTrue, addEffect) {
	return operateStatusLateral(tree, status, addStatus, cond, addEffect);
}

/**
 * Remove a certain status from persons laterally connected.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
export function removeStatusLateral(tree, status, cond = retTrue, addEffect) {
	return operateStatusLateral(tree, status, removeStatus, cond, addEffect);
}

/**
 * Operate on a person's status (either add or delete something) and all the ones up in the tree
 * (meaning each parent and their lateral connections).
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {(base: Array<string>, next: string) => Array<string>} statusFunction Either 'addStatus' or 'removeStatus'.
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
function operateStatusUp(tree, status, statusFunction, cond = retTrue, addEffect) {
    /** @type {Person} */
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
 * Add a status to a person and all their upward connections.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
export function setStatusUp(tree, status, cond = retTrue, addEffect) {
	return operateStatusUp(tree, status, addStatus, cond, addEffect);
}

/**
 * Removes a status from someone and all their upward connections.
 * 
 * @param {Person} tree Person to udpate
 * @param {[string, string]} status Something like ["infected", "A"] or ["immunised", "B"].
 * @param {PersonCondition} cond A condition to know whether to apply the op or not.
 * @param {(...any) => Person} [addEffect] Additionnal effect to do after the base update.
 * @returns {Person}
 */
export function removeStatusUp(tree, status, cond = retTrue, addEffect) {
	return operateStatusUp(tree, status, removeStatus, cond, addEffect);
}