
/**
 * Here's my fib function
 * @param {number} x - the input
 * @returns {number} the output
 */
function fibonacci(x) {
    if (x === 0) return 0;
    if (x === 1) return 1;
    return fibonacci(x - 1) + fibonacci(x - 2);
}

/**
 * 
 * @param {number} n 
 * @param {number} a 
 * @param {number} b
 * @returns {number} 
 */
function fibonnaciHelper(n, a = 0, b = 1) {
    if (n === 0) return a;
    if (n === 1) return b;
    return fibonnaciHelper(n - 1, b, a + b);
}


