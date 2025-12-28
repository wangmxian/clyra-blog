/**
 * 博客系统类型定义
 */

// ===== 分类 =====
export interface Category {
  id: number;
  name: string;
  slug: string;
  articleCount?: number;
}

// ===== 标签 =====
export interface Tag {
  id: number;
  name: string;
  slug: string;
  articleCount?: number;
}

// ===== 文章摘要（列表用）=====
export interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverUrl: string | null;
  publishedAt: string;
  category: Category;
  tags: Tag[];
  readingTime: number; // 分钟
}

// ===== 文章详情 =====
export interface Article extends ArticleSummary {
  contentMd: string;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string | null;
  updatedAt: string;
  isTop: boolean;
}

// ===== 文章列表响应 =====
export interface ArticleListResponse {
  items: ArticleSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ===== 目录标题 =====
export interface Heading {
  id: string;
  text: string;
  level: number; // 1-6
}

// ===== 作者信息 =====
export interface Author {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

// ===== 站点配置 =====
export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: Author;
}

// ===== 搜索结果 =====
export interface SearchResult {
  articles: ArticleSummary[];
  tags: Tag[];
}

// ===== API 请求参数 =====
export interface ArticleListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  q?: string;
}

// ===== Revalidate Webhook 请求体 =====
export interface RevalidateRequest {
  type: 'article' | 'category' | 'tag';
  slug?: string;
}

// ===== 订阅表单数据 =====
export interface NewsletterFormData {
  email: string;
}

// ===== 订阅响应 =====
export interface NewsletterResponse {
  success: boolean;
  message: string;
}
