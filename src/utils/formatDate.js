/**
 * Lightweight date formatting utilities to replace moment.js
 */

/**
 * Returns the ordinal suffix for a day number (st, nd, rd, th)
 * @param {number} day
 * @returns {string}
 */
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/**
 * Formats a date as "MMMM Do YYYY" (e.g., "January 1st 2025")
 * Replaces moment(date).format("MMMM Do YYYY")
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateLong(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}${getOrdinalSuffix(day)} ${year}`;
}

/**
 * Formats a date as "MMMM D, YYYY" (e.g., "January 1, 2025")
 * Replaces moment(date).format("MMMM D, YYYY")
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateFull(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a date as "MMM D, YYYY" (e.g., "Jan 1, 2025")
 * Replaces moment(date).format("MMM D, YYYY")
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateShort(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a date as "YYYY-MM-DD"
 * Replaces moment(date).format("YYYY-MM-DD")
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateISO(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

/**
 * Returns a human-readable relative time string (e.g., "2 hours ago")
 * Replaces moment(date).fromNow()
 * @param {string|Date} date
 * @returns {string}
 */
export function timeAgo(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  if (seconds < 0) return "just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
