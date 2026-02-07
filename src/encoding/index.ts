import md5 from 'md5';

/**
 * Encode string to Base64
 * @param str - String to encode
 * @returns Base64 encoded string
 */
export function toBase64(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  // Browser environment
  const codeUnits = new Uint16Array(str.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = str.charCodeAt(i);
  }

  const uint8Array = new Uint8Array(codeUnits.buffer);
  const chunkSize = 0x8000;
  let result = '';

  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    result += String.fromCharCode(...chunk);
  }

  return btoa(result);
}

/**
 * Decode Base64 string
 * @param encoded - Base64 encoded string
 * @returns Decoded string
 */
export function fromBase64(encoded: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  }
  // Browser environment
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

/**
 * Generate MD5 hash of a string
 * @param text - Text to hash
 * @returns MD5 hash
 */
export function hash(text: string): string {
  return md5(text);
}

/**
 * Encode URI component safely
 * @param str - String to encode
 * @returns Encoded URI component
 */
export function encodeUri(str: string): string {
  return encodeURIComponent(str);
}

/**
 * Decode URI component safely
 * @param str - String to decode
 * @returns Decoded URI component
 */
export function decodeUri(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

/**
 * Convert ArrayBuffer to Buffer (Node.js)
 * @param ab - ArrayBuffer to convert
 * @returns Buffer
 */
export function arrayBufferToBuffer(ab: ArrayBuffer): Buffer {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);

  for (let i = 0; i < buf.length; i++) {
    buf[i] = view[i];
  }

  return buf;
}

/**
 * Convert hex string to bytes
 * @param hex - Hex string
 * @returns Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Convert bytes to hex string
 * @param bytes - Byte array
 * @returns Hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
