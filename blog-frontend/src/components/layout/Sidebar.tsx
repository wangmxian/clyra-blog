'use client';

/**
 * 侧边栏组件
 * 包含作者信息、热门标签、热门文章
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Tag as TagType, ArticleSummary } from '@/lib/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';
import { SITE_CONFIG } from '@/lib/config';

interface SidebarProps {
  tags?: TagType[];
  popularArticles?: ArticleSummary[];
}

export function Sidebar({ tags = [], popularArticles = [] }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* 作者信息卡片 */}
      <GlassCard>
        <div className="text-center">
          {/* 头像 */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white text-3xl font-bold">
              {SITE_CONFIG.author.name.charAt(0)}
            </div>
          </div>

          {/* 名字 */}
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
            {SITE_CONFIG.author.name}
          </h3>

          {/* 简介 */}
          <p className="text-sub-text text-sm mb-4">
            {SITE_CONFIG.author.bio}
          </p>

          {/* 社交链接 */}
          <div className="flex justify-center gap-3">
            {SITE_CONFIG.author.social.github && (
              <a
                href={SITE_CONFIG.author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sub-text hover:bg-accent hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {SITE_CONFIG.author.social.twitter && (
              <a
                href={SITE_CONFIG.author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sub-text hover:bg-accent hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
            {SITE_CONFIG.author.social.email && (
              <a
                href={`mailto:${SITE_CONFIG.author.social.email}`}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sub-text hover:bg-accent hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </GlassCard>

      {/* 热门标签 */}
      {tags.length > 0 && (
        <GlassCard>
          <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
            热门标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 10).map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Tag variant="outline" size="sm" className="hover:bg-accent hover:text-white hover:border-accent transition-colors">
                  {tag.name}
                </Tag>
              </Link>
            ))}
          </div>
        </GlassCard>
      )}

      {/* 热门文章 */}
      {popularArticles.length > 0 && (
        <GlassCard>
          <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
            热门文章
          </h3>
          <div className="space-y-4">
            {popularArticles.slice(0, 5).map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="flex gap-3 group"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <span className="text-xs text-sub-text">
                    {article.readingTime} 分钟阅读
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </GlassCard>
      )}
    </aside>
  );
}
