/**
 * 搜索过滤函数
 */

import type { ArticleSummary } from './types';

/**
 * 根据查询字符串过滤文章
 * 匹配规则：标题、摘要或标签名称包含查询字符串（不区分大小写）
 * 
 * @param articles 文章列表
 * @param query 查询字符串
 * @returns 匹配的文章列表
 */
export function filterArticlesByQuery(
  articles: ArticleSummary[],
  query: string
): ArticleSummary[] {
  if (!query || !query.trim()) {
    return articles;
  }

  const lowerQuery = query.toLowerCase().trim();

  return articles.filter((article) => {
    // 检查标题
    if (article.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // 检查摘要
    if (article.summary.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // 检查标签
    if (article.tags.some((tag) => tag.name.toLowerCase().includes(lowerQuery))) {
      return true;
    }

    return false;
  });
}

/**
 * 根据分类过滤文章
 * 
 * @param articles 文章列表
 * @param categorySlug 分类 slug（'all' 表示所有分类）
 * @returns 匹配的文章列表
 */
export function filterArticlesByCategory(
  articles: ArticleSummary[],
  categorySlug: string
): ArticleSummary[] {
  if (!categorySlug || categorySlug === 'all') {
    return articles;
  }

  return articles.filter(
    (article) => article.category.slug === categorySlug
  );
}

/**
 * 根据标签过滤文章
 * 
 * @param articles 文章列表
 * @param tagSlug 标签 slug
 * @returns 匹配的文章列表
 */
export function filterArticlesByTag(
  articles: ArticleSummary[],
  tagSlug: string
): ArticleSummary[] {
  if (!tagSlug) {
    return articles;
  }

  return articles.filter((article) =>
    article.tags.some((tag) => tag.slug === tagSlug)
  );
}

/**
 * 高亮搜索结果中的匹配文本
 * 
 * @param text 原始文本
 * @param query 查询字符串
 * @returns 带有高亮标记的文本
 */
export function highlightMatch(text: string, query: string): string {
  if (!query || !query.trim()) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 搜索结果排序
 * 优先级：标题匹配 > 标签匹配 > 摘要匹配
 * 
 * @param articles 文章列表
 * @param query 查询字符串
 * @returns 排序后的文章列表
 */
export function sortSearchResults(
  articles: ArticleSummary[],
  query: string
): ArticleSummary[] {
  if (!query || !query.trim()) {
    return articles;
  }

  const lowerQuery = query.toLowerCase().trim();

  return [...articles].sort((a, b) => {
    const aScore = getMatchScore(a, lowerQuery);
    const bScore = getMatchScore(b, lowerQuery);
    return bScore - aScore;
  });
}

/**
 * 计算文章与查询的匹配分数
 */
function getMatchScore(article: ArticleSummary, query: string): number {
  let score = 0;

  // 标题匹配（最高优先级）
  if (article.title.toLowerCase().includes(query)) {
    score += 100;
    // 标题开头匹配加分
    if (article.title.toLowerCase().startsWith(query)) {
      score += 50;
    }
  }

  // 标签匹配
  if (article.tags.some((tag) => tag.name.toLowerCase().includes(query))) {
    score += 50;
  }

  // 摘要匹配
  if (article.summary.toLowerCase().includes(query)) {
    score += 25;
  }

  return score;
}
