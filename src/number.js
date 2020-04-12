import BigNumber from "bignumber.js";

/**
 * normalize amount of money
 * @param {any} amount amount
 * @returns {string}
 */
export const formatAmount = (amount) => {
  const number = new BigNumber(amount);
  if (number.isNaN()) {
    return "";
  }
  return number.toFormat(2, {
    prefix: "",
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: " ",
    fractionGroupSize: 0,
    suffix: "",
  });
};
