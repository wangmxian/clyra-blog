/**
 * 关于页面 - 王慕贤
 */

import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const metadata: Metadata = {
  title: `关于 - ${SITE_CONFIG.name}`,
  description: `了解更多关于 ${SITE_CONFIG.author.name} 的信息`,
};

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'Vue 3 / Nuxt', level: 90 },
  { name: 'TypeScript', level: 92 },
  { name: 'Tailwind CSS', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Vite / Webpack', level: 85 },
];

const experiences = [
  {
    title: '高级前端工程师',
    company: '某互联网大厂',
    period: '2022 - 至今',
    description: '负责核心业务的前端架构设计，主导多个重要项目的技术选型和落地。推动团队工程化建设，提升开发效率 40%。',
  },
  {
    title: '前端开发工程师',
    company: '某科技公司',
    period: '2020 - 2022',
    description: '参与公司主要产品的前端开发，使用 React + TypeScript 构建复杂的 B 端应用。负责组件库的设计与维护。',
  },
  {
    title: '初级前端工程师',
    company: '某创业公司',
    period: '2018 - 2020',
    description: '从零开始学习前端开发，参与多个项目的开发工作，快速成长为团队核心成员。',
  },
];

const projects = [
  {
    name: '个人博客系统',
    description: '使用 Next.js 14 + TypeScript + Tailwind CSS 构建的现代博客',
    link: 'https://github.com/wangmxian/blog',
  },
  {
    name: 'React 组件库',
    description: '基于 React 18 的企业级组件库，支持主题定制',
    link: 'https://github.com/wangmxian/ui-components',
  },
  {
    name: 'Vite 插件集合',
    description: '提升开发体验的 Vite 插件工具集',
    link: 'https://github.com/wangmxian/vite-plugins',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soft-bg">
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* 头部介绍 */}
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  慕贤
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {SITE_CONFIG.author.name}
                </h1>
                <p className="text-xl text-accent font-medium mb-4">
                  {SITE_CONFIG.author.title}
                </p>
                <p className="text-lg text-sub-text max-w-2xl mx-auto">
                  {SITE_CONFIG.author.bio}
                </p>
              </div>
            </AnimatedSection>

            {/* 关于我 */}
            <AnimatedSection delay={0.1}>
              <GlassCard className="mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  👋 关于我
                </h2>
                <div className="prose prose-lg text-sub-text space-y-4">
                  <p>
                    你好！我是王慕贤，一名热爱前端技术的开发者。
                  </p>
                  <p>
                    我专注于 React 和 Vue 生态系统，对 TypeScript、现代 CSS、前端工程化有深入的研究。
                    喜欢探索新技术，追求代码的优雅与性能的极致。
                  </p>
                  <p>
                    在这个博客里，我会分享前端开发的学习心得、实战经验、以及对技术趋势的思考。
                    希望我的内容能够帮助到正在前端道路上前行的你。
                  </p>
                  <p>
                    工作之余，我喜欢阅读技术书籍、参与开源项目、以及打打游戏放松一下。
                    如果你有任何问题或想法，欢迎通过下方的联系方式与我交流！
                  </p>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* 技能 */}
            <AnimatedSection delay={0.2}>
              <GlassCard className="mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  🛠️ 技术栈
                </h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-900 font-medium">{skill.name}</span>
                        <span className="text-sub-text">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* 工作经历 */}
            <AnimatedSection delay={0.3}>
              <GlassCard className="mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  💼 工作经历
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-6 border-l-2 border-accent/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-accent text-sm font-medium">{exp.company}</p>
                      <p className="text-sub-text text-sm mb-2">{exp.period}</p>
                      <p className="text-sub-text">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* 开源项目 */}
            <AnimatedSection delay={0.4}>
              <GlassCard className="mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  🚀 开源项目
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-sub-text mt-1">
                        {project.description}
                      </p>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* 联系方式 */}
            <AnimatedSection delay={0.5}>
              <GlassCard>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  📬 联系我
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={SITE_CONFIG.author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  {SITE_CONFIG.author.social.twitter && (
                    <a
                      href={SITE_CONFIG.author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter
                    </a>
                  )}
                  {SITE_CONFIG.author.social.email && (
                    <a
                      href={`mailto:${SITE_CONFIG.author.social.email}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  )}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
