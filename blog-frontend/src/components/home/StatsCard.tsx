import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { SITE_CONFIG } from '@/lib/config';

// 技术栈卡片
export function TechStackCard() {
  const techStack = ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Tailwind'];

  return (
    <GlassCard hover className="flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <StackIcon className="w-8 h-8" />
        <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          Tech Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// GitHub 统计卡片
export function GitHubStatsCard() {
  return (
    <Link
      href={SITE_CONFIG.author.social.github || 'https://github.com'}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <GlassCard
        dark
        className="flex flex-col justify-center items-center text-center group cursor-pointer h-full"
      >
        <GitHubIcon className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
        <div className="text-lg font-serif font-bold">@wangmxian</div>
        <div className="text-xs text-gray-400 mt-1">Follow on GitHub</div>
      </GlassCard>
    </Link>
  );
}

// Icons
function StackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M17 7H7M17 7v10"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default TechStackCard;
