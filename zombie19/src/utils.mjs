/// <reference path="../types/zombie19.d.ts"/>
// @ts-check

/**
 * Get the base root of a tree, by reference.
 * 
 * @param {Person} tree 
 * @returns {Person}
 */
export function getGodRoot(tree) {
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
export function addStatus(baseStatus, newStatus) {
	return [...new Set([...baseStatus, newStatus])];
}

/**
 * Removes a status from a status array if present, by value.
 * 
 * @param {Array<string>} baseStatus 
 * @param {string} toRemove 
 * @returns {Array<string>}
 */
export function removeStatus(baseStatus, toRemove) {
	return baseStatus.filter((value) => value !== toRemove);
}

/**
 * Add the root to a tree, by reference.
 * 
 * @param {Person} tree - reference to a tree
 * @param {Person} root - reference to the root of said tree
 * @returns {void}
 */
export function setRoots(tree, root) {
	tree.root = root;
	if (!tree.relations) return;
	tree.relations.forEach((t) => void setRoots(t, tree)); // void for clarity (we don't use the return value)
}