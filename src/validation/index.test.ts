import {
  isEmoji,
  isImageUrl,
  isEmail,
  isUrl,
  isNumeric,
  isAlpha,
  isAlphanumeric,
  isEmpty,
  isPlainObject,
  extractUrl,
  isIPv4,
  isHexColor,
} from '../validation';

describe('Validation utilities', () => {
  describe('isEmoji', () => {
    it('should identify emojis', () => {
      expect(isEmoji('😀')).toBe(true);
      expect(isEmoji('👨‍👩‍👧‍👦')).toBe(true);
      expect(isEmoji('🇺🇸')).toBe(true);
    });

    it('should reject non-emojis', () => {
      expect(isEmoji('a')).toBe(false);
      expect(isEmoji('hello')).toBe(false);
    });
  });

  describe('isImageUrl', () => {
    it('should identify image URLs', () => {
      expect(isImageUrl('https://example.com/image.jpg')).toBe(true);
      expect(isImageUrl('https://example.com/photo.png')).toBe(true);
      expect(isImageUrl('https://example.com/pic.gif?size=large')).toBe(true);
    });

    it('should reject non-image URLs', () => {
      expect(isImageUrl('https://example.com/document.pdf')).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('should validate correct emails', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@example.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isEmail('invalid')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate URLs', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://localhost:3000')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isUrl('not a url')).toBe(false);
      expect(isUrl('example.com')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should identify numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
    });

    it('should reject non-numeric strings', () => {
      expect(isNumeric('12.3')).toBe(false);
      expect(isNumeric('abc')).toBe(false);
    });
  });

  describe('isAlpha', () => {
    it('should identify alphabetic strings', () => {
      expect(isAlpha('abc')).toBe(true);
      expect(isAlpha('ABC')).toBe(true);
    });

    it('should reject non-alphabetic strings', () => {
      expect(isAlpha('abc123')).toBe(false);
      expect(isAlpha('abc ')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    it('should identify alphanumeric strings', () => {
      expect(isAlphanumeric('abc123')).toBe(true);
      expect(isAlphanumeric('ABC123')).toBe(true);
    });

    it('should reject non-alphanumeric strings', () => {
      expect(isAlphanumeric('abc-123')).toBe(false);
      expect(isAlphanumeric('abc 123')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should identify empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('should reject non-empty values', () => {
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty(0)).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('should identify plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('should reject non-plain objects', () => {
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
    });
  });

  describe('extractUrl', () => {
    it('should extract URL from string', () => {
      const result = extractUrl('https://example.com/path');
      expect(result).toEqual({
        url: 'https://example.com/path',
        domain: 'example.com',
      });
    });

    it('should add protocol if missing', () => {
      const result = extractUrl('example.com');
      expect(result?.url).toBe('https://example.com/');
    });

    it('should return null for invalid input', () => {
      expect(extractUrl('not a url')).toBeNull();
    });
  });

  describe('isIPv4', () => {
    it('should validate IPv4 addresses', () => {
      expect(isIPv4('192.168.1.1')).toBe(true);
      expect(isIPv4('255.255.255.255')).toBe(true);
      expect(isIPv4('0.0.0.0')).toBe(true);
    });

    it('should reject invalid IPv4', () => {
      expect(isIPv4('256.1.1.1')).toBe(false);
      expect(isIPv4('192.168.1')).toBe(false);
      expect(isIPv4('abc.def.ghi.jkl')).toBe(false);
    });
  });

  describe('isHexColor', () => {
    it('should validate hex colors', () => {
      expect(isHexColor('#fff')).toBe(true);
      expect(isHexColor('#ffffff')).toBe(true);
      expect(isHexColor('#ABC123')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isHexColor('fff')).toBe(false);
      expect(isHexColor('#gggggg')).toBe(false);
      expect(isHexColor('#ff')).toBe(false);
    });
  });
});
