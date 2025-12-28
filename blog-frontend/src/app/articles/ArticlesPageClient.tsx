'use client';

/**
 * 文章列表页客户端组件
 * 处理分类筛选和加载更多功能
 */

import { useState, useMemo } from 'react';
import type { ArticleSummary, Category, Tag as TagType } from '@/lib/types';
import { filterArticlesByCategory } from '@/lib/search';
import { ArticleCard } from '@/components/article/ArticleCard';
import { CategoryFilter } from '@/components/common/CategoryFilter';
import { Sidebar } from '@/components/layout/Sidebar';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Button } from '@/components/ui/Button';

interface ArticlesPageClientProps {
  articles: ArticleSummary[];
  categories: Category[];
  tags: TagType[];
  popularArticles: ArticleSummary[];
}

const ARTICLES_PER_PAGE = 9;

export function ArticlesPageClient({
  articles,
  categories,
  tags,
  popularArticles,
}: ArticlesPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(ARTICLES_PER_PAGE);

  // 根据分类筛选文章
  const filteredArticles = useMemo(() => {
    return filterArticlesByCategory(articles, selectedCategory);
  }, [articles, selectedCategory]);

  // 当前显示的文章
  const displayedArticles = filteredArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredArticles.length;

  // 切换分类时重置显示数量
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setDisplayCount(ARTICLES_PER_PAGE);
  };

  // 加载更多
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ARTICLES_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-soft-bg">
      {/* 页面标题 */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              所有文章
            </h1>
            <p className="text-sub-text text-lg">
              共 {filteredArticles.length} 篇文章
              {selectedCategory !== 'all' && (
                <span className="ml-2">
                  · 分类: {categories.find(c => c.slug === selectedCategory)?.name}
                </span>
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </section>

      {/* 文章列表和侧边栏 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* 文章列表 */}
            <div>
              {displayedArticles.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {displayedArticles.map((article, index) => (
                      <AnimatedSection key={article.id} delay={index * 0.05}>
                        <ArticleCard article={article} />
                      </AnimatedSection>
                    ))}
                  </div>

                  {/* 加载更多按钮 */}
                  {hasMore && (
                    <div className="mt-12 text-center">
                      <Button variant="outline" onClick={handleLoadMore}>
                        加载更多
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-sub-text text-lg">暂无文章</p>
                </div>
              )}
            </div>

            {/* 侧边栏 */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar tags={tags} popularArticles={popularArticles} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
