# Implementation Plan: Blog Frontend System

## Overview

本实现计划将博客前台系统分解为可执行的编码任务。采用 Next.js 14+ (App Router) + TypeScript + Tailwind CSS 技术栈，遵循 index_3.html 的玻璃拟态设计风格。

## Tasks

- [x] 1. 项目初始化与基础配置
  - [x] 1.1 创建 Next.js 14+ 项目并配置 TypeScript
    - 使用 `create-next-app` 创建项目
    - 配置 TypeScript strict 模式
    - 配置路径别名 `@/`
    - _Requirements: 1.5, 12.2_

  - [x] 1.2 配置 Tailwind CSS 与全局样式
    - 安装 Tailwind CSS
    - 配置自定义颜色（soft-bg, accent, sub-text）
    - 配置字体（Outfit, Playfair Display）
    - 添加玻璃拟态样式类（glass-card）
    - 添加网格背景和噪点纹理
    - _Requirements: 9.1, 9.2, 9.3, 9.6_

  - [x] 1.3 创建类型定义文件
    - 创建 `lib/types.ts`
    - 定义 Article, ArticleSummary, Category, Tag, Heading 等类型
    - _Requirements: 3.3, 4.1_

  - [x] 1.4 创建 API 请求封装
    - 创建 `lib/api.ts`
    - 实现 getArticles, getArticle, getCategories, getTags 函数
    - 配置 ISR 缓存策略
    - _Requirements: 12.1, 12.2_

  - [x] 1.5 创建工具函数
    - 创建 `lib/utils.ts`
    - 实现 validateEmail, formatDate, calculateReadingTime 函数
    - _Requirements: 11.1_

  - [x] 1.6 编写工具函数单元测试
    - 测试 validateEmail 函数
    - 测试 formatDate 函数
    - 测试 calculateReadingTime 函数
    - _Requirements: 11.1_

  - [x] 1.7 编写邮箱验证属性测试
    - **Property 10: Email Validation Correctness**
    - **Validates: Requirements 11.1, 11.4**

- [x] 2. Checkpoint - 确保基础配置完成
  - 确保所有测试通过，如有问题请询问用户

- [x] 3. 布局组件开发
  - [x] 3.1 创建根布局组件
    - 创建 `app/layout.tsx`
    - 配置 Google Fonts
    - 添加全局元数据
    - _Requirements: 8.1_

  - [x] 3.2 创建导航栏组件
    - 创建 `components/layout/Navbar.tsx`
    - 实现 Logo、导航链接、搜索按钮、订阅按钮
    - 实现滚动时的玻璃拟态背景效果
    - 实现移动端响应式布局
    - _Requirements: 2.1, 2.2, 2.6, 10.2_

  - [x] 3.3 创建页脚组件
    - 创建 `components/layout/Footer.tsx`
    - 实现站点信息、导航链接、社交链接
    - 实现深色背景样式
    - _Requirements: 13.1, 13.2, 13.3_

  - [x] 3.4 创建搜索弹窗组件
    - 创建 `components/ui/SearchModal.tsx`
    - 实现全屏遮罩和搜索输入框
    - 实现搜索结果展示
    - 实现 ESC 键关闭功能
    - _Requirements: 2.3, 2.4, 2.5_

  - [x] 3.5 创建搜索过滤函数
    - 创建 `lib/search.ts`
    - 实现 filterArticlesByQuery 函数
    - _Requirements: 2.4_

  - [x] 3.6 编写搜索过滤属性测试
    - **Property 1: Search Results Match Query**
    - **Validates: Requirements 2.4**

- [x] 4. UI 基础组件开发
  - [x] 4.1 创建玻璃拟态卡片组件
    - 创建 `components/ui/GlassCard.tsx`
    - 支持 hover 效果和 dark 模式
    - _Requirements: 9.1_

  - [x] 4.2 创建标签组件
    - 创建 `components/ui/Tag.tsx`
    - 支持不同尺寸和样式变体
    - _Requirements: 3.3_

  - [x] 4.3 创建按钮组件
    - 创建 `components/ui/Button.tsx`
    - 支持 primary, secondary, outline 变体
    - _Requirements: 3.5_

  - [x] 4.4 创建动画容器组件
    - 创建 `components/common/AnimatedSection.tsx`
    - 使用 Framer Motion 实现滚动显现动画
    - _Requirements: 9.4_

- [x] 5. 首页开发
  - [x] 5.1 创建 Hero 区域组件
    - 创建 `components/home/HeroSection.tsx`
    - 实现站点介绍和状态标签
    - _Requirements: 1.1_

  - [x] 5.2 创建特色文章组件
    - 创建 `components/home/FeaturedArticle.tsx`
    - 实现大图卡片样式
    - 实现图片悬停放大效果
    - _Requirements: 1.1, 3.4_

  - [x] 5.3 创建统计卡片组件
    - 创建 `components/home/StatsCard.tsx`
    - 实现技术栈展示和 GitHub 统计
    - _Requirements: 1.4_

  - [x] 5.4 创建订阅表单组件
    - 创建 `components/home/NewsletterForm.tsx`
    - 实现邮箱输入和验证
    - 实现提交反馈
    - _Requirements: 1.3, 11.1, 11.2, 11.3, 11.4_

  - [x] 5.5 创建首页页面
    - 创建 `app/page.tsx`
    - 组合 Hero、特色文章、最新文章、订阅表单
    - 配置 ISR 缓存
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 6. Checkpoint - 确保首页功能完成
  - 确保所有测试通过，如有问题请询问用户

- [x] 7. 文章列表页开发
  - [x] 7.1 创建文章卡片组件
    - 创建 `components/article/ArticleCard.tsx`
    - 实现缩略图、分类、日期、阅读时间、标题、摘要、标签展示
    - 实现图片悬停放大效果
    - _Requirements: 3.3, 3.4_

  - [x] 7.2 编写文章卡片数据完整性属性测试
    - **Property 4: Article Card Data Completeness**
    - **Validates: Requirements 3.3, 4.1**

  - [x] 7.3 创建分类筛选器组件
    - 创建 `components/common/CategoryFilter.tsx`
    - 实现分类按钮切换
    - 实现粘性定位
    - _Requirements: 3.1, 3.2_

  - [x] 7.4 创建侧边栏组件
    - 创建 `components/layout/Sidebar.tsx`
    - 实现作者信息卡片
    - 实现热门标签展示
    - 实现热门文章列表
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 7.5 创建文章列表页面
    - 创建 `app/articles/page.tsx`
    - 实现分类筛选功能
    - 实现加载更多功能
    - 配置 ISR 缓存
    - _Requirements: 3.1, 3.2, 3.5, 3.6_

  - [x] 7.6 编写分类过滤一致性属性测试
    - **Property 2: Category Filtering Consistency**
    - **Validates: Requirements 3.2, 5.1**

- [x] 8. 文章详情页开发
  - [x] 8.1 创建 Markdown 渲染组件
    - 创建 `components/article/ArticleContent.tsx`
    - 配置 react-markdown 和 rehype-highlight
    - 实现标题提取功能
    - _Requirements: 4.2_

  - [x] 8.2 编写 Markdown 渲染完整性属性测试
    - **Property 5: Markdown Rendering Integrity**
    - **Validates: Requirements 4.2**

  - [x] 8.3 创建代码块组件
    - 创建 `components/article/CodeBlock.tsx`
    - 实现语法高亮
    - 实现复制按钮功能
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [x] 8.4 编写代码语法高亮属性测试
    - **Property 12: Code Syntax Highlighting**
    - **Validates: Requirements 14.1, 14.4**

  - [x] 8.5 创建目录组件
    - 创建 `components/article/TableOfContents.tsx`
    - 实现标题列表展示
    - 实现当前章节高亮
    - 实现粘性定位
    - _Requirements: 4.3, 4.4_

  - [x] 8.6 创建阅读进度条组件
    - 创建 `components/article/ReadingProgress.tsx`
    - 实现滚动进度计算
    - _Requirements: 4.5_

  - [x] 8.7 创建图片灯箱组件
    - 创建 `components/common/ImageLightbox.tsx`
    - 实现点击放大功能
    - _Requirements: 15.3_

  - [x] 8.8 创建文章详情页面
    - 创建 `app/articles/[slug]/page.tsx`
    - 组合文章内容、目录、进度条、相关文章
    - 配置 ISR 缓存和动态元数据
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [x] 8.9 创建文章详情页错误处理
    - 创建 `app/articles/[slug]/error.tsx`
    - 创建 `app/articles/[slug]/not-found.tsx`
    - _Requirements: 4.1_

- [x] 9. Checkpoint - 确保文章功能完成
  - 确保所有测试通过，如有问题请询问用户

- [x] 10. 分类与标签页开发
  - [x] 10.1 创建分类列表页面
    - 创建 `app/categories/page.tsx`
    - 展示所有分类及文章数量
    - _Requirements: 5.1, 5.3_

  - [x] 10.2 创建分类详情页面
    - 创建 `app/categories/[slug]/page.tsx`
    - 展示分类下所有文章
    - _Requirements: 5.1_

  - [x] 10.3 创建标签列表页面
    - 创建 `app/tags/page.tsx`
    - 展示所有标签及文章数量
    - _Requirements: 5.2, 5.3_

  - [x] 10.4 创建标签详情页面
    - 创建 `app/tags/[slug]/page.tsx`
    - 展示标签下所有文章
    - _Requirements: 5.2_

  - [x] 10.5 编写标签过滤一致性属性测试
    - **Property 3: Tag Filtering Consistency**
    - **Validates: Requirements 5.2**

  - [x] 10.6 编写文章计数准确性属性测试
    - **Property 6: Article Count Accuracy**
    - **Validates: Requirements 5.3**

- [x] 11. 关于页面开发
  - [x] 11.1 创建关于页面
    - 创建 `app/about/page.tsx`
    - 展示作者详细介绍
    - 展示技能、经验、联系方式
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 12. SEO 与站点文件
  - [x] 12.1 配置页面元数据
    - 为每个页面配置 generateMetadata 函数
    - 配置 OpenGraph 标签
    - 配置 canonical URL
    - _Requirements: 8.1, 8.2, 8.6_

  - [x] 12.2 编写 SEO 元数据完整性属性测试
    - **Property 7: SEO Metadata Completeness**
    - **Validates: Requirements 8.1, 8.2, 8.6**

  - [x] 12.3 创建 sitemap.xml
    - 创建 `app/sitemap.ts`
    - 动态生成包含所有文章的 sitemap
    - _Requirements: 8.3_

  - [x] 12.4 编写 Sitemap 完整性属性测试
    - **Property 8: Sitemap Completeness**
    - **Validates: Requirements 8.3**

  - [x] 12.5 创建 robots.txt
    - 创建 `app/robots.ts`
    - 配置搜索引擎爬取规则
    - _Requirements: 8.4_

  - [x] 12.6 创建 RSS Feed
    - 创建 `app/feed.xml/route.ts`
    - 生成包含最新文章的 RSS
    - _Requirements: 8.5_

  - [x] 12.7 编写 RSS Feed 完整性属性测试
    - **Property 9: RSS Feed Completeness**
    - **Validates: Requirements 8.5**

- [x] 13. Revalidate Webhook
  - [x] 13.1 创建 Revalidate API 路由
    - 创建 `app/api/revalidate/route.ts`
    - 实现 secret 验证
    - 实现按类型刷新缓存
    - _Requirements: 12.3, 12.4, 12.5_

  - [x] 13.2 编写 Webhook Secret 验证属性测试
    - **Property 11: Webhook Secret Validation**
    - **Validates: Requirements 12.4, 12.5**

- [x] 14. 响应式优化
  - [x] 14.1 优化移动端布局
    - 调整导航栏移动端样式
    - 调整侧边栏移动端位置
    - 调整文章卡片移动端布局
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 15. Final Checkpoint - 确保所有功能完成
  - 确保所有测试通过
  - 验证所有页面正常渲染
  - 验证 SEO 文件正确生成
  - 如有问题请询问用户

## Notes

- 所有任务均为必需任务，包含完整的测试覆盖
- 每个任务引用了具体的需求编号以便追溯
- Checkpoint 任务用于阶段性验证
- 属性测试验证核心正确性属性（12 个属性）
- 单元测试覆盖工具函数和边界情况
