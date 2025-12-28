import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedArticle } from '@/components/home/FeaturedArticle';
import { TechStackCard, GitHubStatsCard } from '@/components/home/StatsCard';
import { NewsletterForm } from '@/components/home/NewsletterForm';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Footer } from '@/components/layout/Footer';
import { HomePageWrapper } from './HomePageWrapper';
import { getArticles, getCategories, getTags } from '@/lib/api';

// ISR 配置
export const revalidate = 60;

export default async function HomePage() {
  // 获取真实数据
  const [articles, categories, tags] = await Promise.all([
    getArticles(),
    getCategories(),
    getTags(),
  ]);

  // 特色文章（第一篇）
  const featuredArticle = articles[0];
  // 最新文章（排除特色文章，取6篇）
  const latestArticles = articles.slice(1, 7);

  return (
    <HomePageWrapper>
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="mb-20">
          <HeroSection />

          {/* Bento Grid */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
              {/* Featured Article - Large Card */}
              <div className="md:col-span-2 md:row-span-2">
                {featuredArticle && (
                  <FeaturedArticle
                    article={featuredArticle}
                    className="h-full"
                  />
                )}
              </div>

              {/* Tech Stack Card */}
              <div className="min-h-[180px]">
                <TechStackCard />
              </div>

              {/* GitHub Stats Card */}
              <div className="min-h-[180px]">
                <GitHubStatsCard />
              </div>

              {/* Newsletter Card */}
              <div className="md:col-span-2">
                <NewsletterForm />
              </div>
            </div>
          </AnimatedSection>
        </header>

        {/* Latest Articles Section */}
        <section id="articles" className="mb-20">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif">Latest Articles</h2>
              <Link
                href="/articles"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                View all →
              </Link>
            </div>
          </AnimatedSection>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Categories & Tags Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Categories */}
            <AnimatedSection>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-serif">Categories</h3>
                  <Link
                    href="/categories"
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    View all →
                  </Link>
                </div>
                <div className="space-y-3">
                  {categories.slice(0, 5).map((category) => {
                    const count = articles.filter(a => a.category.slug === category.slug).length;
                    return (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:text-accent transition-colors group"
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-400 group-hover:text-accent">{count} posts</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Popular Tags */}
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-serif">Popular Tags</h3>
                  <Link
                    href="/tags"
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    View all →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tags/${tag.slug}`}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </HomePageWrapper>
  );
}
