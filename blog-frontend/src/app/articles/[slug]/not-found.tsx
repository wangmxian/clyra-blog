/**
 * 文章未找到页面
 */

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function ArticleNotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <p className="text-xl text-sub-text mb-8">
            抱歉，您访问的文章不存在
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/articles">
              <Button>浏览所有文章</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">返回首页</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
