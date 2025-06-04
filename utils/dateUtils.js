/**
 * Formats a date string into a human-readable format
 * @param {string} dateString - The date string to format (e.g., '2023-05-15')
 * @returns {string} Formatted date (e.g., 'May 15, 2023')
 */
export function formatCallDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Formats duration in seconds to MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration (e.g., '12:45')
 */
export function formatDuration(seconds) {
  if(!seconds || seconds < 0) {
    return "00:00"; // Handle negative seconds gracefully
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hrsStr = hrs > 0 ? `${hrs}:` : "";
  const minsStr = hrs > 0 ? String(mins).padStart(2, "0") : String(mins); // pad minutes if hours exist
  const secsStr = String(secs).padStart(2, "0");

  return `${hrsStr}${minsStr}:${secsStr}`;
};