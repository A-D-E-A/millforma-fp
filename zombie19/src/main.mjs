/// <reference path="../types/zombie19.d.ts"/>
// @ts-check

import { setRoots } from "./utils.mjs";
import { 
    spreadVirusA,
    spreadVirusB,
    spreadVirusC,
    spreadVirus32,
    spreadVirusUltimate,
    vaccinateA1,
    vaccinateB1,
    vaccinateUltimate,
} from './libvirus.mjs';

/** @type {Person} */
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

// Check (for TSC) then apply the roots.
if (dataTree.relations === null) throw new Error("No relations in the datatree.");
dataTree.relations.forEach((t) => void setRoots(t, dataTree)); // void for clarity (we don't use the return value)

// Var needed solely to stop Rollup from deleting unused imports.
let _keepImports = vaccinateA1(vaccinateB1(vaccinateUltimate(spreadVirus32(spreadVirusA(spreadVirusB(spreadVirusC(spreadVirusUltimate(dataTree))))))));
