import {
  formatNumber,
  formatBytes,
  formatCurrency,
  formatPhone,
  formatCardNumber,
  maskString,
  formatPercentage,
  pluralize,
  abbreviateNumber,
  formatFileName,
  titleCase,
} from '../format';

describe('Format utilities', () => {
  describe('formatNumber', () => {
    it('should format numbers with thousands separator', () => {
      expect(formatNumber(1000)).toBe('1 000');
      expect(formatNumber(1000000)).toBe('1 000 000');
    });

    it('should handle decimals', () => {
      expect(formatNumber(1000.5, false)).toBe('1 000.50');
      expect(formatNumber(1000.0)).toBe('1 000');
    });
  });

  describe('formatBytes', () => {
    it('should format bytes to human-readable size', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
    });

    it('should respect decimal places', () => {
      expect(formatBytes(1536, 1)).toBe('1.5 KB');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1,234.56');
    });
  });

  describe('formatPhone', () => {
    it('should format 10-digit phone', () => {
      expect(formatPhone('1234567890')).toBe('(123) 456-7890');
    });

    it('should format 11-digit phone with country code', () => {
      expect(formatPhone('11234567890')).toBe('+1 (123) 456-7890');
    });

    it('should return original if invalid format', () => {
      expect(formatPhone('123')).toBe('123');
    });
  });

  describe('formatCardNumber', () => {
    it('should format card number with spaces', () => {
      expect(formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
    });
  });

  describe('maskString', () => {
    it('should mask sensitive data', () => {
      expect(maskString('1234567890')).toBe('******7890');
      expect(maskString('1234567890', 6)).toBe('****567890');
    });

    it('should use custom mask character', () => {
      expect(maskString('1234567890', 4, 'X')).toBe('XXXXXX7890');
    });

    it('should not mask short strings', () => {
      expect(maskString('123', 4)).toBe('123');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage', () => {
      expect(formatPercentage(50.5)).toBe('50.50%');
      expect(formatPercentage(75, 0)).toBe('75%');
    });
  });

  describe('pluralize', () => {
    it('should pluralize correctly', () => {
      expect(pluralize(1, 'item')).toBe('1 item');
      expect(pluralize(2, 'item')).toBe('2 items');
      expect(pluralize(0, 'item')).toBe('0 items');
    });

    it('should use custom plural form', () => {
      expect(pluralize(2, 'person', 'people')).toBe('2 people');
    });
  });

  describe('abbreviateNumber', () => {
    it('should abbreviate large numbers', () => {
      expect(abbreviateNumber(999)).toBe('999');
      expect(abbreviateNumber(1000)).toBe('1.0K');
      expect(abbreviateNumber(1500)).toBe('1.5K');
      expect(abbreviateNumber(1000000)).toBe('1.0M');
      expect(abbreviateNumber(1500000)).toBe('1.5M');
    });

    it('should respect decimal places', () => {
      expect(abbreviateNumber(1234, 2)).toBe('1.23K');
    });
  });

  describe('formatFileName', () => {
    it('should format file names', () => {
      expect(formatFileName('My File', 'txt')).toBe('My_File.txt');
      expect(formatFileName('test@file#123', 'pdf')).toBe('test_file_123.pdf');
    });

    it('should handle extension with dot', () => {
      expect(formatFileName('file', '.txt')).toBe('file.txt');
    });
  });

  describe('titleCase', () => {
    it('should title case strings', () => {
      expect(titleCase('hello world')).toBe('Hello World');
      expect(titleCase('HELLO WORLD')).toBe('Hello World');
    });
  });
});
