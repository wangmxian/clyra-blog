'use client';

/**
 * 文章详情客户端组件
 * 处理目录、阅读进度等交互功能
 */

import { useMemo } from 'react';
import type { Heading } from '@/lib/types';
import { ArticleContent } from '@/components/article/ArticleContent';
import { TableOfContents } from '@/components/article/TableOfContents';
import { ReadingProgress } from '@/components/article/ReadingProgress';
import { GlassCard } from '@/components/ui/GlassCard';

interface ArticleDetailClientProps {
  content: string;
}

// 从 Markdown 内容中提取标题
function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export function ArticleDetailClient({ content }: ArticleDetailClientProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);

  return (
    <>
      {/* 阅读进度条 */}
      <ReadingProgress />

      {/* 文章内容区域 */}
      <div className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_250px] gap-8">
            {/* 文章内容 */}
            <div className="max-w-4xl">
              <GlassCard>
                <ArticleContent content={content} />
              </GlassCard>
            </div>

            {/* 目录侧边栏 */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <GlassCard>
                    <TableOfContents headings={headings} />
                  </GlassCard>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
