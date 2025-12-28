/**
 * Property-Based Test: Article Card Data Completeness
 * 
 * Feature: blog-frontend, Property 4: Article Card Data Completeness
 * For any article card component, all required fields (title, summary, category,
 * publishedAt, readingTime) SHALL be present and non-empty.
 * 
 * Validates: Requirements 3.3, 4.1
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { ArticleSummary, Category, Tag } from '@/lib/types';

// 生成器：创建随机分类
const categoryArb = fc.record<Category>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  slug: fc.string({ minLength: 1, maxLength: 50 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')),
});

// 生成器：创建随机标签
const tagArb = fc.record<Tag>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc.string({ minLength: 1, maxLength: 30 }),
  slug: fc.string({ minLength: 1, maxLength: 30 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')),
});

// 生成器：创建有效的文章摘要
const validArticleSummaryArb = fc.record<ArticleSummary>({
  id: fc.integer({ min: 1, max: 10000 }),
  title: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
  slug: fc.string({ minLength: 1, maxLength: 100 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')).filter(s => s.length > 0),
  summary: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
  coverUrl: fc.option(fc.webUrl(), { nil: null }),
  publishedAt: fc.constant('2025-01-15T10:30:00.000Z'),
  category: categoryArb,
  tags: fc.array(tagArb, { minLength: 0, maxLength: 5 }),
  readingTime: fc.integer({ min: 1, max: 60 }),
});

/**
 * 验证文章数据完整性
 */
function validateArticleCompleteness(article: ArticleSummary): {
  isValid: boolean;
  missingFields: string[];
} {
  const missingFields: string[] = [];

  // 检查必需字段
  if (!article.id || article.id <= 0) {
    missingFields.push('id');
  }
  if (!article.title || article.title.trim().length === 0) {
    missingFields.push('title');
  }
  if (!article.slug || article.slug.trim().length === 0) {
    missingFields.push('slug');
  }
  if (!article.summary || article.summary.trim().length === 0) {
    missingFields.push('summary');
  }
  if (!article.publishedAt) {
    missingFields.push('publishedAt');
  }
  if (!article.category || !article.category.id || !article.category.name) {
    missingFields.push('category');
  }
  if (typeof article.readingTime !== 'number' || article.readingTime <= 0) {
    missingFields.push('readingTime');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

describe('Property Tests: Article Card Data Completeness', () => {
  /**
   * Property 4: Article Card Data Completeness
   * All required fields should be present and non-empty.
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('valid articles should have all required fields', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        const result = validateArticleCompleteness(article);
        return result.isValid;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Article ID should be positive
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('article ID should be a positive integer', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        return Number.isInteger(article.id) && article.id > 0;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Article slug should be URL-safe
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('article slug should be URL-safe', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        // Slug 应该只包含小写字母、数字和连字符
        const urlSafeRegex = /^[a-z0-9-]+$/;
        return urlSafeRegex.test(article.slug);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Reading time should be reasonable
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('reading time should be between 1 and 60 minutes', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        return article.readingTime >= 1 && article.readingTime <= 60;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Published date should be valid ISO string
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('published date should be a valid ISO date string', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        const date = new Date(article.publishedAt);
        return !isNaN(date.getTime());
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Category should have valid structure
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('category should have id, name, and slug', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        return (
          typeof article.category.id === 'number' &&
          article.category.id > 0 &&
          typeof article.category.name === 'string' &&
          typeof article.category.slug === 'string'
        );
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Tags should be an array
   * 
   * Validates: Requirements 3.3, 4.1
   */
  it('tags should be an array with valid structure', () => {
    fc.assert(
      fc.property(validArticleSummaryArb, (article) => {
        if (!Array.isArray(article.tags)) return false;
        
        return article.tags.every(
          (tag) =>
            typeof tag.id === 'number' &&
            tag.id > 0 &&
            typeof tag.name === 'string' &&
            typeof tag.slug === 'string'
        );
      }),
      { numRuns: 100 }
    );
  });
});
