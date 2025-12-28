/**
 * 工具函数
 */

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否为有效邮箱格式
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // 基本格式检查：包含且仅包含一个 @
  const atIndex = email.indexOf('@');
  const lastAtIndex = email.lastIndexOf('@');
  
  if (atIndex === -1 || atIndex !== lastAtIndex) {
    return false;
  }

  // 分割本地部分和域名部分
  const localPart = email.substring(0, atIndex);
  const domainPart = email.substring(atIndex + 1);

  // 本地部分和域名部分都不能为空
  if (!localPart || !domainPart) {
    return false;
  }

  // 域名部分必须包含至少一个点
  if (!domainPart.includes('.')) {
    return false;
  }

  // 域名部分的点不能在开头或结尾
  if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return false;
  }

  // 使用正则表达式进行更严格的验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 格式化日期
 * @param dateString ISO 日期字符串
 * @param locale 语言环境
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  dateString: string,
  locale: string = 'zh-CN'
): string {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * 格式化日期为英文格式（用于文章卡片）
 * @param dateString ISO 日期字符串
 * @returns 格式化后的日期字符串，如 "DEC 22, 2025"
 */
export function formatDateEN(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).toUpperCase();
  } catch {
    return dateString;
  }
}

/**
 * 计算阅读时间
 * @param content 文章内容（Markdown 或纯文本）
 * @param wordsPerMinute 每分钟阅读字数（中文约 300-500，英文约 200）
 * @returns 阅读时间（分钟）
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 300
): number {
  if (!content || typeof content !== 'string') {
    return 1;
  }

  // 移除 Markdown 语法
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]*`/g, '') // 移除行内代码
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
    .replace(/[#*_~>`-]/g, '') // 移除 Markdown 符号
    .replace(/\n+/g, ' ') // 换行转空格
    .trim();

  // 计算字数（中文按字符计算，英文按单词计算）
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  const totalWords = chineseChars + englishWords;
  const minutes = Math.ceil(totalWords / wordsPerMinute);

  return Math.max(1, minutes);
}

/**
 * 生成文章 slug
 * @param title 文章标题
 * @returns slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, '') // 移除中文
    .replace(/[^a-z0-9]+/g, '-') // 非字母数字转为连字符
    .replace(/^-+|-+$/g, '') // 移除首尾连字符
    .substring(0, 100); // 限制长度
}

/**
 * 截断文本
 * @param text 原始文本
 * @param maxLength 最大长度
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * 类名合并工具
 * @param classes 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 节流函数
 * @param fn 要节流的函数
 * @param limit 时间限制（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 从 Markdown 内容提取标题
 * @param content Markdown 内容
 * @returns 标题数组
 */
export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}
