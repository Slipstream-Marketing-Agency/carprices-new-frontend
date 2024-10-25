// utils/formatNumber.js or utils/formatNumber.ts

/**
 * Formats a number with commas for thousands, millions, etc.
 * @param {number} value The number to format.
 * @returns {string} The formatted number as a string.
 */
export function formatNumberWithCommas(value) {
  return new Intl.NumberFormat('en-US').format(value);
}
