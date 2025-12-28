'use client';

/**
 * 分类筛选器组件
 * 实现分类按钮切换和粘性定位
 */

import { useState, useEffect } from 'react';
import type { Category } from '@/lib/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allCategories = [
    { id: 0, name: '全部', slug: 'all' },
    ...categories,
  ];

  return (
    <div
      className={`
        transition-all duration-300 z-40
        ${isSticky 
          ? 'sticky top-16 py-4 bg-soft-bg/80 backdrop-blur-md border-b border-gray-100' 
          : 'py-6'
        }
      `}
    >
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${selectedCategory === category.slug
                ? 'bg-accent text-white shadow-md'
                : 'bg-white/60 text-sub-text hover:bg-white hover:text-gray-900 border border-gray-100'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
