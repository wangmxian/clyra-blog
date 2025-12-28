'use client';

/**
 * 文章内容渲染组件
 * 使用 react-markdown 渲染 Markdown 内容
 */

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { ImageLightbox } from '@/components/common/ImageLightbox';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 自定义代码块渲染
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className;
            
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-gray-100 rounded text-accent text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                language={match ? match[1] : 'text'}
                code={String(children).replace(/\n$/, '')}
              />
            );
          },
          // 自定义图片渲染
          img({ src, alt }) {
            if (!src || typeof src !== 'string') return null;
            return <ImageLightbox src={src} alt={alt || ''} />;
          },
          // 自定义标题渲染（添加 id 用于目录跳转）
          h1({ children }) {
            const id = generateHeadingId(children);
            return (
              <h1 id={id} className="scroll-mt-24">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            const id = generateHeadingId(children);
            return (
              <h2 id={id} className="scroll-mt-24">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            const id = generateHeadingId(children);
            return (
              <h3 id={id} className="scroll-mt-24">
                {children}
              </h3>
            );
          },
          // 自定义链接渲染
          a({ href, children }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-accent hover:underline"
              >
                {children}
              </a>
            );
          },
          // 自定义引用块渲染
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-accent pl-4 italic text-sub-text">
                {children}
              </blockquote>
            );
          },
          // 自定义表格渲染
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="min-w-full">{children}</table>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

/**
 * 从标题内容生成 ID
 */
function generateHeadingId(children: React.ReactNode): string {
  const text = extractTextFromChildren(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * 从 React children 中提取文本
 */
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props?: { children?: React.ReactNode } };
    return extractTextFromChildren(element.props?.children);
  }
  return '';
}
