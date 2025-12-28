import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
  as?: 'div' | 'article' | 'section';
  id?: string;
}

export function GlassCard({
  children,
  className,
  hover = false,
  dark = false,
  as: Component = 'div',
  id,
}: GlassCardProps) {
  return (
    <Component
      id={id}
      className={cn(
        'rounded-2xl p-6',
        dark ? 'glass-card-dark text-white' : 'glass-card',
        hover && 'hover:shadow-lg transition-shadow cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default GlassCard;
