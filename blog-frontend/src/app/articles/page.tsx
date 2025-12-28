/**
 * 文章列表页面
 * 展示所有文章，支持分类筛选
 */

import type { Metadata } from 'next';
import { getArticles, getCategories, getTags } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticlesPageClient } from './ArticlesPageClient';

export const metadata: Metadata = {
  title: `文章 - ${SITE_CONFIG.name}`,
  description: '浏览所有技术文章，涵盖前端开发、后端架构、DevOps 等领域',
  openGraph: {
    title: `文章 - ${SITE_CONFIG.name}`,
    description: '浏览所有技术文章，涵盖前端开发、后端架构、DevOps 等领域',
    type: 'website',
  },
};

// ISR: 每 60 秒重新验证
export const revalidate = 60;

export default async function ArticlesPage() {
  // 并行获取数据
  const [articles, categories, tags] = await Promise.all([
    getArticles(),
    getCategories(),
    getTags(),
  ]);

  // 获取热门文章（按阅读时间排序，取前 5 篇）
  const popularArticles = [...articles]
    .sort((a, b) => b.readingTime - a.readingTime)
    .slice(0, 5);

  return (
    <>
      <Navbar />
      <main>
        <ArticlesPageClient
          articles={articles}
          categories={categories}
          tags={tags}
          popularArticles={popularArticles}
        />
      </main>
      <Footer />
    </>
  );
}
