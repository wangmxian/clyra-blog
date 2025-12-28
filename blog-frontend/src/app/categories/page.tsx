/**
 * 分类列表页面
 * 展示所有分类及文章数量
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getArticles } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const metadata: Metadata = {
  title: `分类 - ${SITE_CONFIG.name}`,
  description: '浏览所有文章分类',
};

export const revalidate = 60;

export default async function CategoriesPage() {
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  // 计算每个分类的文章数量
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    articleCount: articles.filter((a) => a.category.slug === category.slug).length,
  }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg">
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                文章分类
              </h1>
              <p className="text-sub-text text-lg mb-12">
                共 {categories.length} 个分类
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {categoriesWithCount.map((category, index) => (
                <AnimatedSection key={category.id} delay={index * 0.1}>
                  <Link href={`/categories/${category.slug}`} className="block group">
                    <GlassCard className="h-full" hover>
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-display text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">
                            {category.name}
                          </h2>
                          <p className="text-sub-text mt-1">
                            {category.articleCount} 篇文章
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
