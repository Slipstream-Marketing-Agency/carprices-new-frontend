export function slugToCapitalCase(slug) {
  if (!slug) return ''; // Return an empty string if slug is undefined

  return slug
    .toLowerCase()
    .split('-')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
