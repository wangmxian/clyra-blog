'use client';

/**
 * 文章卡片组件
 * 展示文章缩略图、分类、日期、阅读时间、标题、摘要、标签
 */

import Link from 'next/link';
import Image from 'next/image';
import type { ArticleSummary } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';

interface ArticleCardProps {
  article: ArticleSummary;
  /** 是否为特色文章（大卡片样式） */
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} className="block group">
        <GlassCard className="overflow-hidden" hover>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 封面图 */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              {article.coverUrl ? (
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              )}
            </div>

            {/* 内容 */}
            <div className="flex flex-col justify-center py-4">
              {/* 分类和日期 */}
              <div className="flex items-center gap-3 mb-4">
                <Tag variant="filled" size="sm">
                  {article.category.name}
                </Tag>
                <span className="text-sub-text text-sm">
                  {formatDate(article.publishedAt)}
                </span>
                <span className="text-sub-text text-sm">
                  · {article.readingTime} 分钟阅读
                </span>
              </div>

              {/* 标题 */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors">
                {article.title}
              </h2>

              {/* 摘要 */}
              <p className="text-sub-text leading-relaxed mb-4 line-clamp-3">
                {article.summary}
              </p>

              {/* 标签 */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag.id} variant="outline" size="sm">
                      {tag.name}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <GlassCard className="overflow-hidden h-full" hover>
        {/* 封面图 */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
          {article.coverUrl ? (
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>

        {/* 分类和日期 */}
        <div className="flex items-center gap-3 mb-3">
          <Tag variant="filled" size="sm">
            {article.category.name}
          </Tag>
          <span className="text-sub-text text-sm">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* 标题 */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* 摘要 */}
        <p className="text-sub-text text-sm leading-relaxed mb-4 line-clamp-2">
          {article.summary}
        </p>

        {/* 底部信息 */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 2).map((tag) => (
              <Tag key={tag.id} variant="outline" size="sm">
                {tag.name}
              </Tag>
            ))}
          </div>
          <span className="text-sub-text text-xs">
            {article.readingTime} 分钟
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
