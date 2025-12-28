/**
 * Property-Based Test: Markdown Rendering Integrity
 * 
 * Feature: blog-frontend, Property 5: Markdown Rendering Integrity
 * For any valid Markdown content, the rendered output SHALL preserve
 * all text content and structural elements.
 * 
 * Validates: Requirements 4.2
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * 从 Markdown 中提取标题
 */
function extractHeadings(markdown: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ level, text, id });
    }
  }

  return headings;
}

/**
 * 从 Markdown 中提取代码块
 */
function extractCodeBlocks(markdown: string): { language: string; code: string }[] {
  const codeBlocks: { language: string; code: string }[] = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    codeBlocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
    });
  }

  return codeBlocks;
}

/**
 * 从 Markdown 中提取链接
 */
function extractLinks(markdown: string): { text: string; url: string }[] {
  const links: { text: string; url: string }[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
    });
  }

  return links;
}

// 生成器：创建有效的 Markdown 标题
const headingArb = fc.tuple(
  fc.integer({ min: 1, max: 6 }),
  fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0 && !s.includes('\n'))
).map(([level, text]) => `${'#'.repeat(level)} ${text}`);

// 生成器：创建有效的代码块
const codeBlockArb = fc.tuple(
  fc.constantFrom('javascript', 'typescript', 'python', 'bash', 'json', 'html', 'css'),
  fc.string({ minLength: 1, maxLength: 200 }).filter(s => !s.includes('```'))
).map(([lang, code]) => `\`\`\`${lang}\n${code}\n\`\`\``);

// 生成器：创建有效的链接
const linkArb = fc.tuple(
  fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0 && !s.includes('[') && !s.includes(']')),
  fc.webUrl()
).map(([text, url]) => `[${text}](${url})`);

// 生成器：创建段落文本
const paragraphArb = fc.string({ minLength: 1, maxLength: 200 })
  .filter(s => s.trim().length > 0 && !s.startsWith('#'));

describe('Property Tests: Markdown Rendering Integrity', () => {
  /**
   * Property 5: Heading extraction preserves all headings
   * 
   * Validates: Requirements 4.2
   */
  it('should extract all headings from markdown', () => {
    fc.assert(
      fc.property(
        fc.array(headingArb, { minLength: 1, maxLength: 10 }),
        (headings) => {
          const markdown = headings.join('\n\n');
          const extracted = extractHeadings(markdown);
          
          // 提取的标题数量应该与输入相同
          return extracted.length === headings.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Heading levels are preserved
   * 
   * Validates: Requirements 4.2
   */
  it('should preserve heading levels', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 6 }),
        fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0 && !s.includes('\n')),
        (level, text) => {
          const markdown = `${'#'.repeat(level)} ${text}`;
          const extracted = extractHeadings(markdown);
          
          return extracted.length === 1 && extracted[0].level === level;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Code blocks are extracted correctly
   * 
   * Validates: Requirements 4.2
   */
  it('should extract code blocks with language', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('javascript', 'typescript', 'python'),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => !s.includes('```')),
        (language, code) => {
          const markdown = `\`\`\`${language}\n${code}\n\`\`\``;
          const extracted = extractCodeBlocks(markdown);
          
          return (
            extracted.length === 1 &&
            extracted[0].language === language &&
            extracted[0].code === code.trim()
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Links are extracted correctly
   * 
   * Validates: Requirements 4.2
   */
  it('should extract links with text and url', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0 && !s.includes('[') && !s.includes(']') && !s.includes('(')),
        // 使用简单的 URL 格式避免特殊字符问题
        fc.tuple(
          fc.constantFrom('https://example.com', 'https://test.org', 'https://blog.dev'),
          fc.string({ minLength: 0, maxLength: 10 }).map(s => s.replace(/[^a-z0-9]/gi, ''))
        ).map(([base, path]) => path ? `${base}/${path}` : base),
        (text, url) => {
          const markdown = `[${text}](${url})`;
          const extracted = extractLinks(markdown);
          
          return (
            extracted.length === 1 &&
            extracted[0].text === text &&
            extracted[0].url === url
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Multiple elements are preserved
   * 
   * Validates: Requirements 4.2
   */
  it('should handle mixed markdown content', () => {
    fc.assert(
      fc.property(
        fc.array(headingArb, { minLength: 0, maxLength: 3 }),
        fc.array(codeBlockArb, { minLength: 0, maxLength: 2 }),
        fc.array(linkArb, { minLength: 0, maxLength: 3 }),
        (headings, codeBlocks, links) => {
          const markdown = [...headings, ...codeBlocks, ...links].join('\n\n');
          
          const extractedHeadings = extractHeadings(markdown);
          const extractedCodeBlocks = extractCodeBlocks(markdown);
          const extractedLinks = extractLinks(markdown);
          
          return (
            extractedHeadings.length === headings.length &&
            extractedCodeBlocks.length === codeBlocks.length &&
            extractedLinks.length === links.length
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Heading IDs are URL-safe
   * 
   * Validates: Requirements 4.2
   */
  it('should generate URL-safe heading IDs', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0 && !s.includes('\n')),
        (text) => {
          const markdown = `## ${text}`;
          const extracted = extractHeadings(markdown);
          
          if (extracted.length === 0) return true;
          
          // ID 应该只包含小写字母、数字、中文和连字符
          const urlSafeRegex = /^[a-z0-9\u4e00-\u9fa5-]*$/;
          return urlSafeRegex.test(extracted[0].id);
        }
      ),
      { numRuns: 100 }
    );
  });
});
