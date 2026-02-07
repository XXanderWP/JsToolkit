import {
  randomString,
  truncate,
  capitalize,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  removeWhitespace,
  countOccurrences,
} from '../string';

describe('String utilities', () => {
  describe('randomString', () => {
    it('should generate string of correct length', () => {
      const result = randomString(10);
      expect(result).toHaveLength(10);
    });

    it('should use custom characters', () => {
      const result = randomString(5, '123');
      expect(result).toMatch(/^[123]+$/);
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should use custom ellipsis', () => {
      expect(truncate('Hello World', 8, '---')).toBe('Hello---');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('toCamelCase', () => {
    it('should convert to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('HelloWorld')).toBe('hello_world');
    });
  });

  describe('toKebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
    });
  });

  describe('removeWhitespace', () => {
    it('should remove all whitespace', () => {
      expect(removeWhitespace('hello world test')).toBe('helloworldtest');
    });
  });

  describe('countOccurrences', () => {
    it('should count substring occurrences', () => {
      expect(countOccurrences('hello hello world', 'hello')).toBe(2);
      expect(countOccurrences('test', 'x')).toBe(0);
    });
  });
});
