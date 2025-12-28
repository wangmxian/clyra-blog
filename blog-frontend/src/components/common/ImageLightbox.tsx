'use client';

/**
 * 图片灯箱组件
 * 点击图片放大查看
 */

import { useState } from 'react';
import Image from 'next/image';

interface ImageLightboxProps {
  src: string;
  alt: string;
}

export function ImageLightbox({ src, alt }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 缩略图 */}
      <figure className="my-6">
        <button
          onClick={() => setIsOpen(true)}
          className="block w-full cursor-zoom-in"
        >
          <Image
            src={src}
            alt={alt}
            width={800}
            height={450}
            className="rounded-xl w-full h-auto"
          />
        </button>
        {alt && (
          <figcaption className="text-center text-sm text-sub-text mt-2">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* 灯箱 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="关闭"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 大图 */}
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
