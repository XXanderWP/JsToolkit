/**
 * Get a random element from an array
 * @param arr - Array to pick from
 * @returns Random element
 */
export function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get a random index from an array
 * @param arr - Array to pick from
 * @returns Random index
 */
export function randomElementIndex<T>(arr: T[]): number {
  return Math.floor(Math.random() * arr.length);
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param arr - Array to shuffle
 * @returns Shuffled array (new array)
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Split an array into chunks of specified size
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Remove duplicate values from an array
 * @param arr - Array to deduplicate
 * @returns Array without duplicates
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Get the intersection of two arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Intersection array
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * Get the difference of two arrays (elements in arr1 but not in arr2)
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Difference array
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * Sort array in ascending or descending order
 * @param array - Array to sort
 * @param order - Sort order ('ASC' or 'DESC')
 * @returns Sorted array
 */
export function sort<T>(array: T[], order: 'ASC' | 'DESC' = 'ASC'): T[] {
  return [...array].sort((a, b) => {
    if (order === 'ASC') {
      return a < b ? -1 : a > b ? 1 : 0;
    } else {
      return a < b ? 1 : a > b ? -1 : 0;
    }
  });
}

/**
 * Sort array of objects by multiple properties
 * @param array - Array to sort
 * @param params - Sort parameters
 * @returns Sorted array
 */
export function sortBy<T>(
  array: T[],
  params: Array<{ key: keyof T; order: 'ASC' | 'DESC' }>
): T[] {
  return [...array].sort((a, b) => {
    for (const param of params) {
      const aVal = a[param.key];
      const bVal = b[param.key];

      let result = 0;
      if (param.order === 'ASC') {
        result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        result = aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }

      if (result !== 0) return result;
    }
    return 0;
  });
}

/**
 * Sort array items by key order priority
 * @param items - Array to sort
 * @param keyOrder - Priority order of keys
 * @returns Sorted array
 */
export function sortByKeys(items: string[], keyOrder: string[]): string[] {
  const keyOrderMap = new Map(keyOrder.map((key, index) => [key, index]));

  return [...items].sort((a, b) => {
    let orderA = keyOrder.length;
    let orderB = keyOrder.length;

    for (const [key, index] of keyOrderMap) {
      if (a.startsWith(key)) {
        orderA = index;
        break;
      }
    }

    for (const [key, index] of keyOrderMap) {
      if (b.startsWith(key)) {
        orderB = index;
        break;
      }
    }

    return orderA - orderB;
  });
}

/**
 * Group array elements by a key function
 * @param arr - Array to group
 * @param keyFn - Function that returns the group key
 * @returns Object with grouped elements
 */
export function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string | number
): Record<string | number, T[]> {
  return arr.reduce(
    (result, item) => {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    },
    {} as Record<string | number, T[]>
  );
}

/**
 * Flatten nested arrays to specified depth
 * @param arr - Array to flatten
 * @param depth - Depth to flatten (default: 1)
 * @returns Flattened array
 */
export function flatten<T>(arr: unknown[], depth = 1): T[] {
  if (depth === 0) return arr as T[];
  return arr.reduce<T[]>((acc, val) => {
    return acc.concat(
      Array.isArray(val) ? flatten<T>(val, depth - 1) : (val as T)
    );
  }, []);
}
