# Docker 部署指南（宝塔面板）

## 📋 前置要求

- 宝塔面板已安装 Docker
- 服务器有 Git（可选）

## 🚀 快速部署

### 1. 上传代码到服务器

```bash
cd /www/wwwroot
git clone <你的仓库地址> blog-frontend
# 或者通过宝塔文件管理上传
```

### 2. 构建并启动容器

```bash
cd /www/wwwroot/blog-frontend

# 构建镜像并启动（首次需要几分钟）
docker compose up -d --build

# 查看日志
docker logs -f muxian-blog
```

### 3. 配置 Nginx 反向代理

在宝塔面板中添加站点，配置文件如下：

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name muxian.dev www.muxian.dev;
    
    # SSL 配置（通过宝塔申请证书后自动生成）
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;
    
    # 日志
    access_log /www/wwwlogs/muxian.dev.log;
    error_log /www/wwwlogs/muxian.dev.error.log;
    
    # Gzip
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    
    # 静态资源缓存
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # 反向代理
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 常用命令

```bash
# 查看容器状态
docker ps

# 查看日志
docker logs muxian-blog
docker logs -f muxian-blog  # 实时日志

# 重启容器
docker restart muxian-blog

# 停止容器
docker stop muxian-blog

# 删除容器
docker rm muxian-blog

# 更新部署（拉取新代码后）
cd /www/wwwroot/blog-frontend
git pull
docker compose up -d --build

# 清理旧镜像
docker image prune -f
```

## 🔧 故障排查

### 构建失败
```bash
# 查看构建日志
docker compose build --no-cache

# 检查 Dockerfile 语法
docker build -t test .
```

### 容器无法启动
```bash
# 查看详细日志
docker logs muxian-blog

# 进入容器调试
docker exec -it muxian-blog sh
```

### 502 Bad Gateway
1. 确认容器运行中：`docker ps`
2. 确认端口映射：`docker port muxian-blog`
3. 检查 Nginx 配置中的 proxy_pass 端口

## 🎉 完成

访问你的域名即可看到博客！
