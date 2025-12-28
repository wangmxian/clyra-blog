'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import type { ArticleSummary, Tag } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 模拟热门标签（实际应从 API 获取）
const quickTags: Tag[] = [
  { id: 1, name: 'NextJS', slug: 'nextjs' },
  { id: 2, name: 'SpringCloud', slug: 'spring-cloud' },
  { id: 3, name: 'Architecture', slug: 'architecture' },
  { id: 4, name: 'Docker', slug: 'docker' },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 搜索处理
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // 实际应调用 API
      // const response = await getArticles({ q: searchQuery });
      // setResults(response.items);
      
      // 模拟搜索结果
      await new Promise(resolve => setTimeout(resolve, 300));
      setResults([]);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  // 关闭时重置状态
  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-white/90 backdrop-blur-xl',
        'flex items-center justify-center',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-2xl px-6">
        {/* Search Input */}
        <div className="relative border-b-2 border-black pb-2">
          <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tags..."
            className="w-full bg-transparent pl-10 text-3xl font-serif outline-none placeholder:text-gray-300"
          />
          <button
            onClick={handleClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 hover:rotate-90 transition-transform"
            aria-label="Close search"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mt-8 max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Results ({results.length})
                </p>
                {results.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    onClick={handleClose}
                    className="block p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {article.summary}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>
        )}

        {/* Quick Links */}
        {!query && (
          <div className="mt-8">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
              Quick Links
            </p>
            <div className="flex gap-3 flex-wrap">
              {quickTags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}`}
                  onClick={handleClose}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-black hover:text-white cursor-pointer transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Hint */}
        <div className="mt-8 text-center">
          <span className="text-xs text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default SearchModal;
