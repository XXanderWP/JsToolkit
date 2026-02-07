/**
 * Generate a random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
export function randomInt(min: number, max: number): number {
  if (max < min) {
    [max, min] = [min, max];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random float between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random float
 */
export function randomFloat(min: number, max: number): number {
  if (max < min) {
    [max, min] = [min, max];
  }
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random boolean
 * @param probability - Probability of true (0-1, default: 0.5)
 * @returns Random boolean
 */
export function randomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

/**
 * Pick N random unique elements from an array
 * @param arr - Array to pick from
 * @param count - Number of elements to pick
 * @returns Array of random elements
 */
export function randomSample<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * Generate a random hex color
 * @returns Random hex color string
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

/**
 * Generate a random UUID v4
 * @returns UUID string
 */
export function randomUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate random weighted choice based on weights
 * @param items - Array of items
 * @param weights - Array of weights (must match items length)
 * @returns Random item based on weights
 */
export function randomWeighted<T>(items: T[], weights: number[]): T {
  if (items.length !== weights.length) {
    throw new Error('Items and weights arrays must have the same length');
  }

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }

  return items[items.length - 1];
}

/**
 * Generate a random date between two dates
 * @param start - Start date
 * @param end - End date
 * @returns Random date
 */
export function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
