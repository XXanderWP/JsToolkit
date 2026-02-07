import {
  randomElement,
  randomElementIndex,
  shuffle,
  chunk,
  unique,
  intersection,
  difference,
  sort,
  sortBy,
  groupBy,
  flatten,
} from '../array';

describe('Array utilities', () => {
  describe('randomElement', () => {
    it('should return element from array', () => {
      const arr = [1, 2, 3];
      const result = randomElement(arr);
      expect(arr).toContain(result);
    });
  });

  describe('randomElementIndex', () => {
    it('should return valid index', () => {
      const arr = [1, 2, 3];
      const index = randomElementIndex(arr);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(arr.length);
    });
  });

  describe('shuffle', () => {
    it('should return array with same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('should not modify original array', () => {
      const arr = [1, 2, 3];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toEqual(original);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });
  });

  describe('unique', () => {
    it('should remove duplicates', () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('intersection', () => {
    it('should return common elements', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });
  });

  describe('difference', () => {
    it('should return elements only in first array', () => {
      expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    });
  });

  describe('sort', () => {
    it('should sort in ascending order', () => {
      expect(sort([3, 1, 2], 'ASC')).toEqual([1, 2, 3]);
    });

    it('should sort in descending order', () => {
      expect(sort([1, 2, 3], 'DESC')).toEqual([3, 2, 1]);
    });
  });

  describe('sortBy', () => {
    it('should sort objects by multiple keys', () => {
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 25 },
      ];
      const sorted = sortBy(data, [
        { key: 'age', order: 'ASC' },
        { key: 'name', order: 'ASC' },
      ]);
      expect(sorted[0].name).toBe('Bob');
      expect(sorted[1].name).toBe('Jane');
    });
  });

  describe('groupBy', () => {
    it('should group elements by key', () => {
      const data = [
        { type: 'A', value: 1 },
        { type: 'B', value: 2 },
        { type: 'A', value: 3 },
      ];
      const grouped = groupBy(data, (item) => item.type);
      expect(grouped['A']).toHaveLength(2);
      expect(grouped['B']).toHaveLength(1);
    });
  });

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(
        flatten([
          [1, 2],
          [3, 4],
        ])
      ).toEqual([1, 2, 3, 4]);
      expect(flatten([[[1, 2]], [[3, 4]]], 2)).toEqual([1, 2, 3, 4]);
    });
  });
});
