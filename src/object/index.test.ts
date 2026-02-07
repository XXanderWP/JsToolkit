import {
  deepClone,
  deepMerge,
  get,
  set,
  pick,
  omit,
  flatten,
  unflatten,
  keys,
  values,
  isEqual,
} from '../object';

describe('Object utilities', () => {
  describe('deepClone', () => {
    it('should clone simple object', () => {
      const obj = { a: 1, b: 2 };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('should clone nested object', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      cloned.a.b.c = 2;
      expect(obj.a.b.c).toBe(1);
    });

    it('should clone arrays', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    it('should clone dates', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      expect(cloned.getTime()).toBe(date.getTime());
      expect(cloned).not.toBe(date);
    });
  });

  describe('deepMerge', () => {
    it('should merge objects', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should merge nested objects', () => {
      const target = { a: { b: 1, c: 2 } };
      const source = { a: { b: 3, d: 4 } };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: { b: 3, c: 2, d: 4 } });
    });
  });

  describe('get', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    };

    it('should get nested property', () => {
      expect(get(obj, 'user.name')).toBe('John');
      expect(get(obj, 'user.address.city')).toBe('New York');
    });

    it('should return default for missing path', () => {
      expect(get(obj, 'user.age', 25)).toBe(25);
      expect(get(obj, 'missing.path', 'default')).toBe('default');
    });
  });

  describe('set', () => {
    it('should set nested property', () => {
      const obj: any = {};
      set(obj, 'user.name', 'John');
      expect(obj.user.name).toBe('John');
    });

    it('should create nested structure', () => {
      const obj: any = {};
      set(obj, 'a.b.c.d', 'value');
      expect(obj.a.b.c.d).toBe('value');
    });
  });

  describe('pick', () => {
    it('should pick specified properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('omit', () => {
    it('should omit specified properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('flatten', () => {
    it('should flatten nested object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      };
      const result = flatten(obj);
      expect(result).toEqual({
        a: 1,
        'b.c': 2,
        'b.d.e': 3,
      });
    });
  });

  describe('unflatten', () => {
    it('should unflatten object', () => {
      const obj = {
        a: 1,
        'b.c': 2,
        'b.d.e': 3,
      };
      const result = unflatten(obj);
      expect(result).toEqual({
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      });
    });
  });

  describe('keys', () => {
    it('should get all keys including nested', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
      };
      const result = keys(obj);
      expect(result).toContain('a');
      expect(result).toContain('b');
      expect(result).toContain('b.c');
      expect(result).toContain('b.d');
    });
  });

  describe('values', () => {
    it('should get all values including nested', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
      };
      const result = values(obj);
      expect(result).toContain(1);
      expect(result).toContain(2);
      expect(result).toContain(3);
    });
  });

  describe('isEqual', () => {
    it('should compare simple objects', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should compare nested objects', () => {
      const obj1 = { a: { b: { c: 1 } } };
      const obj2 = { a: { b: { c: 1 } } };
      const obj3 = { a: { b: { c: 2 } } };

      expect(isEqual(obj1, obj2)).toBe(true);
      expect(isEqual(obj1, obj3)).toBe(false);
    });

    it('should handle primitives', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual('a', 'a')).toBe(true);
      expect(isEqual(1, 2)).toBe(false);
    });
  });
});
