/**
 * 标签详情页面
 * 展示标签下所有文章
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTags, getArticles } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Tag } from '@/components/ui/Tag';
import { AnimatedSection } from '@/components/common/AnimatedSection';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    return { title: '标签未找到' };
  }

  return {
    title: `#${tag.name} - ${SITE_CONFIG.name}`,
    description: `浏览带有 ${tag.name} 标签的所有文章`,
  };
}

export const revalidate = 60;

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const [tags, articles] = await Promise.all([
    getTags(),
    getArticles(),
  ]);

  const tag = tags.find((t) => t.slug === slug);
  if (!tag) {
    notFound();
  }

  const tagArticles = articles.filter((a) => 
    a.tags.some((t) => t.slug === slug)
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg">
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-4">
                <Tag variant="filled" size="lg">#{tag.name}</Tag>
              </div>
              <p className="text-sub-text text-lg mb-12">
                共 {tagArticles.length} 篇文章
              </p>
            </AnimatedSection>

            {tagArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tagArticles.map((article, index) => (
                  <AnimatedSection key={article.id} delay={index * 0.05}>
                    <ArticleCard article={article} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-sub-text text-lg">该标签下暂无文章</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
