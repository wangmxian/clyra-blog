/**
 * 标签列表页面
 * 展示所有标签及文章数量
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getTags, getArticles } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const metadata: Metadata = {
  title: `标签 - ${SITE_CONFIG.name}`,
  description: '浏览所有文章标签',
};

export const revalidate = 60;

export default async function TagsPage() {
  const [tags, articles] = await Promise.all([
    getTags(),
    getArticles(),
  ]);

  // 计算每个标签的文章数量
  const tagsWithCount = tags.map((tag) => ({
    ...tag,
    articleCount: articles.filter((a) => 
      a.tags.some((t) => t.slug === tag.slug)
    ).length,
  }));

  // 按文章数量排序
  const sortedTags = tagsWithCount.sort((a, b) => b.articleCount - a.articleCount);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg">
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                文章标签
              </h1>
              <p className="text-sub-text text-lg mb-12">
                共 {tags.length} 个标签
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <GlassCard>
                <div className="flex flex-wrap gap-3">
                  {sortedTags.map((tag) => (
                    <Link key={tag.id} href={`/tags/${tag.slug}`}>
                      <Tag 
                        variant="outline" 
                        className="hover:bg-accent hover:text-white hover:border-accent transition-colors"
                      >
                        {tag.name}
                        <span className="ml-2 text-xs opacity-60">
                          ({tag.articleCount})
                        </span>
                      </Tag>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
