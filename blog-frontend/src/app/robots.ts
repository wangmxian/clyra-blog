/**
 * Robots.txt 生成
 * 配置搜索引擎爬取规则
 */

import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
