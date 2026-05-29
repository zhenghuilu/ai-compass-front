# AI商业化热榜

国内 AI 商业化资讯热度榜单 — 聚合36氪、雷峰网、量子位、钛媒体四大信源，由大模型基于商业影响力、讨论密度、时效性、信源权威性四维度评分。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite
- **样式**: CSS Modules
- **路由**: React Router v6
- **图标**: Lucide React
- **测试**: Vitest + Testing Library

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:5173)
npm run dev

# 运行测试
npm test

# 构建生产版本
npm run build
```

后端 API 默认连接 `http://localhost:3000`，可通过环境变量覆盖：

```bash
VITE_API_BASE_URL=https://your-api.com npm run dev
```

## 部署到 Vercel

### 方式一：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署（在项目根目录执行）
vercel

# 生产环境部署
vercel --prod
```

### 方式二：GitHub 自动部署

1. 将代码推送到 GitHub 仓库
2. 在 [vercel.com](https://vercel.com) 点击 **Add New → Project**
3. 导入该仓库
4. 在 **Environment Variables** 中添加：

   | 名称 | 值 |
   |------|-----|
   | `VITE_API_BASE_URL` | 后端 API 地址（如 `https://api.your-domain.com`） |

5. 点击 **Deploy**

### 说明

- 项目根目录包含 `vercel.json`，已配置 SPA 路由回退，刷新页面不会 404
- 构建命令和输出目录使用 Vite 默认配置（`npm run build` → `dist/`），Vercel 会自动识别
- API 地址通过 `VITE_API_BASE_URL` 环境变量注入，**部署前必须设置**，否则会回退到 `http://localhost:3000`

## 目录结构

```
src/
├── assets/styles/       # 全局样式 (CSS 变量)
├── components/          # 通用 UI 组件 (Header, Footer)
├── features/rankings/   # 榜单业务模块
│   ├── components/      # HeatBar, SourceCard, SourceTabs, RankingItem, Methodology
│   └── pages/           # RankingsPage
├── hooks/               # useSources, useRankings
├── layouts/             # MainLayout
├── pages/               # HomePage
├── routes/              # 路由配置
├── services/            # API 封装
├── types/               # TypeScript 类型
└── utils/               # 工具函数
```
