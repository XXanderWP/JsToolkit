import {
  randomInt,
  randomFloat,
  randomBoolean,
  randomSample,
  randomColor,
  randomUUID,
  randomWeighted,
  randomDate,
} from '../random';

describe('Random utilities', () => {
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

  describe('randomBoolean', () => {
    it('should generate boolean', () => {
      const result = randomBoolean();
      expect(typeof result).toBe('boolean');
    });

    it('should respect probability', () => {
      // Test with 0 probability (always false)
      expect(randomBoolean(0)).toBe(false);

      // Test with 1 probability (always true)
      expect(randomBoolean(1)).toBe(true);
    });
  });

  describe('randomSample', () => {
    it('should pick correct number of elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const sample = randomSample(arr, 3);
      expect(sample).toHaveLength(3);
    });

    it('should not pick more than available', () => {
      const arr = [1, 2, 3];
      const sample = randomSample(arr, 10);
      expect(sample.length).toBeLessThanOrEqual(3);
    });

    it('should pick unique elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const sample = randomSample(arr, 3);
      const unique = [...new Set(sample)];
      expect(unique).toHaveLength(sample.length);
    });
  });

  describe('randomColor', () => {
    it('should generate valid hex color', () => {
      const color = randomColor();
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe('randomUUID', () => {
    it('should generate valid UUID v4', () => {
      const uuid = randomUUID();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
    });

    it('should generate unique UUIDs', () => {
      const uuid1 = randomUUID();
      const uuid2 = randomUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('randomWeighted', () => {
    it('should pick from items based on weights', () => {
      const items = ['A', 'B', 'C'];
      const weights = [10, 0, 0];

      // With these weights, should always pick 'A'
      const results = Array.from({ length: 10 }, () =>
        randomWeighted(items, weights)
      );
      expect(results.every((r) => r === 'A')).toBe(true);
    });

    it('should throw error for mismatched lengths', () => {
      expect(() => {
        randomWeighted([1, 2], [1, 2, 3]);
      }).toThrow();
    });
  });

  describe('randomDate', () => {
    it('should generate date in range', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-12-31');
      const result = randomDate(start, end);

      expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
    });
  });
});
