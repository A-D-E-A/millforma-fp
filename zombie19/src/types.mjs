/// <reference path="../types/zombie19.d.ts"/>
// @ts-check

/**
 * Person "constructor".
 * Actually just a method to make an object with its parameters.
 * 
 * @param {string} name 
 * @param {number} age 
 * @param {PersonStatus} status 
 * @param {Array<Person> | null} relations 
 * @returns {Person} person
 */
export const Person = (name, age, status, relations) => ({ name, age, status, relations });

/** @type {(val: any) => Returner<any>} */
export const retFn = (val) => () => val;
/** @type {Returner<boolean>} */
export const retTrue = retFn(true);

/** @type {() => PersonStatus} */
export const initSaneStatus = () => ({ infected: [], immunised: [], isAlive: true });
