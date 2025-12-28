# Design Document: Blog Frontend System

## Overview

本设计文档描述基于 Next.js 14+ (App Router) 的个人博客前台系统架构。系统采用 index_3.html 的玻璃拟态设计风格，通过 ISR（增量静态再生成）实现高性能渲染，与若依 Spring Boot 后台通过 Public API 集成。

### 设计目标

- **SEO 优化**: 静态生成页面，完整的元数据支持
- **高性能**: ISR 渲染策略，图片优化，资源缓存
- **优雅体验**: 玻璃拟态 UI，流畅动画，响应式布局
- **可维护性**: 组件化架构，类型安全，清晰的数据流

## Architecture

### 技术栈

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js 14+)                  │
├─────────────────────────────────────────────────────────────┤
│  Framework    │ Next.js 14+ (App Router, Server Components) │
│  Styling      │ Tailwind CSS + CSS Variables                │
│  Animation    │ Framer Motion                               │
│  Markdown     │ react-markdown + rehype-highlight           │
│  Icons        │ Phosphor Icons                              │
│  Fonts        │ Outfit + Playfair Display (Google Fonts)    │
│  State        │ React Server Components + URL State         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (若依 Spring Boot)                │
├─────────────────────────────────────────────────────────────┤
│  Public API   │ /api/public/posts, /categories, /tags       │
│  Revalidate   │ POST /api/revalidate?secret=xxx             │
│  Static Files │ /uploads/* (图片资源)                        │
└─────────────────────────────────────────────────────────────┘
```

### 目录结构

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局（导航、页脚）
│   ├── page.tsx                 # 首页
│   ├── articles/
│   │   ├── page.tsx             # 文章列表页
│   │   └── [slug]/
│   │       └── page.tsx         # 文章详情页
│   ├── categories/
│   │   ├── page.tsx             # 分类列表页
│   │   └── [slug]/
│   │       └── page.tsx         # 分类详情页
│   ├── tags/
│   │   ├── page.tsx             # 标签列表页
│   │   └── [slug]/
│   │       └── page.tsx         # 标签详情页
│   ├── about/
│   │   └── page.tsx             # 关于页面
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts         # Revalidate webhook
│   ├── sitemap.ts               # 动态 sitemap
│   ├── robots.ts                # robots.txt
│   └── feed.xml/
│       └── route.ts             # RSS feed
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # 导航栏
│   │   ├── Footer.tsx           # 页脚
│   │   └── Sidebar.tsx          # 侧边栏
│   ├── ui/
│   │   ├── GlassCard.tsx        # 玻璃拟态卡片
│   │   ├── Button.tsx           # 按钮组件
│   │   ├── Tag.tsx              # 标签组件
│   │   └── SearchModal.tsx      # 搜索弹窗
│   ├── article/
│   │   ├── ArticleCard.tsx      # 文章卡片
│   │   ├── ArticleContent.tsx   # 文章内容渲染
│   │   ├── TableOfContents.tsx  # 目录组件
│   │   ├── ReadingProgress.tsx  # 阅读进度条
│   │   └── CodeBlock.tsx        # 代码块组件
│   ├── home/
│   │   ├── HeroSection.tsx      # Hero 区域
│   │   ├── FeaturedArticle.tsx  # 特色文章
│   │   ├── NewsletterForm.tsx   # 订阅表单
│   │   └── StatsCard.tsx        # 统计卡片
│   └── common/
│       ├── CategoryFilter.tsx   # 分类筛选器
│       ├── Pagination.tsx       # 分页组件
│       ├── ImageLightbox.tsx    # 图片灯箱
│       └── AnimatedSection.tsx  # 动画容器
├── lib/
│   ├── api.ts                   # API 请求封装
│   ├── types.ts                 # TypeScript 类型定义
│   └── utils.ts                 # 工具函数
└── styles/
    └── globals.css              # 全局样式
```

### 渲染策略

```
┌────────────────────┬─────────────────────────────────────────┐
│ 页面               │ 渲染策略                                 │
├────────────────────┼─────────────────────────────────────────┤
│ 首页               │ ISR (revalidate: 60s)                   │
│ 文章列表           │ ISR (revalidate: 60s)                   │
│ 文章详情           │ ISR (on-demand via webhook)             │
│ 分类/标签页        │ ISR (revalidate: 60s)                   │
│ 关于页             │ Static (build time)                     │
│ sitemap.xml        │ Dynamic (on request)                    │
│ rss.xml            │ Dynamic (on request)                    │
└────────────────────┴─────────────────────────────────────────┘
```

## Components and Interfaces

### API 接口定义

```typescript
// lib/api.ts

const API_BASE = process.env.PUBLIC_API_BASE_URL;

// 获取文章列表
export async function getArticles(params: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  q?: string;
}): Promise<ArticleListResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize));
  if (params.category) searchParams.set('category', params.category);
  if (params.tag) searchParams.set('tag', params.tag);
  if (params.q) searchParams.set('q', params.q);
  
  const res = await fetch(`${API_BASE}/api/public/posts?${searchParams}`, {
    next: { revalidate: 60, tags: ['articles'] }
  });
  return res.json();
}

// 获取文章详情
export async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(`${API_BASE}/api/public/posts/${slug}`, {
    next: { tags: ['articles', `article-${slug}`] }
  });
  return res.json();
}

// 获取分类列表
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/public/categories`, {
    next: { revalidate: 60, tags: ['categories'] }
  });
  return res.json();
}

// 获取标签列表
export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${API_BASE}/api/public/tags`, {
    next: { revalidate: 60, tags: ['tags'] }
  });
  return res.json();
}
```

### 核心组件接口

```typescript
// components/ui/GlassCard.tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;        // 是否启用悬停效果
  dark?: boolean;         // 深色模式
}

// components/article/ArticleCard.tsx
interface ArticleCardProps {
  article: ArticleSummary;
  variant?: 'default' | 'featured' | 'compact';
}

// components/article/ArticleContent.tsx
interface ArticleContentProps {
  content: string;        // Markdown 内容
  onHeadingsExtracted?: (headings: Heading[]) => void;
}

// components/article/TableOfContents.tsx
interface TableOfContentsProps {
  headings: Heading[];
  activeId?: string;
}

// components/ui/SearchModal.tsx
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// components/home/NewsletterForm.tsx
interface NewsletterFormProps {
  variant?: 'inline' | 'card';
}

// components/common/CategoryFilter.tsx
interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryChange: (category: string | null) => void;
}
```

### Revalidate Webhook

```typescript
// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // 验证 secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  const body = await request.json();
  const { type, slug } = body;
  
  // 根据类型刷新对应缓存
  switch (type) {
    case 'article':
      revalidateTag('articles');
      if (slug) revalidateTag(`article-${slug}`);
      revalidatePath('/');
      revalidatePath('/articles');
      break;
    case 'category':
      revalidateTag('categories');
      revalidatePath('/categories');
      break;
    case 'tag':
      revalidateTag('tags');
      revalidatePath('/tags');
      break;
  }
  
  return NextResponse.json({ revalidated: true });
}
```

## Data Models

### TypeScript 类型定义

```typescript
// lib/types.ts

// 文章摘要（列表用）
export interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverUrl: string | null;
  publishedAt: string;
  category: Category;
  tags: Tag[];
  readingTime: number;      // 分钟
}

// 文章详情
export interface Article extends ArticleSummary {
  contentMd: string;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string | null;
  updatedAt: string;
  isTop: boolean;
}

// 文章列表响应
export interface ArticleListResponse {
  items: ArticleSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 分类
export interface Category {
  id: number;
  name: string;
  slug: string;
  articleCount?: number;
}

// 标签
export interface Tag {
  id: number;
  name: string;
  slug: string;
  articleCount?: number;
}

// 目录标题
export interface Heading {
  id: string;
  text: string;
  level: number;          // 1-6
}

// 作者信息
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

// 站点配置
export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: Author;
}

// 搜索结果
export interface SearchResult {
  articles: ArticleSummary[];
  tags: Tag[];
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Search Results Match Query

*For any* search query string, all returned articles in the search results SHALL have the query string appearing in at least one of: title, summary, or tag names (case-insensitive match).

**Validates: Requirements 2.4**

### Property 2: Category Filtering Consistency

*For any* category selection (including "All Posts"), all displayed articles SHALL belong to the selected category. When "All Posts" is selected, articles from all categories SHALL be displayed.

**Validates: Requirements 3.2, 5.1**

### Property 3: Tag Filtering Consistency

*For any* tag page, all displayed articles SHALL have the specified tag in their tags array.

**Validates: Requirements 5.2**

### Property 4: Article Card Data Completeness

*For any* article summary object, the rendered Article_Card SHALL display all required fields: thumbnail (or placeholder), category name, formatted date, reading time, title, summary text, and at least one tag.

**Validates: Requirements 3.3, 4.1**

### Property 5: Markdown Rendering Integrity

*For any* valid Markdown content string, the Article_Renderer SHALL produce valid HTML output. Specifically, all Markdown headings SHALL be converted to corresponding HTML heading elements (h1-h6), and code blocks SHALL be wrapped in `<pre><code>` elements.

**Validates: Requirements 4.2**

### Property 6: Article Count Accuracy

*For any* category or tag, the displayed article count SHALL equal the actual number of published articles belonging to that category or having that tag.

**Validates: Requirements 5.3**

### Property 7: SEO Metadata Completeness

*For any* page in the blog system, the HTML output SHALL contain: a unique `<title>` tag, a `<meta name="description">` tag, and a `<link rel="canonical">` tag. For article pages, OpenGraph tags (og:title, og:description, og:image) SHALL also be present.

**Validates: Requirements 8.1, 8.2, 8.6**

### Property 8: Sitemap Completeness

*For any* set of published articles in the system, the generated sitemap.xml SHALL contain a `<url>` entry for each published article, and the total count of article URLs in the sitemap SHALL equal the total count of published articles.

**Validates: Requirements 8.3**

### Property 9: RSS Feed Completeness

*For any* set of published articles, the generated RSS feed SHALL contain an `<item>` entry for each of the most recent N articles (where N is the configured limit), with valid title, link, description, and pubDate elements.

**Validates: Requirements 8.5**

### Property 10: Email Validation Correctness

*For any* input string to the Newsletter_Form, the validation function SHALL return true if and only if the string matches a valid email format (contains exactly one @ symbol, has non-empty local and domain parts, and domain contains at least one dot).

**Validates: Requirements 11.1, 11.4**

### Property 11: Webhook Secret Validation

*For any* incoming revalidate webhook request, the system SHALL return HTTP 401 status if the provided secret does not match the configured REVALIDATE_SECRET environment variable, and SHALL return HTTP 200 only when the secret matches.

**Validates: Requirements 12.4, 12.5**

### Property 12: Code Syntax Highlighting

*For any* code block in Markdown content with a specified language identifier (e.g., ```javascript), the rendered HTML SHALL contain syntax highlighting classes applied to the code tokens.

**Validates: Requirements 14.1, 14.4**



## Error Handling

### API 错误处理

```typescript
// lib/api.ts

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

async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options);
    
    if (!res.ok) {
      throw new APIError(
        `API request failed: ${res.statusText}`,
        res.status
      );
    }
    
    return res.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error', 0, 'NETWORK_ERROR');
  }
}
```

### 页面级错误处理

```typescript
// app/articles/[slug]/error.tsx
'use client';

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-4">文章加载失败</h2>
        <p className="text-gray-500 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-black text-white rounded-full"
        >
          重试
        </button>
      </div>
    </div>
  );
}
```

### 404 处理

```typescript
// app/articles/[slug]/not-found.tsx
export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-serif mb-4">404</h1>
        <p className="text-gray-500 mb-6">文章不存在或已被删除</p>
        <a href="/articles" className="px-6 py-2 bg-black text-white rounded-full">
          返回文章列表
        </a>
      </div>
    </div>
  );
}
```

### 表单验证错误

| 场景 | 错误消息 | 处理方式 |
|------|----------|----------|
| 邮箱格式无效 | "请输入有效的邮箱地址" | 显示内联错误，阻止提交 |
| 邮箱为空 | "请输入邮箱地址" | 显示内联错误，阻止提交 |
| 订阅失败 | "订阅失败，请稍后重试" | 显示 toast 提示 |
| 搜索无结果 | "未找到相关文章" | 显示空状态 UI |

### Webhook 错误响应

| 状态码 | 场景 | 响应体 |
|--------|------|--------|
| 401 | Secret 无效 | `{ error: 'Invalid secret' }` |
| 400 | 请求体格式错误 | `{ error: 'Invalid request body' }` |
| 500 | 刷新失败 | `{ error: 'Revalidation failed' }` |
| 200 | 成功 | `{ revalidated: true, path: '...' }` |

## Testing Strategy

### 测试框架

- **单元测试**: Vitest
- **组件测试**: React Testing Library
- **属性测试**: fast-check
- **E2E 测试**: Playwright (可选)

### 单元测试覆盖

```typescript
// __tests__/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { validateEmail, formatDate, calculateReadingTime } from '@/lib/utils';

describe('validateEmail', () => {
  it('should return true for valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });
  
  it('should return false for invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('no@domain')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
  });
});

describe('calculateReadingTime', () => {
  it('should calculate reading time based on word count', () => {
    const shortContent = 'Hello world'; // 2 words
    const longContent = 'word '.repeat(1000); // 1000 words
    
    expect(calculateReadingTime(shortContent)).toBe(1);
    expect(calculateReadingTime(longContent)).toBe(5); // ~200 words/min
  });
});
```

### 属性测试

每个属性测试必须运行至少 100 次迭代。

```typescript
// __tests__/properties/search.property.test.ts
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterArticlesByQuery } from '@/lib/search';

describe('Property Tests', () => {
  /**
   * Feature: blog-frontend, Property 1: Search Results Match Query
   * For any search query, all returned articles should match the query
   * in title, summary, or tags.
   * Validates: Requirements 2.4
   */
  it('search results should match query in title, summary, or tags', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.array(fc.record({
          title: fc.string(),
          summary: fc.string(),
          tags: fc.array(fc.record({ name: fc.string() }))
        }), { minLength: 0, maxLength: 20 }),
        (query, articles) => {
          const results = filterArticlesByQuery(articles, query);
          
          return results.every(article => {
            const lowerQuery = query.toLowerCase();
            return (
              article.title.toLowerCase().includes(lowerQuery) ||
              article.summary.toLowerCase().includes(lowerQuery) ||
              article.tags.some(tag => 
                tag.name.toLowerCase().includes(lowerQuery)
              )
            );
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: blog-frontend, Property 10: Email Validation Correctness
   * For any input string, validation should correctly identify valid emails.
   * Validates: Requirements 11.1, 11.4
   */
  it('email validation should correctly identify valid and invalid emails', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        (email) => {
          return validateEmail(email) === true;
        }
      ),
      { numRuns: 100 }
    );
    
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes('@') || s.split('@').length !== 2),
        (invalidEmail) => {
          return validateEmail(invalidEmail) === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: blog-frontend, Property 11: Webhook Secret Validation
   * For any request, invalid secrets should return 401.
   * Validates: Requirements 12.4, 12.5
   */
  it('webhook should reject invalid secrets with 401', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        (providedSecret, configuredSecret) => {
          fc.pre(providedSecret !== configuredSecret);
          
          const result = validateWebhookSecret(providedSecret, configuredSecret);
          return result.status === 401;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### 组件测试

```typescript
// __tests__/components/ArticleCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '@/components/article/ArticleCard';

describe('ArticleCard', () => {
  const mockArticle = {
    id: 1,
    title: 'Test Article',
    slug: 'test-article',
    summary: 'This is a test summary',
    coverUrl: '/test.jpg',
    publishedAt: '2025-01-01',
    category: { id: 1, name: 'Backend', slug: 'backend' },
    tags: [{ id: 1, name: 'Java', slug: 'java' }],
    readingTime: 5
  };

  it('should display all required fields', () => {
    render(<ArticleCard article={mockArticle} />);
    
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('This is a test summary')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText(/5 MIN READ/i)).toBeInTheDocument();
  });
});
```

### 测试覆盖目标

| 类型 | 覆盖目标 | 重点区域 |
|------|----------|----------|
| 单元测试 | 80%+ | 工具函数、数据转换 |
| 属性测试 | 12 个属性 | 搜索、过滤、验证、SEO |
| 组件测试 | 核心组件 | ArticleCard, SearchModal, NewsletterForm |
| E2E 测试 | 关键路径 | 首页加载、文章阅读、搜索流程 |

## UI 组件详细设计

### 玻璃拟态卡片样式

```css
/* styles/globals.css */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.02);
}

.glass-card-dark {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 动画配置

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const imageZoom = {
  scale: 1,
  transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
};

export const imageZoomHover = {
  scale: 1.05
};
```

### 颜色系统

```typescript
// tailwind.config.ts
const colors = {
  'soft-bg': '#FDFCF8',      // 主背景色
  'accent': '#1A1A1A',        // 强调色/文字
  'sub-text': '#6B7280',      // 次要文字
  'card-bg': 'rgba(255, 255, 255, 0.6)',  // 卡片背景
  'border': 'rgba(255, 255, 255, 0.8)',   // 边框
};
```
