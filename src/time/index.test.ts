import {
  timestamp,
  timestampMs,
  padZero,
  formatDateTime,
  formatDate,
  formatDuration,
  formatDurationMs,
  sleep,
  isToday,
  isYesterday,
  timeAgo,
} from '../time';

describe('Time utilities', () => {
  describe('timestamp', () => {
    it('should return timestamp in seconds', () => {
      const ts = timestamp();
      expect(ts).toBeGreaterThan(1600000000); // After Sept 2020
      expect(Number.isInteger(ts)).toBe(true);
    });
  });

  describe('timestampMs', () => {
    it('should return timestamp in milliseconds', () => {
      const ts = timestampMs();
      expect(ts).toBeGreaterThan(1600000000000);
    });
  });

  describe('padZero', () => {
    it('should pad single digits', () => {
      expect(padZero(5)).toBe('05');
      expect(padZero('7')).toBe('07');
    });

    it('should not pad double digits', () => {
      expect(padZero(15)).toBe('15');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDateTime(date)).toBe('15.01.2024 10:30');
    });
  });

  describe('formatDate', () => {
    it('should format date without time', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date)).toBe('15.01.2024');
    });
  });

  describe('formatDuration', () => {
    it('should format seconds to duration string', () => {
      expect(formatDuration(90)).toBe('00:01:30');
      expect(formatDuration(3665)).toBe('01:01:05');
      expect(formatDuration(86400 + 3600)).toBe('1:01:00:00');
    });
  });

  describe('formatDurationMs', () => {
    it('should format milliseconds to duration string', () => {
      expect(formatDurationMs(1500)).toBe('00:00:01.500');
      expect(formatDurationMs(90500)).toBe('00:01:30.500');
    });
  });

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(95);
    });
  });

  describe('isToday', () => {
    it('should identify today', () => {
      expect(isToday(new Date())).toBe(true);
    });

    it('should identify not today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isYesterday', () => {
    it('should identify yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isYesterday(yesterday)).toBe(true);
    });

    it('should identify not yesterday', () => {
      expect(isYesterday(new Date())).toBe(false);
    });
  });

  describe('timeAgo', () => {
    it('should return "just now" for recent times', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 30000); // 30 seconds ago
      expect(timeAgo(recent, now)).toBe('just now');
    });

    it('should return minutes ago', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
      expect(timeAgo(past, now)).toBe('5 minutes ago');
    });

    it('should return hours ago', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
      expect(timeAgo(past, now)).toBe('2 hours ago');
    });

    it('should handle future times', () => {
      const now = new Date();
      const future = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
      expect(timeAgo(future, now)).toBe('in 2 hours');
    });
  });
});
