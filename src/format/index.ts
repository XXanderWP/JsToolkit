/**
 * Format a number with thousands separators
 * @param num - Number to format
 * @param removeTrailingZeros - Remove .00 from integers (default: true)
 * @returns Formatted number string
 */
export function formatNumber(num: number, removeTrailingZeros = true): string {
  if (typeof num !== 'number') {
    num = Number(num);
  }

  let n = num.toFixed(2);

  if (removeTrailingZeros) {
    n = n.replace('.00', '');
  }

  return n.replace(/.+?(?=\D|$)/, (match) => {
    return match.replace(/(\d)(?=(?:\d{3})+$)/g, '$1 ');
  });
}

/**
 * Format bytes to human-readable size
 * @param bytes - Number of bytes
 * @param decimals - Decimal places (default: 2)
 * @returns Formatted size string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
  );
}

/**
 * Format a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format a phone number (basic US format)
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
}

/**
 * Format a credit card number with spaces
 * @param cardNumber - Card number string
 * @returns Formatted card number
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cardNumber;
}

/**
 * Mask sensitive data (show only last N characters)
 * @param str - String to mask
 * @param visibleChars - Number of visible characters at the end (default: 4)
 * @param maskChar - Character to use for masking (default: '*')
 * @returns Masked string
 */
export function maskString(
  str: string,
  visibleChars = 4,
  maskChar = '*'
): string {
  if (str.length <= visibleChars) return str;
  const masked = maskChar.repeat(str.length - visibleChars);
  return masked + str.slice(-visibleChars);
}

/**
 * Format percentage
 * @param value - Value to format
 * @param decimals - Decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Pluralize a word based on count
 * @param count - Count number
 * @param singular - Singular form
 * @param plural - Plural form (optional, will add 's' if not provided)
 * @returns Pluralized string with count
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  const word = count === 1 ? singular : plural || `${singular}s`;
  return `${count} ${word}`;
}

/**
 * Abbreviate large numbers (1000 -> 1K, 1000000 -> 1M)
 * @param num - Number to abbreviate
 * @param decimals - Decimal places (default: 1)
 * @returns Abbreviated number string
 */
export function abbreviateNumber(num: number, decimals = 1): string {
  if (num < 1000) return num.toString();

  const units = ['K', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(num) / 3);
  const unitIndex = order - 1;

  if (unitIndex >= units.length) {
    return num.toExponential(decimals);
  }

  const value = num / Math.pow(1000, order);
  return `${value.toFixed(decimals)}${units[unitIndex]}`;
}

/**
 * Format file name with extension
 * @param name - File name without extension
 * @param extension - File extension
 * @returns Formatted file name
 */
export function formatFileName(name: string, extension: string): string {
  const cleanName = name.replace(/[^a-z0-9_-]/gi, '_');
  const cleanExt = extension.replace(/^\./, '');
  return `${cleanName}.${cleanExt}`;
}

/**
 * Title case a string (capitalize first letter of each word)
 * @param str - String to title case
 * @returns Title cased string
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
