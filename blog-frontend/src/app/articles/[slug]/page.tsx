/**
 * 文章详情页面
 * 展示文章完整内容、目录、相关文章
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticle, getArticles } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';
import { formatDate } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Tag } from '@/components/ui/Tag';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArticleDetailClient } from './ArticleDetailClient';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// 生成静态参数
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${article.title} - ${SITE_CONFIG.name}`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [SITE_CONFIG.author.name],
      images: article.coverUrl ? [article.coverUrl] : [],
    },
  };
}

// ISR: 每 60 秒重新验证
export const revalidate = 60;

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // 获取相关文章（同分类的其他文章）
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.category.slug === article.category.slug && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg">
        {/* 文章头部 */}
        <header className="pt-24 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* 分类和日期 */}
            <div className="flex items-center gap-3 mb-6">
              <Link href={`/categories/${article.category.slug}`}>
                <Tag name={article.category.name} variant="filled" />
              </Link>
              <span className="text-sub-text">
                {formatDate(article.publishedAt)}
              </span>
              <span className="text-sub-text">
                · {article.readingTime} 分钟阅读
              </span>
            </div>

            {/* 标题 */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* 摘要 */}
            <p className="text-xl text-sub-text leading-relaxed mb-6">
              {article.summary}
            </p>

            {/* 标签 */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <Link key={tag.id} href={`/tags/${tag.slug}`}>
                    <Tag name={tag.name} variant="outline" />
                  </Link>
                ))}
              </div>
            )}

            {/* 封面图 */}
            {article.coverUrl && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </header>

        {/* 文章内容（客户端组件处理交互） */}
        <ArticleDetailClient
          content={article.contentMd}
        />

        {/* 相关文章 */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-4 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
                相关文章
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/articles/${related.slug}`}
                    className="group"
                  >
                    <GlassCard className="h-full" hover>
                      {related.coverUrl && (
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={related.coverUrl}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="font-display font-bold text-gray-900 group-hover:text-accent transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-sub-text mt-2">
                        {related.readingTime} 分钟阅读
                      </p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
