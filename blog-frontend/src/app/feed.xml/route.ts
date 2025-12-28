/**
 * RSS Feed 生成
 * 生成包含最新文章的 RSS
 */

import { getArticles } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/config';

export async function GET() {
  const articles = await getArticles();
  
  // 取最新 20 篇文章
  const latestArticles = articles.slice(0, 20);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${latestArticles.map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_CONFIG.url}/articles/${article.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/articles/${article.slug}</guid>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(article.category.name)}</category>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
