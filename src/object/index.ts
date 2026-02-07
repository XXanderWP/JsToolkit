/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (obj instanceof Object) {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
}

type PlainObject = Record<string, unknown>;

/**
 * Deep merge two or more objects (mutates target)
 */
export function deepMerge<T extends PlainObject>(
  target: T,
  ...sources: PlainObject[]
): T {
  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (!isObject(targetValue)) {
          (target as any)[key] = {};
        }
        deepMerge(target[key] as PlainObject, sourceValue);
      } else {
        (target as any)[key] = sourceValue;
      }
    }
  }

  return target;
}

/**
 * Get nested property value from object using path
 * @param obj - Object to get value from
 * @param path - Property path (e.g., 'user.address.city')
 * @param defaultValue - Default value if path not found
 * @returns Property value or default
 */
export function get<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result as T;
}

/**
 * Set nested property value in object using path
 * @param obj - Object to set value in
 * @param path - Property path (e.g., 'user.address.city')
 * @param value - Value to set
 * @returns Modified object
 */
export function set<T extends Record<string, any>>(
  obj: T,
  path: string,
  value: any
): T {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      (current as any)[key] = {};
    }
    current = current[key];
  }

  (current as any)[lastKey] = value;
  return obj;
}

/**
 * Pick specific properties from object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with picked properties
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific properties from object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted properties
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Check if value is a plain object
 * @param value - Value to check
 * @returns True if plain object
 */
function isObject(value: any): value is Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Flatten nested object to single level with dot notation keys
 * @param obj - Object to flatten
 * @param prefix - Key prefix (used internally)
 * @returns Flattened object
 */
export function flatten(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (isObject(obj[key]) && !Array.isArray(obj[key])) {
        Object.assign(result, flatten(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

/**
 * Unflatten object with dot notation keys to nested object
 * @param obj - Flattened object
 * @returns Nested object
 */
export function unflatten(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      set(result, key, obj[key]);
    }
  }

  return result;
}

/**
 * Get all keys from object including nested keys (dot notation)
 * @param obj - Object to get keys from
 * @param prefix - Key prefix (used internally)
 * @returns Array of all keys
 */
export function keys(obj: Record<string, any>, prefix = ''): string[] {
  const result: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      result.push(newKey);

      if (isObject(obj[key]) && !Array.isArray(obj[key])) {
        result.push(...keys(obj[key], newKey));
      }
    }
  }

  return result;
}

/**
 * Get all values from object including nested values
 * @param obj - Object to get values from
 * @returns Array of all values
 */
export function values(obj: Record<string, any>): any[] {
  const result: any[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key]) && !Array.isArray(obj[key])) {
        result.push(...values(obj[key]));
      } else {
        result.push(obj[key]);
      }
    }
  }

  return result;
}

/**
 * Check if two objects are deeply equal
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns True if objects are equal
 */
export function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
