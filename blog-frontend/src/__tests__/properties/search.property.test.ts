/**
 * Property-Based Test: Search Results Match Query
 * 
 * Feature: blog-frontend, Property 1: Search Results Match Query
 * For any search query string, all returned articles in the search results
 * SHALL have the query string appearing in at least one of: title, summary,
 * or tag names (case-insensitive match).
 * 
 * Validates: Requirements 2.4
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterArticlesByQuery, filterArticlesByCategory, filterArticlesByTag } from '@/lib/search';
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

// 生成器：创建随机文章摘要
const articleSummaryArb = fc.record<ArticleSummary>({
  id: fc.integer({ min: 1, max: 10000 }),
  title: fc.string({ minLength: 1, maxLength: 200 }),
  slug: fc.string({ minLength: 1, maxLength: 100 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')),
  summary: fc.string({ minLength: 0, maxLength: 500 }),
  coverUrl: fc.option(fc.webUrl(), { nil: null }),
  publishedAt: fc.constant('2025-01-01T00:00:00.000Z'),
  category: categoryArb,
  tags: fc.array(tagArb, { minLength: 0, maxLength: 5 }),
  readingTime: fc.integer({ min: 1, max: 60 }),
});

describe('Property Tests: Search Filtering', () => {
  /**
   * Property 1: Search Results Match Query
   * For any search query, all returned articles should match the query
   * in title, summary, or tags.
   * 
   * Validates: Requirements 2.4
   */
  it('all search results should contain the query in title, summary, or tags', () => {
    fc.assert(
      fc.property(
        // 使用非空白字符串作为查询，因为搜索函数会 trim 空白
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0),
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        (query, articles) => {
          const results = filterArticlesByQuery(articles, query);
          // 使用 trim 后的查询进行验证，与搜索函数行为一致
          const lowerQuery = query.toLowerCase().trim();

          // 所有结果都应该在标题、摘要或标签中包含查询字符串
          return results.every((article) => {
            const titleMatch = article.title.toLowerCase().includes(lowerQuery);
            const summaryMatch = article.summary.toLowerCase().includes(lowerQuery);
            const tagMatch = article.tags.some((tag) =>
              tag.name.toLowerCase().includes(lowerQuery)
            );
            return titleMatch || summaryMatch || tagMatch;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1: Search Results Match Query (Subset Property)
   * Search results should be a subset of the original articles.
   * 
   * Validates: Requirements 2.4
   */
  it('search results should be a subset of original articles', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 20 }),
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        (query, articles) => {
          const results = filterArticlesByQuery(articles, query);
          
          // 结果数量不应超过原始数量
          if (results.length > articles.length) return false;
          
          // 所有结果都应该在原始列表中
          return results.every((result) =>
            articles.some((article) => article.id === result.id)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1: Empty query returns all articles
   * 
   * Validates: Requirements 2.4
   */
  it('empty query should return all articles', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        (articles) => {
          const resultsEmpty = filterArticlesByQuery(articles, '');
          const resultsWhitespace = filterArticlesByQuery(articles, '   ');
          
          return (
            resultsEmpty.length === articles.length &&
            resultsWhitespace.length === articles.length
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Category Filtering Consistency
   * For any category selection, all displayed articles should belong to that category.
   * 
   * Validates: Requirements 3.2, 5.1
   */
  it('category filter should only return articles from that category', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        categoryArb,
        (articles, category) => {
          // 给一些文章设置这个分类
          const articlesWithCategory = articles.map((article, index) => ({
            ...article,
            category: index % 2 === 0 ? category : article.category,
          }));

          const results = filterArticlesByCategory(articlesWithCategory, category.slug);

          // 所有结果都应该属于指定分类
          return results.every((article) => article.category.slug === category.slug);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Category filter 'all' returns all articles
   * 
   * Validates: Requirements 3.2, 5.1
   */
  it('category filter "all" should return all articles', () => {
    fc.assert(
      fc.property(
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 20 }),
        (articles) => {
          const results = filterArticlesByCategory(articles, 'all');
          return results.length === articles.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Tag Filtering Consistency
   * For any tag page, all displayed articles should have that tag.
   * 
   * Validates: Requirements 5.2
   */
  it('tag filter should only return articles with that tag', () => {
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

          const results = filterArticlesByTag(articlesWithTag, tag.slug);

          // 所有结果都应该包含指定标签
          return results.every((article) =>
            article.tags.some((t) => t.slug === tag.slug)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Search is case-insensitive
   * 
   * Validates: Requirements 2.4
   */
  it('search should be case-insensitive', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 10 }),
        fc.array(articleSummaryArb, { minLength: 0, maxLength: 10 }),
        (query, articles) => {
          const lowerResults = filterArticlesByQuery(articles, query.toLowerCase());
          const upperResults = filterArticlesByQuery(articles, query.toUpperCase());
          const mixedResults = filterArticlesByQuery(articles, query);

          // 不同大小写的查询应该返回相同数量的结果
          return (
            lowerResults.length === upperResults.length &&
            upperResults.length === mixedResults.length
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
