// Import all modules
import * as string from './string';
import * as array from './array';
import * as math from './math';
import * as time from './time';
import * as encoding from './encoding';
import * as validation from './validation';
import * as format from './format';
import * as random from './random';
import * as object from './object';

// Namespace exports
export {
  string,
  array,
  math,
  time,
  encoding,
  validation,
  format,
  random,
  object,
};

// Re-export commonly used functions at top level for convenience
export { randomString, capitalize } from './string';
export { randomElement, chunk, unique, shuffle } from './array';
export { randomInt, randomFloat, lerp, clamp, round } from './math';
export {
  timestamp,
  timestampMs,
  formatDateTime,
  formatDuration,
  sleep,
} from './time';
export { toBase64, fromBase64, hash } from './encoding';
export { isEmail, isUrl, isEmpty, isEmoji } from './validation';
export { formatNumber, formatBytes, pluralize } from './format';
export { randomBoolean, randomColor, randomUUID } from './random';
export { deepClone, pick, omit, get, set } from './object';

// Default export - all utilities in one object (like original System class)
const toolkit = {
  string,
  array,
  math,
  time,
  encoding,
  validation,
  format,
  random,
  object,

  // Convenience shortcuts at top level
  randomString: string.randomString,
  capitalize: string.capitalize,
  truncate: string.truncate,

  randomElement: array.randomElement,
  chunk: array.chunk,
  unique: array.unique,
  shuffle: array.shuffle,

  randomInt: math.randomInt,
  randomFloat: math.randomFloat,
  lerp: math.lerp,
  clamp: math.clamp,
  round: math.round,

  timestamp: time.timestamp,
  timestampMs: time.timestampMs,
  formatDateTime: time.formatDateTime,
  formatDuration: time.formatDuration,
  sleep: time.sleep,

  toBase64: encoding.toBase64,
  fromBase64: encoding.fromBase64,
  hash: encoding.hash,

  isEmail: validation.isEmail,
  isUrl: validation.isUrl,
  isEmpty: validation.isEmpty,
  isEmoji: validation.isEmoji,

  formatNumber: format.formatNumber,
  formatBytes: format.formatBytes,
  pluralize: format.pluralize,

  randomBoolean: random.randomBoolean,
  randomColor: random.randomColor,
  randomUUID: random.randomUUID,

  deepClone: object.deepClone,
  pick: object.pick,
  omit: object.omit,
  get: object.get,
  set: object.set,
};

export default toolkit;
