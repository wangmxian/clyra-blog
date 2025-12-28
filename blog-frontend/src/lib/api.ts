/**
 * API 请求封装
 * 在后端不可用时使用模拟数据
 */

import type { Article, ArticleSummary, Category, Tag } from './types';
import {
  mockArticles,
  mockCategories,
  mockTags,
  getArticleContent,
} from './mock-data';

// API 基础地址
const API_BASE = process.env.PUBLIC_API_BASE_URL || 'http://localhost:8080';

// 是否使用模拟数据
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/**
 * API 错误类
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * 获取文章列表
 */
export async function getArticles(): Promise<ArticleSummary[]> {
  if (USE_MOCK) {
    return mockArticles;
  }

  try {
    const res = await fetch(`${API_BASE}/api/public/posts`, {
      next: { revalidate: 60, tags: ['articles'] },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.items || data;
  } catch {
    return mockArticles;
  }
}

/**
 * 获取文章详情
 */
export async function getArticle(slug: string): Promise<Article | null> {
  if (USE_MOCK) {
    const summary = mockArticles.find(a => a.slug === slug);
    if (!summary) return null;
    return {
      ...summary,
      contentMd: getArticleContent(slug),
      seoTitle: summary.title,
      seoDescription: summary.summary,
      keywords: summary.tags.map(t => t.name).join(', '),
      updatedAt: summary.publishedAt,
      isTop: false,
    };
  }

  try {
    const res = await fetch(`${API_BASE}/api/public/posts/${slug}`, {
      next: { tags: ['articles', `article-${slug}`] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    // 回退到模拟数据
    const summary = mockArticles.find(a => a.slug === slug);
    if (!summary) return null;
    return {
      ...summary,
      contentMd: getArticleContent(slug),
      seoTitle: summary.title,
      seoDescription: summary.summary,
      keywords: summary.tags.map(t => t.name).join(', '),
      updatedAt: summary.publishedAt,
      isTop: false,
    };
  }
}

/**
 * 获取所有分类
 */
export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK) {
    return mockCategories;
  }

  try {
    const res = await fetch(`${API_BASE}/api/public/categories`, {
      next: { revalidate: 60, tags: ['categories'] },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    return mockCategories;
  }
}

/**
 * 获取所有标签
 */
export async function getTags(): Promise<Tag[]> {
  if (USE_MOCK) {
    return mockTags;
  }

  try {
    const res = await fetch(`${API_BASE}/api/public/tags`, {
      next: { revalidate: 60, tags: ['tags'] },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    return mockTags;
  }
}

/**
 * 订阅 Newsletter
 */
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  if (USE_MOCK) {
    // 模拟订阅成功
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: '订阅成功！感谢您的关注 🎉' };
  }

  try {
    const res = await fetch(`${API_BASE}/api/public/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  } catch {
    return { success: false, message: '订阅失败，请稍后重试' };
  }
}
