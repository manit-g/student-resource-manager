import { formatDate, formatDateTime, truncateText, getResourceTypeColor, getResourceTypeIcon } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Jan 15, 2024/);
    });

    it('should handle string dates', () => {
      const formatted = formatDate('2024-01-15T10:30:00Z');
      expect(formatted).toMatch(/Jan 15, 2024/);
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDateTime(date);
      expect(formatted).toMatch(/Jan 15, 2024/);
      expect(formatted).toMatch(/10:30/);
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const truncated = truncateText(longText, 20);
      expect(truncated).toBe('This is a very long ...');
      expect(truncated.length).toBe(23);
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      const result = truncateText(shortText, 20);
      expect(result).toBe('Short text');
    });
  });

  describe('getResourceTypeColor', () => {
    it('should return correct colors for each type', () => {
      expect(getResourceTypeColor('note')).toBe('bg-blue-100 text-blue-800');
      expect(getResourceTypeColor('assignment')).toBe('bg-green-100 text-green-800');
      expect(getResourceTypeColor('link')).toBe('bg-purple-100 text-purple-800');
      expect(getResourceTypeColor('file')).toBe('bg-orange-100 text-orange-800');
      expect(getResourceTypeColor('unknown')).toBe('bg-gray-100 text-gray-800');
    });
  });

  describe('getResourceTypeIcon', () => {
    it('should return correct icons for each type', () => {
      expect(getResourceTypeIcon('note')).toBe('📝');
      expect(getResourceTypeIcon('assignment')).toBe('📋');
      expect(getResourceTypeIcon('link')).toBe('🔗');
      expect(getResourceTypeIcon('file')).toBe('📄');
      expect(getResourceTypeIcon('unknown')).toBe('📁');
    });
  });
});
