import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagProps {
  name?: string;
  children?: React.ReactNode;
  slug?: string;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  className?: string;
}

export function Tag({
  name,
  children,
  slug,
  count,
  size = 'sm',
  variant = 'default',
  className,
}: TagProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClasses = {
    default: 'bg-gray-50 text-gray-500 border border-gray-100',
    outline: 'bg-white border border-gray-100 text-gray-600 hover:border-black',
    filled: 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white',
  };

  const baseClasses = cn(
    'inline-flex items-center rounded transition-colors',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const displayText = children || name;

  const content = (
    <>
      {displayText}
      {count !== undefined && (
        <span className="ml-1 opacity-60">({count})</span>
      )}
    </>
  );

  if (slug) {
    return (
      <Link href={`/tags/${slug}`} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <span className={baseClasses}>{content}</span>;
}

export default Tag;
