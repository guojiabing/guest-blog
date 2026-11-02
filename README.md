# Guest · 个人博客

记录技术，分享构建。一个以阅读和写作为中心的 Astro 静态博客。

- 公开博客：[guojiabing.github.io/guest-blog](https://guojiabing.github.io/guest-blog/)
- 源码：[guojiabing/guest-blog](https://github.com/guojiabing/guest-blog)

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

## GitHub Pages 发布

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 推送到 `main`，或在 Actions 中手动运行「构建并发布博客」。
3. 工作流自动检查、构建，并发布 `dist/`；域名与仓库子路径由 Pages 配置注入。

不需要数据库、服务器或额外令牌。工作流只使用 GitHub 的内置 `GITHUB_TOKEN`。

部署到其他静态托管平台时：

```sh
SITE_URL=https://你的域名 BASE_PATH=/ npm run build
```

将 `dist/` 上传。`SITE_URL` 必须包含 `https://`，`BASE_PATH` 必须以 `/` 结尾。默认域名指向本项目的 Sites 私人预览，公开部署时请按上面的方式设置。

## 功能

首页、文章详情与自动目录、标题/摘要/标签搜索、分类与关键词组合筛选、按年归档、项目页、深浅色主题、RSS、sitemap、robots、canonical、Open Graph、JSON-LD、移动端导航与 404。

搜索仅索引本站标题、摘要和标签，不抓取外部文章全文。历史文章的发布日期保留原日期。本站不配置阅读量、粉丝量、评论或分析追踪。

## 灵感来源

建站方式与视觉方向参考：

- ErpanOmer：[为什么每个前端都应该拥有一个自己的独立博客？](https://juejin.cn/post/7698637850893139977)
- [ErpanOmer/erpanomer.github.io](https://github.com/ErpanOmer/erpanomer.github.io/tree/master)

参考项目未提供明确的开源许可证，因此本站页面、样式和交互独立编写，没有复制其源码、个人内容或图片资源。

字体使用 Google Fonts 的 DM Sans 与 Manrope；中文使用系统字体，字体服务不可用时自动回退到本地字体。静态图片标记与 SVG 图形由本站编写。

提交信息使用中文 Conventional Commits，例如 `feat(blog): 增加新的文章分类`。
