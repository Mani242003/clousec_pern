/**
 * Format a date string into a more readable format
 * @param dateString - ISO date string from the API
 * @returns Formatted date string (e.g., "May 15, 2025")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
