/**
 * transform empty values in params into '-'
 * @param {Array} literals array of split strings
 * @param {Array} values array of parameters
 * @returns {string}
 */
export function provision(literals, ...values) {
  let output = "";
  let i;
  for (i = 0; i < values.length; i++) {
    const r = !values[i] && values[i] !== 0 ? "-" : values[i];
    output += literals[i] + r;
  }

  output += literals[i];
  return output;
}
