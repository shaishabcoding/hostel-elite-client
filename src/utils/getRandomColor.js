/**
 * Generates a random hexadecimal color code.
 *
 * @returns {string} A random hexadecimal color code in the format #RRGGBB.
 */
export default () => "#" + Math.random().toString(16).slice(2, 8);
