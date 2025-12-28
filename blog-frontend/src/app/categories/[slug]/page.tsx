/**
 * 分类详情页面
 * 展示分类下所有文章
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getArticles } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/article/ArticleCard';
import { AnimatedSection } from '@/components/common/AnimatedSection';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: '分类未找到' };
  }

  return {
    title: `${category.name} - ${SITE_CONFIG.name}`,
    description: `浏览 ${category.name} 分类下的所有文章`,
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryArticles = articles.filter((a) => a.category.slug === slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg">
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              <p className="text-sub-text text-lg mb-12">
                共 {categoryArticles.length} 篇文章
              </p>
            </AnimatedSection>

            {categoryArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article, index) => (
                  <AnimatedSection key={article.id} delay={index * 0.05}>
                    <ArticleCard article={article} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-sub-text text-lg">该分类下暂无文章</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
