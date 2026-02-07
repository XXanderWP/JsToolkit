import {
  toBase64,
  fromBase64,
  hash,
  encodeUri,
  decodeUri,
  hexToBytes,
  bytesToHex,
} from '../encoding';

describe('Encoding utilities', () => {
  describe('toBase64 and fromBase64', () => {
    it('should encode and decode strings', () => {
      const original = 'Hello World!';
      const encoded = toBase64(original);
      const decoded = fromBase64(encoded);
      expect(decoded).toBe(original);
    });

    it('should handle unicode characters', () => {
      const original = 'Hello 世界 🌍';
      const encoded = toBase64(original);
      const decoded = fromBase64(encoded);
      expect(decoded).toBe(original);
    });
  });

  describe('hash', () => {
    it('should generate MD5 hash', () => {
      const result = hash('password');
      expect(result).toHaveLength(32);
      expect(result).toMatch(/^[a-f0-9]{32}$/);
    });

    it('should generate consistent hash', () => {
      expect(hash('test')).toBe(hash('test'));
    });

    it('should generate different hashes for different inputs', () => {
      expect(hash('test1')).not.toBe(hash('test2'));
    });
  });

  describe('encodeUri and decodeUri', () => {
    it('should encode URI components', () => {
      expect(encodeUri('hello world')).toBe('hello%20world');
      expect(encodeUri('hello&world')).toBe('hello%26world');
    });

    it('should decode URI components', () => {
      expect(decodeUri('hello%20world')).toBe('hello world');
      expect(decodeUri('hello%26world')).toBe('hello&world');
    });

    it('should handle invalid encoded strings gracefully', () => {
      expect(decodeUri('invalid%')).toBe('invalid%');
    });
  });

  describe('hexToBytes and bytesToHex', () => {
    it('should convert hex to bytes and back', () => {
      const hex = '48656c6c6f';
      const bytes = hexToBytes(hex);
      const result = bytesToHex(bytes);
      expect(result).toBe(hex.toLowerCase());
    });

    it('should handle empty string', () => {
      const bytes = hexToBytes('');
      expect(bytes).toHaveLength(0);
      expect(bytesToHex(bytes)).toBe('');
    });
  });
});
