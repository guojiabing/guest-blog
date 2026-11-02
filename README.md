# Guest · 个人博客

记录技术，分享构建。一个以阅读和写作为中心的 Astro 静态博客。

- 公开博客：[guojiabing.github.io/guest-blog](https://guojiabing.github.io/guest-blog/)
- 源码：[guojiabing/guest-blog](https://github.com/guojiabing/guest-blog)

主域名目标为 `https://blog.jiabing.me`，接入方式见下面的 Cloudflare Pages 章节；写入配置不代表 DNS 和 HTTPS 已生效。

## 本地运行

使用 Node.js 22 LTS 和 npm。

```sh
npm ci
npm run dev
```

开发服务器通常运行在 `http://127.0.0.1:4321/`。

```sh
npm run check
npm run build
npm run preview
```

## 写一篇文章

在 `src/content/blog/` 新建 `my-note.md`：

```md
---
title: "我的一篇新笔记"
description: "一句话摘要。"
date: 2026-11-02
tags: ["JavaScript", "实践"]
category: "前端开发"
draft: false
featured: false
---

正文从这里开始。

## 一个小标题

二级、三级标题会自动加入目录。
```

- `draft: true` 的文章不会进入页面、搜索、RSS 或站点地图。
- 文件名决定文章路径，例如 `/blog/my-note/`。
- 首页展示首篇 `featured: true` 的文章；未设置精选时自动选择最新文章。
- `sourceUrl` 可用于历史文章索引，页面会明确提示并链接原文。
- 图片放在 `public/`，引用时请考虑 GitHub Pages 的仓库子路径。

## 调整个人信息和页面

| 文件 | 用途 |
| --- | --- |
| `src/data/site.ts` | 昵称、账号、社交链接、项目资料 |
| `src/pages/index.astro` | 首页介绍与精选内容 |
| `src/pages/about.astro` | 关于我 |
| `src/styles/global.css` | 主题色、字体、布局及响应式样式 |
| `src/content/blog/` | Markdown 文章 |

首版收录 8 篇公开博客园文章的标题、简要介绍及原文入口，没有迁移原文正文；另有 2 篇建站说明，可直接修改或删除。项目页收录公开 GitHub 原创仓库，未把 fork 标成原创。

## Cloudflare Pages 发布（blog.jiabing.me）

采用 **GitHub 管理源码 → Astro 构建 → Cloudflare Pages 边缘分发 → 自定义域名**。访客读取的是 Cloudflare 上的静态部署，不需要请求 GitHub 获取网页。

`jiabing.me` 当前使用 DNSPod。Pages 支持第三方 DNS 的子域名 CNAME 接入，可以仅接入 `blog.jiabing.me`，无需迁移整个域名的 nameserver。参考作者实际使用 Workers SSR；本站保留静态生成，用 Pages 承接同样的静态边缘分发需求。

### 首次接入

1. 登录 Cloudflare，在 **Workers & Pages → Create → Pages → Connect to Git** 选择本仓库。若出现 GitHub 应用授权，限定到 `guest-blog` 仓库，由账户所有者确认授权。
2. 生产分支选择 `main`，构建命令为 `npm run build:cloudflare`，输出目录为 `dist`，Node.js 版本选择 22。项目名计划为 `jiabing-blog`；如已被占用，以创建后返回的名称为准，并同步 `wrangler.jsonc` 和部署命令。
3. 构建环境变量 `SITE_URL` 设置为 `https://blog.jiabing.me`。构建脚本将站点路径设为 `/`，同时生成正确的 canonical、RSS 和 sitemap，避免携带 GitHub Pages 的仓库子路径。
4. 部署成功后，先在 Pages 项目的 **Custom domains** 添加 `blog.jiabing.me`。
5. 再到 DNSPod，为主机记录 `blog` 设置 CNAME，值必须使用 **Cloudflare 实际返回的 Pages 域名**。不要猜测 CNAME 目标。若 `blog` 有显式 A/AAAA 记录，仅替换这条记录并保留原值以便回退；若响应来自泛解析，则新增 `blog` CNAME 即可。
6. 等待 Cloudflare 的域名和证书状态变成 Active，再验证首页、文章、搜索、RSS，并从国内移动/电信/联通直连检查可达性。

后续向 `main` 推送会触发 Cloudflare 的 Git 集成自动构建；该集成需在 Cloudflare 中实际连接成功，仓库里的配置本身不会自动授予平台访问权限。

### 边缘和资源策略

- 页面、脚本、样式和字体一起发布到 Cloudflare，页面加载不依赖 Google Fonts 或 GitHub 的资源域名。
- 带内容哈希的 `/_astro/*` 资源使用一年浏览器缓存和 `immutable`，更新后文件名变化。
- HTML 保留平台默认的重新验证行为，不给未版本化页面配置一年缓存。RSS 的浏览器缓存最多五分钟。
- 缓存头通过 `public/_headers` 发布；静态文件的边缘缓存由平台处理，不增加数据库、KV 或 SSR 依赖。
- 正式访问入口使用 `blog.jiabing.me`。平台默认域名和此前的 `chatgpt.site` 私人预览不作为国内访问验收入口。

普通 Cloudflare 全球网络不等同于中国大陆 CDN，不能承诺所有国内运营商稳定可达。Cloudflare 中国网络需要企业套餐、单独订阅及有效 ICP 资质；若国内稳定访问是硬性要求，应根据直连测试结果决定是否采用国内托管/CDN。

文档依据：[Pages 子域名接入](https://developers.cloudflare.com/pages/configuration/custom-domains/)、[缓存与性能](https://developers.cloudflare.com/pages/configuration/serving-pages/)、[自定义响应头](https://developers.cloudflare.com/pages/configuration/headers/)、[中国网络说明](https://developers.cloudflare.com/china-network/)。

### 本地预览与命令行发布

以下命令需要 Node.js 22 或更新版本：

```sh
npm run build:cloudflare
npm run preview:cloudflare
```

命令行发布需先创建 Pages 项目并由账户所有者完成 Wrangler 授权，再执行 `npm run deploy:cloudflare`。如项目名有变化，先同步部署命令，不在源码中放账号凭据。

## GitHub Pages 备用发布

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 推送到 `main`，或在 Actions 中手动运行「构建并发布博客」。
3. 工作流自动检查、构建，并发布 `dist/`；域名与仓库子路径由 Pages 配置注入。

不需要数据库、服务器或额外令牌。工作流只使用 GitHub 的内置 `GITHUB_TOKEN`。

部署到其他静态托管平台时：

```sh
SITE_URL=https://你的域名 BASE_PATH=/ npm run build
```

将 `dist/` 上传。`SITE_URL` 必须包含 `https://`，`BASE_PATH` 必须以 `/` 结尾。默认目标为 `https://blog.jiabing.me`；GitHub Pages 工作流会注入自己的域名和仓库子路径。

## 功能

首页、文章详情与自动目录、标题/摘要/标签搜索、分类与关键词组合筛选、按年归档、项目页、深浅色主题、RSS、sitemap、robots、canonical、Open Graph、JSON-LD、移动端导航与 404。

搜索仅索引本站标题、摘要和标签，不抓取外部文章全文。历史文章的发布日期保留原日期。本站不配置阅读量、粉丝量、评论或分析追踪。

## 灵感来源

建站方式与视觉方向参考：

- ErpanOmer：[为什么每个前端都应该拥有一个自己的独立博客？](https://juejin.cn/post/7698637850893139977)
- [ErpanOmer/erpanomer.github.io](https://github.com/ErpanOmer/erpanomer.github.io/tree/master)

参考项目未提供明确的开源许可证，因此本站页面、样式和交互独立编写，没有复制其源码、个人内容或图片资源。

DM Sans 和 Manrope 通过 Fontsource 打包为本站资源，访客无需访问 Google Fonts；中文使用系统字体。字体授权文件保留在 `public/licenses/`，静态图片标记与 SVG 图形由本站编写。

提交信息使用中文 Conventional Commits，例如 `feat(blog): 增加新的文章分类`。
