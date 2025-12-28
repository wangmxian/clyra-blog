'use client';

/**
 * 文章页面错误处理
 */

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ArticleError({ error, reset }: ErrorProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            出错了
          </h1>
          <p className="text-xl text-sub-text mb-8">
            加载文章时发生错误，请稍后重试
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset}>重试</Button>
            <Link href="/articles">
              <Button variant="outline">浏览所有文章</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
