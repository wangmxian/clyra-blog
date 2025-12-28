import Link from 'next/link';
import Image from 'next/image';
import type { ArticleSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FeaturedArticleProps {
  article: ArticleSummary;
  className?: string;
}

export function FeaturedArticle({ article, className }: FeaturedArticleProps) {
  // 使用更可靠的图片 URL
  const imageUrl = article.coverUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80';

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        'block rounded-3xl relative overflow-hidden group cursor-pointer',
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={article.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end text-white p-6 md:p-8">
        {/* Category Badge */}
        <div className="flex gap-2 mb-3">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs border border-white/20">
            {article.category.name}
          </span>
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs border border-white/10">
            {article.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif mb-2 leading-tight">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-200 text-sm line-clamp-2">
          {article.summary}
        </p>
      </div>
    </Link>
  );
}

export default FeaturedArticle;
