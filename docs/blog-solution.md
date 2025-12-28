# 个人 Blog 最终方案（Next.js 前台 + 若依 Spring 后台 + MySQL + 本地图片上传）

## 1. 目标与约束

- **目标**
  - **SEO 强**：文章可被搜索引擎良好收录；分享链接有 OG 预览。
  - **首屏快**：文章页、列表页静态化，访问体验接近纯静态站。
  - **动效好看**：不牺牲可读性与性能，保留现代交互与过渡动画。
  - **可视化后台**：写作、草稿、发布、图片管理都在后台完成。
  - **自有服务器**：Linux 宝塔环境，支持 Docker。

- **约束/已确认**
  - 后台基于 **若依（Spring）**。
  - 数据库 **MySQL**。
  - 图片 **直接上传到服务器本地存储**。
  - 文章内容 **Markdown 即可**（不需要 MDX）。
  - 前台 **无需登录，所有人可见**。

---

## 2. 总体架构与职责边界

### 2.1 架构概览

- **后台（若依 / Spring）**
  - 内容管理：文章/草稿/分类/标签/图片库
  - 数据存储：MySQL
  - 对外提供：**只读 Public API**（给前台读取）
  - 发布回调：在“发布/更新/删除已发布文章”后调用 Next 的 **revalidate webhook**

- **前台（Next.js）**
  - 渲染与体验：文章页、列表页、分类/标签页、关于页
  - **SSG/ISR** 为主（增量静态），少量实时数据可后续扩展
  - SEO：metadata/OG、sitemap、RSS
  - 动效：Framer Motion/GSAP（可选）、Lenis（可选）

### 2.2 数据流（关键）

- 草稿：只存后台，不触发前台刷新
- 发布/更新/删除已发布文章：
  1) 若依完成 DB 更新
  2) 若依调用 `POST https://blog.yourdomain.com/api/revalidate?secret=...`
  3) Next.js 触发 `revalidateTag()` 或按路径刷新
  4) 用户下一次访问对应页面即可看到最新内容（ISR）

---

## 3. 最终功能清单（按阶段交付）

> 建议按阶段上线，优先把“内容生产 + SEO + 性能 + 发布刷新链路”跑通。

### 3.1 Phase 1（MVP，上线必备）

#### 3.1.1 前台（Next.js）

- **基础页面**
  - 首页：个人简介/站点介绍 + 最新文章
  - 文章列表页：分页/按时间排序
  - 文章详情页：Markdown 渲染、代码高亮、目录 TOC
  - 分类页：分类列表 + 分类详情（该分类下文章列表）
  - 标签页：标签列表 + 标签详情（该标签下文章列表）
  - 关于页：个人介绍

- **SEO 与站点基础**
  - 每篇文章：
    - `title/description` 完整
    - OG（OpenGraph）预览（标题/摘要/封面图）
    - canonical（可选）
  - 自动生成：
    - `sitemap.xml`
    - `robots.txt`
    - `rss.xml`（或 `feed.xml`）

- **性能与渲染策略（必须）**
  - 文章详情/列表/分类/标签/首页：**ISR（增量静态）**
  - 图片：支持封面与正文图片 URL；前台按需优化（可使用 Next Image 或普通 img + 你自己的缓存策略）

- **动效（MVP 版，克制且有效）**
  - 页面切换过渡（淡入/上移）
  - 列表卡片进入动效（轻量）
  - 文章页目录/阅读进度（可选）

#### 3.1.2 后台（若依 / Spring）

- **文章管理**
  - 新建/编辑：标题、slug、摘要、封面、Markdown 内容
  - 状态：草稿/已发布
  - 发布时间：发布时写入 `published_at`
  - 支持预览（后台侧预览 Markdown 渲染，或前台提供预览接口可选）

- **分类管理**
  - 新增/编辑/删除分类

- **标签管理**
  - 新增/编辑/删除标签

- **图片管理（本地上传）**
  - 上传图片，返回可访问 URL
  - 图片列表（按时间倒序）
  - 删除图片（可选）

- **发布刷新链路（必须）**
  - 当文章从草稿→发布、或已发布文章更新、或删除已发布文章：
    - 调用 Next revalidate webhook

#### 3.1.3 运维/部署（MVP）

- 域名与 HTTPS（宝塔签发 Let’s Encrypt）
- Nginx 反向代理：
  - `blog.yourdomain.com` → Next.js
  - `admin.yourdomain.com` → 若依管理端
  - `api.yourdomain.com`（可选）→ 若依 public API
- 静态资源缓存：
  - Next 静态资源与图片目录设置强缓存（详见第 7 节）

---

### 3.2 Phase 2（体验增强）

#### 3.2.1 前台增强

- 文章阅读体验
  - 目录 TOC 吸顶
  - 阅读进度条
  - 代码块复制按钮
  - 图片点击放大（灯箱）

- 搜索（轻量方案优先）
  - 构建期生成索引（标题/摘要/标签）
  - 前端即时搜索

- 动效增强（可选）
  - 更精细的滚动进入动效
  - 轻量视差（注意性能）

#### 3.2.2 后台增强

- 草稿箱：草稿列表、快速筛选
- 文章置顶/排序字段
- 图片按文章引用统计（可选）

---

### 3.3 Phase 3（可选增长/运营能力）

- 评论
  - 推荐：Giscus（低运维）
  - 或自建评论（需要反垃圾/风控）

- 统计
  - 推荐：Umami（自建）或 Plausible（自建）

- 订阅
  - RSS + 邮件订阅（可选）

---

## 4. 数据模型（MySQL 表设计建议）

> 字段可按你的习惯微调；核心是：**slug 唯一**、草稿/发布状态明确、Markdown 原文存储。

### 4.1 文章表：`blog_post`

- `id` BIGINT PK
- `title` VARCHAR(200)
- `slug` VARCHAR(200) UNIQUE
- `status` VARCHAR(20)  // DRAFT | PUBLISHED
- `summary` VARCHAR(500)
- `content_md` LONGTEXT
- `cover_url` VARCHAR(500)
- `seo_title` VARCHAR(200)
- `seo_description` VARCHAR(500)
- `keywords` VARCHAR(500)
- `published_at` DATETIME NULL
- `updated_at` DATETIME
- `created_at` DATETIME
- `is_top` TINYINT DEFAULT 0
- `sort` INT DEFAULT 0

### 4.2 分类表：`blog_category`

- `id` BIGINT PK
- `name` VARCHAR(100)
- `slug` VARCHAR(100) UNIQUE
- `sort` INT DEFAULT 0
- `created_at` DATETIME
- `updated_at` DATETIME

### 4.3 标签表：`blog_tag`

- `id` BIGINT PK
- `name` VARCHAR(100)
- `slug` VARCHAR(100) UNIQUE
- `created_at` DATETIME
- `updated_at` DATETIME

### 4.4 文章-标签关联：`blog_post_tag`

- `post_id` BIGINT
- `tag_id` BIGINT
- UNIQUE KEY (`post_id`, `tag_id`)

### 4.5 媒体表：`blog_media`

- `id` BIGINT PK
- `url` VARCHAR(500)
- `path` VARCHAR(500) // 服务器本地路径（可选，便于删除）
- `filename` VARCHAR(255)
- `mime` VARCHAR(100)
- `size` BIGINT
- `width` INT NULL
- `height` INT NULL
- `created_at` DATETIME

---

## 5. Public API（给 Next.js 使用的只读接口）

> 建议将 public 接口与若依管理接口隔离（路径隔离 + 限流/鉴权策略隔离）。

### 5.1 文章列表

- `GET /api/public/posts`
- Query:
  - `page`（默认 1）
  - `pageSize`（默认 10）
  - `category`（slug，可选）
  - `tag`（slug，可选）
  - `q`（关键字，可选）
- Response（示例字段）
  - `items`: `[{ title, slug, summary, coverUrl, publishedAt, category, tags }]`
  - `total`

### 5.2 文章详情

- `GET /api/public/posts/{slug}`
- Response（示例字段）
  - `title, slug, summary, contentMd, coverUrl, publishedAt, updatedAt`
  - `category, tags`
  - `seoTitle, seoDescription, keywords`

### 5.3 分类/标签

- `GET /api/public/categories`
- `GET /api/public/tags`

### 5.4 图片访问

- 上传后返回一个 URL，例如：
  - `https://static.yourdomain.com/uploads/2025/12/xxx.png`
- Nginx 将该目录作为静态目录对外服务。

---

## 6. Next.js 渲染与缓存（SSG/ISR）策略

### 6.1 推荐策略

- 首页、文章列表、文章详情、分类/标签页：**ISR**
- 数据获取：请求若依 Public API
- 缓存刷新：通过 revalidate webhook 触发

### 6.2 Revalidate 机制（关键）

- Next.js 提供：`POST /api/revalidate?secret=...`
- 后台在以下事件触发调用：
  - 发布文章
  - 更新已发布文章
  - 删除已发布文章
  - 分类/标签变更（影响列表页/聚合页）

- 刷新范围建议：
  - 文章变更：文章详情页 + 文章列表页 + 首页 + 对应分类/标签页
  - 分类/标签变更：分类/标签页 + 列表页 + 首页

### 6.3 安全建议

- `secret` 必须是强随机字符串，放在环境变量
- revalidate 接口：
  - 校验 `secret`
  - 建议 Nginx 限制仅后台服务器 IP 可访问（如果前后台在同机也可限制为内网/localhost）

---

## 7. 宝塔 + Docker + Nginx 部署拓扑（建议）

### 7.1 域名规划（推荐）

- `blog.yourdomain.com`：Next.js 前台
- `admin.yourdomain.com`：若依后台管理
- `api.yourdomain.com`（可选）：若依 Public API
- `static.yourdomain.com`（可选）：图片静态资源域名（也可复用 `blog` 域名下的 `/uploads`）

### 7.2 Nginx 关键点

- 反向代理到 Next.js 容器端口（例如 3000）
- 对 Next 静态资源设置缓存（示例规则，需你按实际路径调整）：
  - `/_next/static/*`：强缓存（例如 30 天）
  - 图片 `/uploads/*`：强缓存（例如 30 天）

### 7.3 Docker 建议

- Next.js：独立容器
- 若依：按你现有部署方式（容器或传统方式都可以）
- MySQL：若已存在则复用

---

## 8. MVP 验收清单（上线前逐条打勾）

### 8.1 内容链路

- [ ] 后台可新建文章（Markdown）
- [ ] 草稿可保存，不出现在前台
- [ ] 发布文章后，前台能看到
- [ ] 更新已发布文章后，前台能刷新到最新内容（无需手动重启/重建）
- [ ] 删除已发布文章后，前台列表不再出现，详情页为 404 或跳转

### 8.2 SEO

- [ ] 文章页 title/description 正确
- [ ] OG 预览正确（标题/摘要/封面）
- [ ] sitemap 可访问且包含文章 URL
- [ ] robots.txt 正确
- [ ] RSS 可访问且包含最新文章

### 8.3 性能

- [ ] 首页/列表/详情首屏加载快
- [ ] 静态资源缓存策略生效
- [ ] 图片可正常加载，且不阻塞渲染

### 8.4 安全

- [ ] public API 不暴露后台敏感字段
- [ ] revalidate 接口校验 secret
- [ ]（可选）revalidate 接口限制来源 IP

---

## 9. 建议的实现顺序（最省时间）

1. 若依：建表 + 文章 CRUD（草稿/发布）
2. 若依：图片上传（本地目录）+ 返回 URL
3. 若依：public API（列表/详情/分类/标签）
4. Next：实现文章列表/详情（ISR）+ Markdown 渲染
5. Next：实现 `revalidate` 接口
6. 若依：发布/更新后调用 revalidate
7. Next：补齐 sitemap/RSS/OG
8. Nginx：缓存与 HTTPS

---

## 10. 需要你自行配置的参数清单

- 域名：`blog/admin/api/static`（可按你的实际情况简化）
- Next 环境变量：
  - `PUBLIC_API_BASE_URL`（若依 public API 基地址）
  - `REVALIDATE_SECRET`
- 若依环境变量/配置：
  - `NEXT_REVALIDATE_URL`
  - `NEXT_REVALIDATE_SECRET`
- 图片上传目录：
  - 服务器本地路径（例如 `/www/wwwroot/static/uploads`）
  - Nginx 静态映射（例如 `static.yourdomain.com`）

