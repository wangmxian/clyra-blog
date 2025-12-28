/**
 * 模拟数据 - 王慕贤的前端开发博客
 */

import type { ArticleSummary, Category, Tag, Author } from './types';

// ============ 作者信息 ============
export const mockAuthor: Author = {
  name: '王慕贤',
  title: '前端开发工程师',
  bio: '热爱前端技术，专注于 React/Vue 生态和现代 Web 开发。喜欢探索新技术，分享学习心得。',
  avatar: 'https://ui-avatars.com/api/?name=王慕贤&background=6366f1&color=fff&size=200',
  social: {
    github: 'https://github.com/wangmxian',
    twitter: 'https://twitter.com/wangMuXian',
    email: 'wangMuXian@example.com',
  },
};

// ============ 分类 ============
export const mockCategories: Category[] = [
  { id: 1, name: 'React', slug: 'react' },
  { id: 2, name: 'Vue', slug: 'vue' },
  { id: 3, name: 'TypeScript', slug: 'typescript' },
  { id: 4, name: '工程化', slug: 'engineering' },
  { id: 5, name: 'CSS', slug: 'css' },
  { id: 6, name: '性能优化', slug: 'performance' },
  { id: 7, name: '随笔', slug: 'essay' },
];

// ============ 标签 ============
export const mockTags: Tag[] = [
  { id: 1, name: 'React', slug: 'react' },
  { id: 2, name: 'Next.js', slug: 'nextjs' },
  { id: 3, name: 'Vue 3', slug: 'vue3' },
  { id: 4, name: 'TypeScript', slug: 'typescript' },
  { id: 5, name: 'Tailwind CSS', slug: 'tailwindcss' },
  { id: 6, name: 'Vite', slug: 'vite' },
  { id: 7, name: 'Webpack', slug: 'webpack' },
  { id: 8, name: 'Node.js', slug: 'nodejs' },
  { id: 9, name: '状态管理', slug: 'state-management' },
  { id: 10, name: 'Hooks', slug: 'hooks' },
  { id: 11, name: 'CSS-in-JS', slug: 'css-in-js' },
  { id: 12, name: '组件库', slug: 'component-library' },
  { id: 13, name: '测试', slug: 'testing' },
  { id: 14, name: 'CI/CD', slug: 'cicd' },
  { id: 15, name: '面试', slug: 'interview' },
];

// ============ 文章列表 ============
export const mockArticles: ArticleSummary[] = [
  {
    id: 1,
    title: 'Next.js 14 App Router 完全指南',
    slug: 'nextjs-14-app-router-guide',
    summary: '深入探索 Next.js 14 的 App Router 架构，包括 Server Components、Streaming、Parallel Routes 等核心概念，帮助你构建高性能的现代 Web 应用。',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    publishedAt: '2025-01-20T10:00:00Z',
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1], mockTags[3]],
    readingTime: 15,
  },
  {
    id: 2,
    title: 'React 19 新特性前瞻：use() Hook 与 Actions',
    slug: 'react-19-new-features',
    summary: 'React 19 即将带来革命性的变化，包括全新的 use() Hook、Server Actions、以及改进的 Suspense 机制。本文带你提前了解这些激动人心的新特性。',
    coverUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    publishedAt: '2025-01-18T08:30:00Z',
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[9]],
    readingTime: 12,
  },
  {
    id: 3,
    title: 'Vue 3 组合式 API 最佳实践',
    slug: 'vue3-composition-api-best-practices',
    summary: '从 Options API 到 Composition API 的思维转变，以及如何利用组合式函数构建可复用、可测试的 Vue 3 应用。',
    coverUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&q=80',
    publishedAt: '2025-01-15T14:00:00Z',
    category: mockCategories[1],
    tags: [mockTags[2], mockTags[3]],
    readingTime: 10,
  },
  {
    id: 4,
    title: 'TypeScript 5.4 类型体操进阶',
    slug: 'typescript-54-advanced-types',
    summary: '掌握 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型，以及 5.4 版本的新特性 NoInfer。',
    coverUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80',
    publishedAt: '2025-01-12T09:00:00Z',
    category: mockCategories[2],
    tags: [mockTags[3]],
    readingTime: 18,
  },
  {
    id: 5,
    title: 'Tailwind CSS v4 新特性解析',
    slug: 'tailwindcss-v4-features',
    summary: 'Tailwind CSS v4 带来了全新的引擎、更快的构建速度、以及更强大的自定义能力。一起来看看有哪些值得关注的变化。',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    publishedAt: '2025-01-10T11:00:00Z',
    category: mockCategories[4],
    tags: [mockTags[4]],
    readingTime: 8,
  },
  {
    id: 6,
    title: '从零搭建现代前端工程化体系',
    slug: 'modern-frontend-engineering',
    summary: '使用 Vite + TypeScript + ESLint + Prettier + Husky 搭建一套完整的前端工程化方案，提升团队开发效率和代码质量。',
    coverUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    publishedAt: '2025-01-08T16:00:00Z',
    category: mockCategories[3],
    tags: [mockTags[5], mockTags[6], mockTags[13]],
    readingTime: 20,
  },
  {
    id: 7,
    title: 'React 状态管理 2025：Zustand vs Jotai vs Redux Toolkit',
    slug: 'react-state-management-2025',
    summary: '对比分析 2025 年最流行的 React 状态管理方案，帮助你为项目选择最合适的工具。',
    coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    publishedAt: '2025-01-05T10:00:00Z',
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[8]],
    readingTime: 14,
  },
  {
    id: 8,
    title: 'Web 性能优化实战：Core Web Vitals 全攻略',
    slug: 'web-performance-core-web-vitals',
    summary: '深入理解 LCP、FID、CLS 等核心指标，通过实际案例学习如何优化网站性能，提升用户体验和 SEO 排名。',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    publishedAt: '2025-01-03T08:00:00Z',
    category: mockCategories[5],
    tags: [mockTags[0], mockTags[1]],
    readingTime: 16,
  },
  {
    id: 9,
    title: '使用 Vitest 进行 React 组件测试',
    slug: 'react-testing-with-vitest',
    summary: 'Vitest 是新一代的测试框架，与 Vite 完美集成。本文介绍如何使用 Vitest + Testing Library 编写高质量的 React 组件测试。',
    coverUrl: 'https://images.unsplash.com/photo-1576444356170-66073046b1bc?w=1200&q=80',
    publishedAt: '2024-12-28T14:00:00Z',
    category: mockCategories[3],
    tags: [mockTags[0], mockTags[12], mockTags[5]],
    readingTime: 11,
  },
  {
    id: 10,
    title: '2024 前端技术盘点与 2025 展望',
    slug: '2024-frontend-review-2025-outlook',
    summary: '回顾 2024 年前端领域的重要变化，展望 2025 年的技术趋势。从框架演进到 AI 辅助开发，前端的未来充满可能。',
    coverUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    publishedAt: '2024-12-31T20:00:00Z',
    category: mockCategories[6],
    tags: [],
    readingTime: 10,
  },
  {
    id: 11,
    title: '前端面试必备：手写 Promise 全解析',
    slug: 'handwrite-promise-complete-guide',
    summary: '从零实现一个符合 Promise/A+ 规范的 Promise，深入理解异步编程的核心原理，轻松应对面试中的手写题。',
    coverUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80',
    publishedAt: '2024-12-25T10:00:00Z',
    category: mockCategories[2],
    tags: [mockTags[3], mockTags[14]],
    readingTime: 15,
  },
  {
    id: 12,
    title: 'CSS Container Queries 实战指南',
    slug: 'css-container-queries-guide',
    summary: 'Container Queries 终于得到了主流浏览器的支持！学习如何使用这个强大的特性构建真正响应式的组件。',
    coverUrl: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=1200&q=80',
    publishedAt: '2024-12-20T09:00:00Z',
    category: mockCategories[4],
    tags: [mockTags[4], mockTags[11]],
    readingTime: 9,
  },
];

// ============ 文章详情内容 ============
export const mockArticleContents: Record<string, string> = {
  'nextjs-14-app-router-guide': `
# Next.js 14 App Router 完全指南

Next.js 14 的 App Router 代表了 React 应用架构的重大演进。本文将深入探讨其核心概念和最佳实践。

![Next.js Architecture](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80)

## 为什么选择 App Router？

App Router 基于 React Server Components 构建，提供了：

- **更好的性能**：默认服务端渲染，减少客户端 JavaScript
- **更简单的数据获取**：直接在组件中 async/await
- **更灵活的布局**：嵌套布局、并行路由
- **内置 SEO 支持**：Metadata API

## Server Components vs Client Components

\`\`\`tsx
// Server Component (默认)
async function ArticleList() {
  const articles = await db.articles.findMany();
  
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
}

// Client Component
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

## 数据获取模式

### 1. 服务端数据获取

\`\`\`tsx
// app/articles/page.tsx
export default async function ArticlesPage() {
  const articles = await fetch('https://api.example.com/articles', {
    next: { revalidate: 60 } // ISR: 60秒后重新验证
  }).then(res => res.json());

  return <ArticleList articles={articles} />;
}
\`\`\`

### 2. 并行数据获取

\`\`\`tsx
async function Dashboard() {
  // 并行获取，不会瀑布式请求
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <CommentList comments={comments} />
    </div>
  );
}
\`\`\`

## Streaming 与 Suspense

\`\`\`tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

## 路由处理

### 动态路由

\`\`\`
app/
├── articles/
│   ├── page.tsx           # /articles
│   └── [slug]/
│       └── page.tsx       # /articles/:slug
\`\`\`

### 路由组

\`\`\`
app/
├── (marketing)/
│   ├── about/page.tsx     # /about
│   └── contact/page.tsx   # /contact
├── (shop)/
│   ├── products/page.tsx  # /products
│   └── cart/page.tsx      # /cart
\`\`\`

## 最佳实践

1. **优先使用 Server Components** - 只在需要交互时使用 Client Components
2. **合理使用缓存** - 利用 \`revalidate\` 和 \`cache\` 优化性能
3. **善用 Streaming** - 提升首屏加载体验
4. **组织好目录结构** - 使用路由组和私有文件夹

## 总结

Next.js 14 的 App Router 是构建现代 Web 应用的强大工具。掌握 Server Components、数据获取模式和路由系统，你就能构建出高性能、可维护的应用。

---

*本文由王慕贤原创，欢迎关注我的 [GitHub](https://github.com/wangmxian)*
`,

  'react-19-new-features': `
# React 19 新特性前瞻：use() Hook 与 Actions

React 19 即将带来一系列激动人心的新特性，让我们提前了解这些变化。

![React 19](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80)

## use() Hook

\`use()\` 是一个全新的 Hook，可以在渲染时读取 Promise 或 Context 的值。

\`\`\`tsx
import { use } from 'react';

function Comments({ commentsPromise }) {
  // 在渲染时等待 Promise
  const comments = use(commentsPromise);
  
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

### use() 的特点

- 可以在条件语句中使用（不同于其他 Hooks）
- 自动与 Suspense 集成
- 支持读取 Context

\`\`\`tsx
function Button() {
  if (someCondition) {
    const theme = use(ThemeContext);
    return <button className={theme}>Click me</button>;
  }
  return <button>Default</button>;
}
\`\`\`

## Server Actions

Server Actions 让你可以直接在客户端组件中调用服务端函数。

\`\`\`tsx
// actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.posts.create({ title, content });
  revalidatePath('/posts');
}

// PostForm.tsx
'use client';

import { createPost } from './actions';

function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="标题" />
      <textarea name="content" placeholder="内容" />
      <button type="submit">发布</button>
    </form>
  );
}
\`\`\`

## useFormStatus

\`\`\`tsx
'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}
\`\`\`

## useOptimistic

实现乐观更新变得更简单：

\`\`\`tsx
'use client';

import { useOptimistic } from 'react';

function LikeButton({ likes, onLike }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, newLike) => [...state, newLike]
  );

  async function handleLike() {
    addOptimisticLike({ id: Date.now(), pending: true });
    await onLike();
  }

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes.length}
    </button>
  );
}
\`\`\`

## 改进的 Suspense

React 19 改进了 Suspense 的行为，支持更细粒度的加载状态控制。

## 总结

React 19 的这些新特性将大大简化我们的开发工作，特别是在处理异步操作和表单方面。期待正式版本的发布！

---

*关注 [GitHub](https://github.com/wangmxian) 获取更多前端技术分享*
`,

  'vue3-composition-api-best-practices': `
# Vue 3 组合式 API 最佳实践

Vue 3 的组合式 API 带来了全新的代码组织方式，让我们来看看如何充分利用它。

![Vue 3](https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&q=80)

## 从 Options API 到 Composition API

\`\`\`vue
<!-- Options API -->
<script>
export default {
  data() {
    return { count: 0 };
  },
  computed: {
    double() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>

<!-- Composition API -->
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);
const increment = () => count.value++;
</script>
\`\`\`

## 组合式函数 (Composables)

\`\`\`typescript
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function update(event: MouseEvent) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}

// 使用
<script setup>
import { useMouse } from '@/composables/useMouse';

const { x, y } = useMouse();
</script>
\`\`\`

## 异步数据获取

\`\`\`typescript
// composables/useFetch.ts
import { ref, watchEffect } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  watchEffect(async () => {
    loading.value = true;
    try {
      const res = await fetch(url);
      data.value = await res.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
\`\`\`

## 状态管理

\`\`\`typescript
// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  
  function increment() {
    count.value++;
  }

  return { count, double, increment };
});
\`\`\`

## 最佳实践总结

1. **按功能组织代码** - 相关逻辑放在一起
2. **提取可复用逻辑** - 使用 composables
3. **使用 TypeScript** - 获得更好的类型支持
4. **保持组合函数纯净** - 避免副作用

---

*更多 Vue 技术分享，关注 [GitHub](https://github.com/wangmxian)*
`,

  'typescript-54-advanced-types': `
# TypeScript 5.4 类型体操进阶

掌握 TypeScript 的高级类型系统，让你的代码更加类型安全。

![TypeScript](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80)

## 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 实用示例：提取 Promise 的值类型
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type Result = Awaited<Promise<Promise<string>>>; // string
\`\`\`

## 映射类型

\`\`\`typescript
// 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 将所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 自定义：将所有属性变为 getter
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }
\`\`\`

## 模板字面量类型

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'

// 组合使用
type PropEventSource<T> = {
  on<K extends string & keyof T>(
    eventName: \`\${K}Changed\`,
    callback: (newValue: T[K]) => void
  ): void;
};
\`\`\`

## TypeScript 5.4 新特性：NoInfer

\`\`\`typescript
// 问题：T 被推断为 'a' | 'b' | 'c'
function createStreetLight<T extends string>(
  colors: T[],
  defaultColor: T
) {}

createStreetLight(['red', 'yellow', 'green'], 'blue'); // 不报错！

// 解决：使用 NoInfer
function createStreetLight<T extends string>(
  colors: T[],
  defaultColor: NoInfer<T>
) {}

createStreetLight(['red', 'yellow', 'green'], 'blue'); // 报错！
\`\`\`

## 实战：实现 DeepPartial

\`\`\`typescript
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
}

type PartialConfig = DeepPartial<Config>;
// 所有嵌套属性都变为可选
\`\`\`

## 类型体操练习

推荐在 [Type Challenges](https://github.com/type-challenges/type-challenges) 上练习！

---

*TypeScript 进阶之路，关注 [GitHub](https://github.com/wangmxian)*
`,
};

// 为其他文章生成默认内容
const defaultContent = (title: string) => `
# ${title}

这是一篇关于前端开发的技术文章。

## 简介

文章内容正在编写中...

## 核心内容

敬请期待更多精彩内容！

---

*关注 [GitHub](https://github.com/wangmxian) 获取更多前端技术分享*
`;

// 获取文章内容
export function getArticleContent(slug: string): string {
  return mockArticleContents[slug] || defaultContent(
    mockArticles.find(a => a.slug === slug)?.title || '文章'
  );
}

// 获取文章标题
export function getArticleHeadings(slug: string) {
  const content = getArticleContent(slug);
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }

  return headings;
}
