import {
  randomInt,
  randomFloat,
  round,
  lerp,
  lerp2D,
  lerp3D,
  clamp,
  mapRange,
  percentage,
  average,
  sum,
  min,
  max,
} from '../math';

describe('Math utilities', () => {
  describe('randomInt', () => {
    it('should generate integer in range', () => {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('should handle reversed min/max', () => {
      const result = randomInt(10, 1);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });

  describe('randomFloat', () => {
    it('should generate float in range', () => {
      const result = randomFloat(1.5, 5.5);
      expect(result).toBeGreaterThanOrEqual(1.5);
      expect(result).toBeLessThanOrEqual(5.5);
    });
  });

  describe('round', () => {
    it('should round to decimal places', () => {
      expect(round(3.14159, 2)).toBe(3.14);
      expect(round(3.14159, 0)).toBe(3);
    });

    it('should truncate when mode is truncate', () => {
      expect(round(3.99, 0, 'truncate')).toBe(3);
    });
  });

  describe('lerp', () => {
    it('should interpolate between values', () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 1)).toBe(10);
    });

    it('should clamp amount to 0-1', () => {
      expect(lerp(0, 10, -1)).toBe(0);
      expect(lerp(0, 10, 2)).toBe(10);
    });
  });

  describe('lerp2D', () => {
    it('should interpolate 2D points', () => {
      const result = lerp2D({ x: 0, y: 0 }, { x: 10, y: 10 }, 0.5);
      expect(result).toEqual({ x: 5, y: 5 });
    });
  });

  describe('lerp3D', () => {
    it('should interpolate 3D vectors', () => {
      const result = lerp3D({ x: 0, y: 0, z: 0 }, { x: 10, y: 10, z: 10 }, 0.5);
      expect(result).toEqual({ x: 5, y: 5, z: 5 });
    });
  });

  describe('clamp', () => {
    it('should clamp value to range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('mapRange', () => {
    it('should map value from one range to another', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
      expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
      expect(mapRange(10, 0, 10, 0, 100)).toBe(100);
    });
  });

  describe('percentage', () => {
    it('should calculate percentage', () => {
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(1, 2)).toBe(50);
    });

    it('should handle zero total', () => {
      expect(percentage(5, 0)).toBe(0);
    });
  });

  describe('average', () => {
    it('should calculate average', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
    });

    it('should handle empty array', () => {
      expect(average([])).toBe(0);
    });
  });

  describe('sum', () => {
    it('should calculate sum', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });
  });

  describe('min', () => {
    it('should find minimum value', () => {
      expect(min([5, 2, 8, 1, 9])).toBe(1);
    });
  });

  describe('max', () => {
    it('should find maximum value', () => {
      expect(max([5, 2, 8, 1, 9])).toBe(9);
    });
  });
});
