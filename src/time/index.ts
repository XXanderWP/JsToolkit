/**
 * Get current Unix timestamp in seconds
 * @returns Current timestamp
 */
export function timestamp(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Get current Unix timestamp in milliseconds
 * @returns Current timestamp in ms
 */
export function timestampMs(): number {
  return Date.now();
}

/**
 * Format a number with leading zero
 * @param num - Number to format
 * @returns Formatted string
 */
export function padZero(num: number | string): string {
  return `0${num}`.slice(-2);
}

/**
 * Get full date and time string
 * @param date - Date object (default: current date)
 * @returns Formatted date string (DD.MM.YYYY HH:MM)
 */
export function formatDateTime(date = new Date()): string {
  return `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}.${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

/**
 * Get full date and time string with seconds
 * @param date - Date object (default: current date)
 * @returns Formatted date string (DD.MM.YYYY HH:MM:SS)
 */
export function formatDateTimeSeconds(date = new Date()): string {
  return `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}.${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
}

/**
 * Get date without time
 * @param date - Date object (default: current date)
 * @returns Formatted date string (DD.MM.YYYY)
 */
export function formatDate(date = new Date()): string {
  return `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

/**
 * Format timestamp to readable date/time string
 * Shows only time if date is today, otherwise shows date and time
 * @param time - Unix timestamp in seconds (default: current time)
 * @param alwaysShowDate - Always show date even if today
 * @returns Formatted string
 */
export function formatTimestamp(
  time = timestamp(),
  alwaysShowDate = false
): string {
  const now = new Date();
  const date = new Date(time * 1000);

  let result = `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;

  const isToday =
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (alwaysShowDate || !isToday) {
    const showYear = now.getFullYear() !== date.getFullYear() || alwaysShowDate;
    result = `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}${showYear ? `.${date.getFullYear()}` : ''} ${result}`;
  }

  return result;
}

/**
 * Convert seconds to formatted duration string (HH:MM:SS or D:HH:MM:SS)
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = '';

  if (days > 0) {
    result += `${days}:`;
  }

  result += `${hours.toString().padStart(2, '0')}:`;
  result += `${minutes.toString().padStart(2, '0')}:`;
  result += `${secs.toString().padStart(2, '0')}`;

  return result;
}

/**
 * Convert milliseconds to formatted duration string with ms
 * @param ms - Duration in milliseconds
 * @returns Formatted duration string (HH:MM:SS.mmm)
 */
export function formatDurationMs(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  let result = formatDuration(seconds);

  const milliseconds = (ms % 1000).toString().padStart(3, '0');
  result += `.${milliseconds}`;

  return result;
}

/**
 * Sleep/delay for specified milliseconds
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is yesterday
 * @param date - Date to check
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - Date to compare
 * @param now - Reference date (default: current date)
 * @returns Relative time string
 */
export function timeAgo(date: Date, now = new Date()): string {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const isFuture = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(absSeconds / interval.seconds);
    if (count >= 1) {
      const plural = count > 1 ? 's' : '';
      return isFuture
        ? `in ${count} ${interval.label}${plural}`
        : `${count} ${interval.label}${plural} ago`;
    }
  }

  return 'just now';
}
