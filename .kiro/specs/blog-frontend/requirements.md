# Requirements Document

## Introduction

本文档定义了基于 Next.js 的个人博客前台系统需求。该系统采用 index_3.html 的玻璃拟态设计风格，与若依 Spring Boot 后台配合，实现一个 SEO 友好、首屏快速、动效优雅的现代博客平台。

## Glossary

- **Blog_System**: 博客前台系统，负责展示文章、分类、标签等内容
- **Article_Renderer**: 文章渲染器，负责将 Markdown 内容转换为 HTML 并展示
- **Navigation_Bar**: 导航栏组件，提供站点导航和搜索入口
- **Search_Modal**: 搜索弹窗组件，提供文章搜索功能
- **Article_Card**: 文章卡片组件，展示文章摘要信息
- **Sidebar**: 侧边栏组件，展示作者信息、标签云、热门文章
- **Newsletter_Form**: 订阅表单组件，收集用户邮箱
- **Category_Filter**: 分类筛选器，按分类过滤文章列表
- **TOC_Component**: 目录组件，展示文章标题结构
- **Glass_Card**: 玻璃拟态卡片，具有模糊背景和半透明效果的 UI 组件
- **ISR**: Incremental Static Regeneration，增量静态再生成
- **Public_API**: 若依后台提供的只读公开接口

## Requirements

### Requirement 1: 首页展示

**User Story:** As a visitor, I want to see a welcoming homepage with featured content and latest articles, so that I can quickly understand the blog and find interesting content.

#### Acceptance Criteria

1. WHEN a visitor loads the homepage, THE Blog_System SHALL display a hero section with site introduction and featured article
2. WHEN a visitor views the homepage, THE Blog_System SHALL display the latest 6 articles in a grid layout
3. WHEN a visitor views the homepage, THE Blog_System SHALL display a newsletter subscription form
4. WHEN a visitor views the homepage, THE Blog_System SHALL display tech stack badges and GitHub activity statistics
5. THE Blog_System SHALL render the homepage using ISR with a revalidation period of 60 seconds

### Requirement 2: 导航与搜索

**User Story:** As a visitor, I want to navigate the site easily and search for articles, so that I can find the content I'm looking for.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL display site logo, navigation links (Home, Articles, Snippets, About), search button, and subscribe button
2. WHEN a visitor scrolls down more than 50 pixels, THE Navigation_Bar SHALL add a frosted glass background effect
3. WHEN a visitor clicks the search button, THE Search_Modal SHALL open with a full-screen overlay and search input
4. WHEN a visitor types in the search input, THE Search_Modal SHALL display matching articles by title, summary, or tags
5. WHEN a visitor presses Escape key or clicks close button, THE Search_Modal SHALL close smoothly
6. THE Navigation_Bar SHALL be fixed at the top of the viewport with z-index ensuring visibility

### Requirement 3: 文章列表页

**User Story:** As a visitor, I want to browse articles by category with pagination, so that I can explore content that interests me.

#### Acceptance Criteria

1. WHEN a visitor visits the articles page, THE Blog_System SHALL display a category filter bar with "All Posts", "Backend", "Frontend", "DevOps", "Life" options
2. WHEN a visitor clicks a category filter, THE Blog_System SHALL filter articles to show only that category
3. THE Article_Card SHALL display article thumbnail, category, date, reading time, title, summary, and tags
4. WHEN a visitor hovers over an Article_Card image, THE Blog_System SHALL apply a subtle zoom animation
5. WHEN a visitor clicks "Load More" button, THE Blog_System SHALL load the next page of articles
6. THE Blog_System SHALL render article list using ISR with a revalidation period of 60 seconds

### Requirement 4: 文章详情页

**User Story:** As a visitor, I want to read articles with good typography and navigation aids, so that I can have a pleasant reading experience.

#### Acceptance Criteria

1. WHEN a visitor opens an article, THE Article_Renderer SHALL display the article title, metadata (category, date, reading time), and cover image
2. THE Article_Renderer SHALL render Markdown content with proper typography, code syntax highlighting, and responsive images
3. THE TOC_Component SHALL display a sticky table of contents on desktop screens
4. WHEN a visitor scrolls through the article, THE TOC_Component SHALL highlight the current section
5. THE Article_Renderer SHALL display a reading progress bar at the top of the page
6. WHEN a visitor reaches the end of an article, THE Blog_System SHALL display related articles
7. THE Blog_System SHALL render article pages using ISR with on-demand revalidation via webhook

### Requirement 5: 分类与标签页

**User Story:** As a visitor, I want to browse articles by category or tag, so that I can find related content easily.

#### Acceptance Criteria

1. WHEN a visitor visits a category page, THE Blog_System SHALL display the category name and all articles in that category
2. WHEN a visitor visits a tag page, THE Blog_System SHALL display the tag name and all articles with that tag
3. THE Blog_System SHALL display article count for each category and tag
4. THE Blog_System SHALL render category and tag pages using ISR with a revalidation period of 60 seconds

### Requirement 6: 侧边栏组件

**User Story:** As a visitor, I want to see author information and discover popular content, so that I can learn more about the blog and find interesting articles.

#### Acceptance Criteria

1. THE Sidebar SHALL display author avatar, name, title, bio, and social media links
2. THE Sidebar SHALL display a "Trending Tags" section with tag names and article counts
3. THE Sidebar SHALL display a "Popular" section with top 3 most viewed articles
4. WHEN a visitor clicks a tag in the Sidebar, THE Blog_System SHALL navigate to that tag's page
5. WHEN a visitor clicks a popular article, THE Blog_System SHALL navigate to that article's page

### Requirement 7: 关于页面

**User Story:** As a visitor, I want to learn about the blog author, so that I can understand who is behind the content.

#### Acceptance Criteria

1. WHEN a visitor visits the about page, THE Blog_System SHALL display detailed author biography
2. THE Blog_System SHALL display author's skills, experience, and interests
3. THE Blog_System SHALL display contact information and social media links

### Requirement 8: SEO 与元数据

**User Story:** As a blog owner, I want my articles to be well-indexed by search engines, so that more people can discover my content.

#### Acceptance Criteria

1. THE Blog_System SHALL generate unique title and description meta tags for each page
2. THE Blog_System SHALL generate OpenGraph meta tags (og:title, og:description, og:image) for social sharing
3. THE Blog_System SHALL generate a sitemap.xml file containing all published article URLs
4. THE Blog_System SHALL generate a robots.txt file allowing search engine crawling
5. THE Blog_System SHALL generate an RSS feed (rss.xml) with latest articles
6. THE Blog_System SHALL set canonical URLs for all pages

### Requirement 9: 视觉设计与动效

**User Story:** As a visitor, I want a visually appealing and smooth browsing experience, so that I enjoy spending time on the blog.

#### Acceptance Criteria

1. THE Blog_System SHALL use the Glass_Card style with backdrop blur and semi-transparent backgrounds
2. THE Blog_System SHALL apply a subtle grid pattern background with noise texture overlay
3. THE Blog_System SHALL use Outfit font for body text and Playfair Display for headings
4. WHEN elements enter the viewport, THE Blog_System SHALL apply fade-in and slide-up animations
5. THE Blog_System SHALL apply smooth page transitions between routes
6. THE Blog_System SHALL maintain a consistent color palette with soft-bg (#FDFCF8), accent (#1A1A1A), and sub-text (#6B7280)

### Requirement 10: 响应式设计

**User Story:** As a visitor using different devices, I want the blog to work well on any screen size, so that I can read articles anywhere.

#### Acceptance Criteria

1. THE Blog_System SHALL adapt layout from single column on mobile to multi-column on desktop
2. THE Navigation_Bar SHALL collapse to a mobile-friendly format on small screens
3. THE Sidebar SHALL move below main content on mobile screens
4. THE Blog_System SHALL ensure all interactive elements are touch-friendly on mobile devices

### Requirement 11: 订阅功能

**User Story:** As a visitor, I want to subscribe to the newsletter, so that I can receive updates about new articles.

#### Acceptance Criteria

1. THE Newsletter_Form SHALL accept email input and validate email format
2. WHEN a visitor submits a valid email, THE Newsletter_Form SHALL send the subscription request to the backend
3. IF the subscription is successful, THEN THE Newsletter_Form SHALL display a success message
4. IF the email format is invalid, THEN THE Newsletter_Form SHALL display an error message without submitting

### Requirement 12: 数据获取与缓存刷新

**User Story:** As a blog owner, I want content updates to appear quickly without manual deployment, so that I can publish efficiently.

#### Acceptance Criteria

1. THE Blog_System SHALL fetch article data from the Public_API
2. THE Blog_System SHALL implement ISR for all content pages
3. WHEN the backend calls the revalidate webhook, THE Blog_System SHALL refresh the affected pages
4. THE Blog_System SHALL validate the webhook secret before processing revalidation requests
5. IF the webhook secret is invalid, THEN THE Blog_System SHALL reject the request with 401 status

### Requirement 13: 页脚组件

**User Story:** As a visitor, I want to access site links and information from the footer, so that I can navigate and learn more about the site.

#### Acceptance Criteria

1. THE Blog_System SHALL display a footer with site logo, description, sitemap links, and social links
2. THE Blog_System SHALL display copyright information in the footer
3. THE Blog_System SHALL use a dark background (#000000) for the footer with appropriate contrast

### Requirement 14: 代码展示

**User Story:** As a developer visitor, I want to see code snippets with proper formatting and syntax highlighting, so that I can understand and copy code easily.

#### Acceptance Criteria

1. THE Article_Renderer SHALL apply syntax highlighting to code blocks based on language
2. THE Article_Renderer SHALL display a copy button on code blocks
3. WHEN a visitor clicks the copy button, THE Blog_System SHALL copy the code to clipboard and show confirmation
4. THE Article_Renderer SHALL support common programming languages (JavaScript, TypeScript, Java, Python, SQL, Shell, etc.)

### Requirement 15: 图片处理

**User Story:** As a visitor, I want images to load quickly and display properly, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Blog_System SHALL optimize images using Next.js Image component where applicable
2. THE Blog_System SHALL display article cover images with proper aspect ratios
3. WHEN a visitor clicks an image in article content, THE Blog_System SHALL open a lightbox for enlarged viewing
4. THE Blog_System SHALL lazy load images below the fold
