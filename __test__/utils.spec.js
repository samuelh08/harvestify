const {
  paginationParseParams,
  sortParseParams,
  sortCompactToStr,
} = require('../server/utils');

describe('utils', () => {
  describe('paginationParseParams', () => {
    test('should return default values', () => {
      const { limit, page, skip } = paginationParseParams();
      expect(limit).toBe(10);
      expect(page).toBe(1);
      expect(skip).toBe(0);
    });

    test('should return parsed values', () => {
      const { limit, page, skip } = paginationParseParams({
        limit: '20',
        page: '2',
      });
      expect(limit).toBe(20);
      expect(page).toBe(2);
      expect(skip).toBe(20);
    });
  });

  describe('sortParseParams', () => {
    test('should return default values', () => {
      const { sortBy, direction } = sortParseParams();
      expect(sortBy).toBe('createdAt');
      expect(direction).toBe('desc');
    });

    test('should return parsed values', () => {
      const { sortBy, direction } = sortParseParams({
        sortBy: 'name',
        direction: 'asc',
      });
      expect(sortBy).toBe('name');
      expect(direction).toBe('asc');
    });
  });

  describe('sortCompactToStr', () => {
    test('should return default values', () => {
      const str = sortCompactToStr();
      expect(str).toBe('-createdAt');
    });

    test('should return parsed values', () => {
      const str = sortCompactToStr('name', 'asc');
      expect(str).toBe('name');
    });
  });
});
