/**
 * 站点配置 - 王慕贤的前端博客
 */

import type { Author, SiteConfig } from './types';

export const author: Author = {
  name: '王慕贤',
  title: '前端开发工程师',
  bio: '热爱前端技术，专注于 React/Vue 生态和现代 Web 开发。喜欢探索新技术，分享学习心得。',
  avatar: 'https://ui-avatars.com/api/?name=WMX&background=6366f1&color=fff&size=200',
  social: {
    twitter: 'https://twitter.com/wangMuXian',
    github: 'https://github.com/wangmxian',
    linkedin: 'https://linkedin.com/in/wangMuXian',
    email: 'wangMuXian@example.com',
  },
};

export const siteConfig: SiteConfig = {
  title: 'MuXian.Dev',
  description: '王慕贤的前端技术博客 - 专注 React、Vue、TypeScript 等现代前端技术，分享学习心得与实战经验。',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://MuXian.dev',
  author,
};

// 兼容 SITE_CONFIG 引用
export const SITE_CONFIG = {
  name: siteConfig.title,
  title: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  author: siteConfig.author,
};

// 导航链接
export const navLinks = [
  { href: '/', label: '首页' },
  { href: '/articles', label: '文章' },
  { href: '/categories', label: '分类' },
  { href: '/tags', label: '标签' },
  { href: '/about', label: '关于' },
];

// 分类列表（用于筛选器）
export const categories = [
  { slug: 'all', name: '全部' },
  { slug: 'react', name: 'React' },
  { slug: 'vue', name: 'Vue' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'engineering', name: '工程化' },
  { slug: 'css', name: 'CSS' },
  { slug: 'performance', name: '性能优化' },
];

// 页脚链接
export const footerLinks = {
  sitemap: [
    { href: '/', label: '首页' },
    { href: '/articles', label: '文章' },
    { href: '/about', label: '关于我' },
    { href: '/feed.xml', label: 'RSS 订阅' },
  ],
  connect: [
    { href: author.social.github || '#', label: 'GitHub' },
    { href: author.social.twitter || '#', label: 'Twitter / X' },
    { href: author.social.linkedin || '#', label: 'LinkedIn' },
    { href: `mailto:${author.social.email}`, label: 'Email' },
  ],
};
