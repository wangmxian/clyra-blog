import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  formatDate,
  formatDateEN,
  calculateReadingTime,
  truncateText,
  cn,
  extractHeadings,
} from '@/lib/utils';

describe('validateEmail', () => {
  it('should return true for valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('user+tag@example.org')).toBe(true);
    expect(validateEmail('a@b.co')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('no@domain')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
    expect(validateEmail('noat.com')).toBe(false);
    expect(validateEmail('two@@at.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('test@.com')).toBe(false);
    expect(validateEmail('test@domain.')).toBe(false);
  });

  it('should return false for non-string inputs', () => {
    expect(validateEmail(null as unknown as string)).toBe(false);
    expect(validateEmail(undefined as unknown as string)).toBe(false);
    expect(validateEmail(123 as unknown as string)).toBe(false);
  });
});

describe('formatDate', () => {
  it('should format valid date strings', () => {
    const result = formatDate('2025-12-22T10:00:00Z', 'en-US');
    expect(result).toContain('2025');
    expect(result).toContain('22');
  });

  it('should return original string for invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
  });

  it('should handle different locales', () => {
    const resultZH = formatDate('2025-12-22T10:00:00Z', 'zh-CN');
    const resultEN = formatDate('2025-12-22T10:00:00Z', 'en-US');
    expect(resultZH).not.toBe(resultEN);
  });
});

describe('formatDateEN', () => {
  it('should format date in uppercase English format', () => {
    const result = formatDateEN('2025-12-22T10:00:00Z');
    expect(result).toMatch(/DEC.*22.*2025/i);
  });

  it('should return original string for invalid dates', () => {
    expect(formatDateEN('invalid-date')).toBe('invalid-date');
  });
});

describe('calculateReadingTime', () => {
  it('should return 1 minute for short content', () => {
    expect(calculateReadingTime('Hello world')).toBe(1);
    expect(calculateReadingTime('')).toBe(1);
  });

  it('should calculate reading time based on word count', () => {
    // 1000 words at 300 words/min = ~4 minutes
    const longContent = 'word '.repeat(1000);
    expect(calculateReadingTime(longContent)).toBeGreaterThanOrEqual(3);
  });

  it('should handle Chinese characters', () => {
    // 600 Chinese characters at 300 chars/min = 2 minutes
    const chineseContent = '中'.repeat(600);
    expect(calculateReadingTime(chineseContent)).toBe(2);
  });

  it('should strip Markdown syntax', () => {
    const markdownContent = `
# Heading
**bold** and *italic*
\`\`\`javascript
const code = 'block';
\`\`\`
[link](url) and ![image](url)
    `;
    const result = calculateReadingTime(markdownContent);
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('should return 1 for null or undefined', () => {
    expect(calculateReadingTime(null as unknown as string)).toBe(1);
    expect(calculateReadingTime(undefined as unknown as string)).toBe(1);
  });
});

describe('truncateText', () => {
  it('should truncate text longer than maxLength', () => {
    const result = truncateText('This is a long text', 10);
    expect(result).toBe('This is a...');
    expect(result.length).toBeLessThanOrEqual(13); // 10 + '...'
  });

  it('should not truncate text shorter than maxLength', () => {
    expect(truncateText('Short', 10)).toBe('Short');
  });

  it('should handle empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });

  it('should handle exact length', () => {
    expect(truncateText('1234567890', 10)).toBe('1234567890');
  });
});

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should filter out falsy values', () => {
    expect(cn('class1', false, null, undefined, 'class2')).toBe('class1 class2');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });
});

describe('extractHeadings', () => {
  it('should extract headings from Markdown', () => {
    const content = `
# Heading 1
Some text
## Heading 2
More text
### Heading 3
    `;
    const headings = extractHeadings(content);
    
    expect(headings).toHaveLength(3);
    expect(headings[0]).toEqual({ id: 'heading-1', text: 'Heading 1', level: 1 });
    expect(headings[1]).toEqual({ id: 'heading-2', text: 'Heading 2', level: 2 });
    expect(headings[2]).toEqual({ id: 'heading-3', text: 'Heading 3', level: 3 });
  });

  it('should handle Chinese headings', () => {
    const content = '## 中文标题';
    const headings = extractHeadings(content);
    
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('中文标题');
    expect(headings[0].level).toBe(2);
  });

  it('should return empty array for content without headings', () => {
    const content = 'Just some text without headings';
    expect(extractHeadings(content)).toEqual([]);
  });
});
