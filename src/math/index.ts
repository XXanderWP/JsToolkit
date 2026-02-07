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
 * Round a number to specified decimal places
 * @param value - Value to round
 * @param decimals - Number of decimal places
 * @param mode - Rounding mode ('round' or 'truncate')
 * @returns Rounded number
 */
export function round(
  value: number,
  decimals: number,
  mode: 'round' | 'truncate' = 'round'
): number {
  const factor = Math.pow(10, decimals);

  if (mode === 'truncate') {
    return Math.trunc(value * factor) / factor;
  }
  return Math.round(value * factor) / factor;
}

/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param amount - Interpolation amount (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, amount: number): number {
  amount = Math.max(0, Math.min(1, amount));
  return start + (end - start) * amount;
}

/**
 * Linear interpolation between two 2D points
 * @param point1 - First point
 * @param point2 - Second point
 * @param amount - Interpolation amount (0-1)
 * @returns Interpolated point
 */
export function lerp2D(
  point1: { x: number; y: number },
  point2: { x: number; y: number },
  amount: number
): { x: number; y: number } {
  return {
    x: lerp(point1.x, point2.x, amount),
    y: lerp(point1.y, point2.y, amount),
  };
}

/**
 * Linear interpolation between two 3D vectors
 * @param vec1 - First vector
 * @param vec2 - Second vector
 * @param amount - Interpolation amount (0-1)
 * @returns Interpolated vector
 */
export function lerp3D(
  vec1: { x: number; y: number; z: number },
  vec2: { x: number; y: number; z: number },
  amount: number
): { x: number; y: number; z: number } {
  return {
    x: lerp(vec1.x, vec2.x, amount),
    y: lerp(vec1.y, vec2.y, amount),
    z: lerp(vec1.z, vec2.z, amount),
  };
}

/**
 * Calculate time-based interpolation value
 * @param start - Start timestamp
 * @param end - End timestamp
 * @param current - Current timestamp (default: Date.now())
 * @returns Interpolation value (0-1)
 */
export function lerpTime(
  start: number,
  end: number,
  current = Date.now()
): number {
  const duration = current - start;
  return Math.max(0, Math.min(1, duration / (end - start)));
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map a value from one range to another
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculate percentage
 * @param value - Value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Calculate average of numbers
 * @param numbers - Array of numbers
 * @returns Average value
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculate sum of numbers
 * @param numbers - Array of numbers
 * @returns Sum
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

/**
 * Find minimum value in array
 * @param numbers - Array of numbers
 * @returns Minimum value
 */
export function min(numbers: number[]): number {
  return Math.min(...numbers);
}

/**
 * Find maximum value in array
 * @param numbers - Array of numbers
 * @returns Maximum value
 */
export function max(numbers: number[]): number {
  return Math.max(...numbers);
}
