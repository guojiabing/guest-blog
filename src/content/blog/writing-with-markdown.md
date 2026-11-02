---
title: "用 Markdown，写下下一篇"
description: "标题、日期、几个标签，加上一段想分享的文字。更新博客，其实可以很简单。"
date: 2026-11-02
tags: ["Markdown", "Astro"]
category: "建站笔记"
---

这是新站的写作指南，也是一篇可以随时替换的起始文章。

## 一篇文章，一个文件

在 `src/content/blog/` 中创建一个 `.md` 文件。文件名会成为文章的地址，例如 `my-first-note.md` 对应 `/blog/my-first-note/`。

文件开头的元信息描述文章，其余部分就是正文。

```yaml
---
title: "我的第一篇笔记"
description: "用一句话说清这篇文章在聊什么。"
date: 2026-11-02
tags: ["JavaScript", "实践"]
category: "前端开发"
draft: false
---
```

`draft: true` 的内容会留在源码里，不会生成页面，也不会出现在搜索、RSS 和站点地图中。

## 用熟悉的方式写作

Markdown 支持标题、列表、引用、链接、表格和代码块。用二级、三级标题组织正文，右侧会自动生成目录。

```typescript
async function explore() {
  const idea = '保持好奇';
  return { idea, next: '动手试试' };
}
```

> 不必等到全部想明白，再开始写。先把今天理解的一小部分记下来。

图片可以放进 `public/images/`，通过站点路径引用。请为有内容意义的图片补充清楚的替代文字。

## 预览和发布

在项目目录中运行：

```sh
npm install
npm run dev
```

正式发布前执行 `npm run check` 和 `npm run build`。构建产物在 `dist/`，可以放到支持静态网站的托管平台。

仓库包含 GitHub Pages 工作流。按 README 启用 Pages 后，推送到主分支会触发构建与部署；发布域名通过工作流注入，用于生成正确的规范链接、RSS 与站点地图。

## 保持简单

文章、搜索、标签、归档都来自同一份内容。新增文件后会一起更新，无需逐个维护。

现在，可以把这篇指南换成你的下一篇记录了。
