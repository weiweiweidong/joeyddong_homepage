# JoeyDDong 个人网站项目上下文

更新日期：2026-10-12

本文记录当前有效的需求、已确认的设计方向和实现状态。后续讨论与开发以此为基础；新的用户决策优先于本文。启动和维护细节见 [README.md](README.md)。

## 1. 项目目标

建设 JoeyDDong 长期使用的个人网站，兼顾职业展示与个人兴趣。访问者可以快速了解本人，并浏览文章、个人项目和摄影作品。

各栏目保持统一的个人品牌和基础视觉。网站优先采用静态、轻量、易维护的实现，方便长期添加内容。

## 2. 栏目与仓库边界

主导航固定包含五个栏目：**Home、Blog、Projects、Photography、Portfolio**。导航文字随界面语言切换。

| 栏目 | 用途 | 管理方式 | 预定网址 |
| --- | --- | --- | --- |
| Home | 网站主页与各栏目入口 | 当前主站仓库 | `https://joeyddong.top` |
| Blog | 文章、编程笔记与学习记录 | 已有独立 Hexo 仓库 | `https://blog.joeyddong.top` |
| Projects | Coding、Vibe Coding、Data Science 等个人项目 | 后续独立仓库 | `https://projects.joeyddong.top` |
| Photography | 个人摄影作品 | 后续独立仓库 | `https://photography.joeyddong.top` |
| Portfolio | 个人简介与精选经历 | 当前主站仓库 | `https://joeyddong.top/portfolio/` |

- 主站仓库：[weiweiweidong/joeyddong_homepage](https://github.com/weiweiweidong/joeyddong_homepage)。
- Blog 仓库：[weiweiweidong/My_Hexo_Blog_Source](https://github.com/weiweiweidong/My_Hexo_Blog_Source)。
- 当前 `www.joeyddong.top` 承载已有 Blog；迁移到 Blog 子域名的工作尚未实施。
- 当前仓库负责 Home、Portfolio，以及后续需要的其他主站静态页面。
- 四个网站分别维护仓库，统一品牌、五项导航与基础视觉；具体内容布局可以不同。

## 3. 各栏目的内容方向

### Home

主页快速说明“JoeyDDong 是谁，以及这个网站有什么”，通过有视觉印象的首屏和清晰入口引导访问者浏览。

当前布局包含居中的两行首屏标题、简短介绍、三语切换、三个子站的彩色栏目卡片，以及带肖像的个人简介和 Portfolio 入口。

首屏第一行使用自我介绍：中文 **我是 JoeyDDong。**、英文 **I’m JoeyDDong.**、日文 **JoeyDDong です。**。移除顶部 `A PERSONAL SPACE` 小字，使用自然、亲切的介绍：

| 语言 | 大标题第二行 | 简短介绍 |
| --- | --- | --- |
| 中文 | 写代码，也记录生活。 | 这里有我的项目、学习笔记，以及镜头里的日常。 |
| 英文 | Writing code. Capturing life. | My projects, learning notes, and everyday moments through my lens. |
| 日文 | コードを書き、日々を記録する。 | 自分のプロジェクト、学びのメモ、そして写真に残した日常を紹介します。 |


### Blog

继续使用已有 Hexo 项目。后续统一 Header、Footer、字体、配色及三语界面；文章保留原始语言，无需默认翻译每篇文章。

### Projects

展示类型较杂的个人项目，包括传统 Coding、AI 辅助的 Vibe Coding 和 Data Science。使用统一列表和多个标签组织交叉类型。

网站负责项目介绍，并提供 GitHub 和可用的独立 Demo 入口。实际应用保持独立仓库与部署。具体项目内容、详情页模板及内容管理方式后续确定。

### Photography

用于展示摄影作品。具体照片、分类方式和作品浏览布局尚未确定。

### Portfolio

以简短个人介绍和精选经历为主，让访问者快速了解本人。当前只有基础介绍与兴趣内容；正式经历、职业信息和其他个人资料需要由用户提供后补充。

## 4. 已确认的视觉方向

用户最新指定 [Kickpush](https://kickpush.co/) 为视觉参考，替代此前的暖白编辑式方案。网站仍保留个人品牌、照片与文字，以及强烈的首屏视觉印象。

- 珊瑚红背景 `#cc4942`，白色粗体无衬线字，局部使用奶油色、紫色和绿色卡片。
- 首屏以居中的两行大标题为重点，保留个人姓名、简介、语言选择和向下浏览入口。
- 下方使用超大段落标题、宽幅项目入口、略带倾斜的装饰卡片和圆形箭头。
- 项目、博客、摄影封面使用原生 HTML / CSS / SVG 装饰图形，表示栏目主题，不冒充真实作品。
- 临时肖像移到个人介绍区；Portfolio、导航和页尾共享新版视觉。
- 卡片悬停使用轻微动效，兼顾键盘操作、减少动画设置和手机布局。

正式肖像尚未选定。当前使用明确标注的临时示意照片，并非 JoeyDDong 本人；公开上线前替换为用户选定的照片。图片来源与替换方法见 [docs/ASSETS.md](docs/ASSETS.md)。

## 5. 多语言需求与当前实现

主要介绍页面支持中文、英文和日文。首次访问根据浏览器语言选择受支持的语言，无匹配时使用英文；手动选择需要记忆，并在跨站导航时延续。

主站已实现以下路由：

| 页面 | 英文 | 中文 | 日文 |
| --- | --- | --- | --- |
| Home | `/` | `/zh/` | `/ja/` |
| Portfolio | `/portfolio/` | `/zh/portfolio/` | `/ja/portfolio/` |

当前行为：

- 无语言前缀的页面优先读取已保存的选择，再匹配浏览器语言，最后回退到英文。
- 明确的中文、日文路径会被尊重；有效的 `?lang=en`、`?lang=zh`、`?lang=ja` 参数可指定进入时的语言。
- 所有主站页面在导航右上角提供语言下拉菜单；切换时保留当前页面类型，并保存偏好。
- 子站链接携带 `lang` 参数；正式域名下的语言 Cookie 可供子域名共享。
- 关闭 JavaScript 时仍可通过链接访问各语言页面；自动选择和记忆需要 JavaScript。

Blog、Projects 和 Photography 尚未接入这套语言规则，因此目前不能视为四站已完成统一多语言支持。

## 6. 主站技术与维护位置

当前主站使用 **Astro + TypeScript + 原生 CSS**，输出静态网站，包管理器为 pnpm。

- Node.js 要求：22.12 以上，推荐 Node 24；`.node-version` 记录为 24.19.0。
- 常用命令：`pnpm dev`、`pnpm check`、`pnpm build`、`pnpm preview`。
- 构建输出：`dist/`。

| 位置 | 职责 |
| --- | --- |
| `src/components/` | Header、Footer、语言切换、主页和基础 Portfolio 内容 |
| `src/layouts/BaseLayout.astro` | 共享页面结构、页面元信息与语言选择 |
| `src/pages/` | 三语 Home、Portfolio 与 404 路由 |
| `src/lib/i18n.ts` | 三语文案与路由规则 |
| `src/lib/locale-preference.ts` | 语言匹配与偏好保存 |
| `src/lib/site.ts` | 站点信息、导航、肖像路径与子站链接 |
| `src/styles/global.css` | 共享配色、字体、间距与响应式布局 |
| `public/` | 本地图片与网站图标 |

子站地址可通过 `.env` 中的 `PUBLIC_BLOG_URL`、`PUBLIC_PROJECTS_URL`、`PUBLIC_PHOTOGRAPHY_URL` 覆盖，示例见 `.env.example`。过渡期间可将 Blog 链接指向现有的 `https://www.joeyddong.top`。

## 7. 当前进度与后续事项

主站主页基础版已完成，包括共享 Header / Footer / Layout、三语 Home、基础 Portfolio、语言切换与记忆、手机导航和基础页面元信息。已通过 Astro 检查与静态构建，并检查了桌面、手机布局及主要交互。

当前子站入口使用预定子域名。其他子站尚未在本次工作中创建或部署，已有 Hexo Blog 也尚未进行视觉和多语言适配。

后续事项：

1. 根据主页预览反馈调整细节，确定正式肖像。
2. 补充经过用户确认的 Portfolio 内容。
3. 分别建设 Projects 与 Photography 子项目，确定内容和布局。
4. 适配已有 Hexo Blog，并统一四站导航、视觉和语言规则。
5. 确认部署和域名迁移方案后，再进行正式发布。

原有部署方向为 Cloudflare，域名在阿里云管理；具体 DNS、托管与重定向配置留待部署阶段确认。本次主站实现未部署到公网，也未修改现有域名和 Blog。

## 8. 后续开发原则

- 优先静态化、可读性与可维护性，使用语义化 HTML，兼顾桌面和手机。
- 各站统一基础视觉，同时允许内容采用合适的独立布局。
- 项目介绍与真实应用分开管理，避免把所有作品代码放入个人主页仓库。
- 内容增多时再选择合适的数据或 Markdown 管理方式，避免大量重复页面。
- 根据实际需求增加依赖和架构，默认沿用 Astro、TypeScript 与原生 CSS。
- 修改前先检查现有代码，保留合理实现；较大架构调整先简短说明理由。
- 未提供的职业经历、作品和个人信息应留待确认，不编造内容。
