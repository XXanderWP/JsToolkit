/**
 * Check if a string is a valid emoji
 * @param str - String to check
 * @returns True if string is an emoji
 */
export function isEmoji(str: string): boolean {
  const emojiRegex = new RegExp(
    '^(' +
      // Regular and compound emojis
      '(?:\\p{Extended_Pictographic}(?:\\p{Emoji_Modifier}|\\uFE0F)?' +
      '(?:\\u200D\\p{Extended_Pictographic}(?:\\p{Emoji_Modifier}|\\uFE0F)?)*)' +
      '|' +
      // Flags (regional indicator pairs)
      '(?:\\p{Regional_Indicator}{2})' +
      ')$',
    'u'
  );

  return emojiRegex.test(str);
}

/**
 * Check if a URL is an image link
 * @param url - URL to check
 * @returns True if URL points to an image
 */
export function isImageUrl(url: string): boolean {
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|ico)(\?.*)?$/i;
  return imageExtensions.test(url);
}

/**
 * Check if a string is a valid email
 * @param email - Email string to validate
 * @returns True if email is valid
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is a valid URL
 * @param url - URL string to validate
 * @returns True if URL is valid
 */
export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a string contains only numbers
 * @param str - String to check
 * @returns True if string contains only numbers
 */
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * Check if a string contains only letters
 * @param str - String to check
 * @returns True if string contains only letters
 */
export function isAlpha(str: string): boolean {
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Check if a string contains only letters and numbers
 * @param str - String to check
 * @returns True if string is alphanumeric
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns True if value is empty
 */
export function isEmpty(
  value: unknown
): value is null | undefined | '' | [] | Record<string, never> {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Check if a value is a plain object
 * @param value - Value to check
 * @returns True if value is a plain object
 */
export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

/**
 * Extract URL information from a string
 * @param str - String containing URL
 * @returns URL info or null if no URL found
 */
export function extractUrl(
  str: string
): { url: string; domain: string } | null {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[\w-]+\.[\w-]+[^\s]*)/i;

  const match = str.match(urlRegex);
  if (!match) return null;

  const rawUrl = match[0].startsWith('http') ? match[0] : `https://${match[0]}`;

  try {
    const parsed = new URL(rawUrl);

    return {
      url: parsed.href,
      domain: parsed.hostname.replace(/^www\./, ''),
    };
  } catch {
    return null;
  }
}

/**
 * Check if a string is a valid IPv4 address
 * @param ip - IP address string
 * @returns True if valid IPv4
 */
export function isIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

/**
 * Check if a string is a valid hex color
 * @param color - Color string
 * @returns True if valid hex color
 */
export function isHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}
