/**
 * PM2 配置文件
 * 用于在宝塔面板上管理 Next.js 应用
 */
module.exports = {
  apps: [
    {
      name: 'muxian-blog',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/www/wwwroot/blog-frontend',  // 修改为你的实际部署路径
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
