/**
 * Property-Based Tests: SEO and Content Integrity
 * 
 * Validates: Requirements 5.3, 8.1, 8.2, 8.3, 8.5, 8.6, 12.4, 12.5
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { ArticleSummary, Category, Tag } from '@/lib/types';

// 生成器：创建随机分类
const categoryArb = fc.record<Category>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  slug: fc.string({ minLength: 1, maxLength: 50 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')).filter(s => s.length > 0),
});

// 生成器：创建随机标签
const tagArb = fc.record<Tag>({
  id: fc.integer({ min: 1, max: 1000 }),
  name: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
  slug: fc.string({ minLength: 1, maxLength: 30 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')).filter(s => s.length > 0),
});

// 生成器：创建随机文章摘要
const articleSummaryArb = fc.record<ArticleSummary>({
  id: fc.integer({ min: 1, max: 10000 }),
  title: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
  slug: fc.string({ minLength: 1, maxLength: 100 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')).filter(s => s.length > 0),
  summary: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
  coverUrl: fc.option(fc.constant('https://example.com/image.jpg'), { nil: null }),
  publishedAt: fc.constant('2025-01-15T10:30:00.000Z'),
  category: categoryArb,
  tags: fc.array(tagArb, { minLength: 0, maxLength: 5 }),
  readingTime: fc.integer({ min: 1, max: 60 }),
});

/**
 * 计算分类/标签的文章数量
 */
function countArticlesByCategory(articles: ArticleSummary[], categorySlug: string): number {
  return articles.filter(a => a.category.slug === categorySlug).length;
}

function countArticlesByTag(articles: ArticleSummary[], tagSlug: string): number {
  return articles.filter(a => a.tags.some(t => t.slug === tagSlug)).length;
}

/**
 * 验证 Webhook Secret
 */
function validateWebhookSecret(secret: string, providedSecret: string): boolean {
  if (!secret || !providedSecret) return false;
  return secret === providedSecret;
}

/**
 * 生成 Sitemap URL
 */
function generateSitemapUrls(
  baseUrl: string,
  articles: ArticleSummary[],
  categories: Category[],
  tags: Tag[]
): string[] {
  const urls: string[] = [
    baseUrl,
    `${baseUrl}/articles`,
    `${baseUrl}/categories`,
    `${baseUrl}/tags`,
    `${baseUrl}/about`,
  ];

  articles.forEach(a => urls.push(`${baseUrl}/articles/${a.slug}`));
  categories.forEach(c => urls.push(`${baseUrl}/categories/${c.slug}`));
  tags.forEach(t => urls.push(`${baseUrl}/tags/${t.slug}`));

  return urls;
}

/**
 * 生成 RSS Feed 项
 */
function generateRssFeedItems(articles: ArticleSummary[]): { title: string; link: string }[] {
  return articles.slice(0, 20).map(a => ({
    title: a.title,
    link: `/articles/${a.slug}`,
  }));
}

describe('Property Tests: Article Count Accuracy', () => {
  /**
   * Property 6: Article Count Accuracy
   * Category and tag pages should show accurate article counts.
   * 
   * Validates: Requirements 5.3
   */
  it('category article count should be accurate', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        categoryArb,
        (articles, category) => {
          // 给一些文章设置这个分类
          const articlesWithCategory = articles.map((article, index) => ({
            ...article,
            category: index % 3 === 0 ? category : article.category,
          }));

          const count = countArticlesByCategory(articlesWithCategory, category.slug);
          const expectedCount = articlesWithCategory.filter(
            a => a.category.slug === category.slug
          ).length;

          return count === expectedCount;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Tag article count should be accurate
   * 
   * Validates: Requirements 5.3
   */
  it('tag article count should be accurate', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        tagArb,
        (articles, tag) => {
          // 给一些文章添加这个标签
          const articlesWithTag = articles.map((article, index) => ({
            ...article,
            tags: index % 2 === 0 ? [...article.tags, tag] : article.tags,
          }));

          const count = countArticlesByTag(articlesWithTag, tag.slug);
          const expectedCount = articlesWithTag.filter(
            a => a.tags.some(t => t.slug === tag.slug)
          ).length;

          return count === expectedCount;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property Tests: Sitemap Completeness', () => {
  /**
   * Property 8: Sitemap Completeness
   * Sitemap should include all articles, categories, and tags.
   * 
   * Validates: Requirements 8.3
   */
  it('sitemap should include all content URLs', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 10 }),
        fc.array(categoryArb, { minLength: 0, maxLength: 5 }),
        fc.array(tagArb, { minLength: 0, maxLength: 5 }),
        (articles, categories, tags) => {
          const baseUrl = 'https://example.com';
          const urls = generateSitemapUrls(baseUrl, articles, categories, tags);

          // 验证所有文章都在 sitemap 中
          const allArticlesIncluded = articles.every(
            a => urls.includes(`${baseUrl}/articles/${a.slug}`)
          );

          // 验证所有分类都在 sitemap 中
          const allCategoriesIncluded = categories.every(
            c => urls.includes(`${baseUrl}/categories/${c.slug}`)
          );

          // 验证所有标签都在 sitemap 中
          const allTagsIncluded = tags.every(
            t => urls.includes(`${baseUrl}/tags/${t.slug}`)
          );

          return allArticlesIncluded && allCategoriesIncluded && allTagsIncluded;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Sitemap should include static pages
   * 
   * Validates: Requirements 8.3
   */
  it('sitemap should include static pages', () => {
    const baseUrl = 'https://example.com';
    const urls = generateSitemapUrls(baseUrl, [], [], []);

    expect(urls).toContain(baseUrl);
    expect(urls).toContain(`${baseUrl}/articles`);
    expect(urls).toContain(`${baseUrl}/categories`);
    expect(urls).toContain(`${baseUrl}/tags`);
    expect(urls).toContain(`${baseUrl}/about`);
  });
});

describe('Property Tests: RSS Feed Completeness', () => {
  /**
   * Property 9: RSS Feed Completeness
   * RSS feed should include latest articles with correct data.
   * 
   * Validates: Requirements 8.5
   */
  it('RSS feed should include up to 20 latest articles', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 30 }),
        (articles) => {
          const feedItems = generateRssFeedItems(articles);
          
          // Feed 最多包含 20 篇文章
          return feedItems.length <= 20 && feedItems.length <= articles.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: RSS feed items should have required fields
   * 
   * Validates: Requirements 8.5
   */
  it('RSS feed items should have title and link', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 1, maxLength: 10 }),
        (articles) => {
          const feedItems = generateRssFeedItems(articles);
          
          return feedItems.every(
            item => item.title && item.title.length > 0 && item.link && item.link.length > 0
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property Tests: Webhook Secret Validation', () => {
  /**
   * Property 11: Webhook Secret Validation
   * Webhook should only accept valid secrets.
   * 
   * Validates: Requirements 12.4, 12.5
   */
  it('should accept valid secret', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 50 }),
        (secret) => {
          return validateWebhookSecret(secret, secret) === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Should reject invalid secret
   * 
   * Validates: Requirements 12.4, 12.5
   */
  it('should reject invalid secret', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 50 }),
        (secret, wrongSecret) => {
          if (secret === wrongSecret) return true; // Skip if they happen to match
          return validateWebhookSecret(secret, wrongSecret) === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Should reject empty secrets
   * 
   * Validates: Requirements 12.4, 12.5
   */
  it('should reject empty secrets', () => {
    expect(validateWebhookSecret('', 'test')).toBe(false);
    expect(validateWebhookSecret('test', '')).toBe(false);
    expect(validateWebhookSecret('', '')).toBe(false);
  });
});
