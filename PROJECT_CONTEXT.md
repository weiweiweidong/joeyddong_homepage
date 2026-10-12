# JoeyDDong 个人网站项目上下文

更新日期：2026-10-13

2026-10-13 域名切换：新个人网站主域名改为 `https://joeyddong.top`，`www.joeyddong.top` 与 `joeyddong-site.top` 301 跳转到主域名。旧 GitHub Pages 博客已关闭发布，保留源码。独立新博客目标地址改为 `https://blog.joeyddong.top`；当前仓库入口与 Cloudflare 生产构建变量已同步，主站已部署；新博客域名已验证 HTTPS 200。此决策替代下文历史域名规划，验收见 [docs/PRIMARY_DOMAIN_SWITCH.md](docs/PRIMARY_DOMAIN_SWITCH.md)。

本文记录当前有效的需求、已确认的设计方向和实现状态。后续讨论与开发以此为基础；新的用户决策优先于本文。启动和维护细节见 [README.md](README.md)。

## 1. 项目目标

建设 JoeyDDong 长期使用的个人网站，兼顾职业展示与个人兴趣。访问者可以快速了解本人，并浏览文章、个人项目和摄影作品。

各栏目保持统一的个人品牌和基础视觉。网站优先采用静态、轻量、易维护的实现，方便长期添加内容。

## 2. 栏目与仓库边界

主导航固定包含五个栏目：**Home、Blog、Projects、Photography、Portfolio**。导航文字随界面语言切换。

| 栏目 | 用途 | 管理方式 | 预定网址 |
| --- | --- | --- | --- |
| Home | 网站主页与各栏目入口 | 当前主站仓库 | `https://joeyddong.top` |
| Blog | 新博客 | 独立项目，目标域名待线上配置 | `https://blog.joeyddong.top` |
| Projects | Coding、Vibe Coding、Data Science 等个人项目 | 后续独立仓库 | `https://projects.joeyddong-site.top` |
| Photography | 个人摄影作品 | 后续独立仓库 | `https://photography.joeyddong-site.top` |
| Portfolio | 个人简介与精选经历 | 当前主站仓库 | `https://joeyddong.top/portfolio/` |

- 主站仓库：[weiweiweidong/joeyddong_homepage](https://github.com/weiweiweidong/joeyddong_homepage)。
- Blog 仓库：[weiweiweidong/My_Hexo_Blog_Source](https://github.com/weiweiweidong/My_Hexo_Blog_Source)。
- 用户最新要求：新主页使用 `joeyddong.top`；旧 GitHub Pages 博客下线。独立新博客使用 `blog.joeyddong.top`，Projects、Photography 使用主站本地路由。
- 当前仓库负责 Home、Portfolio，以及后续需要的其他主站静态页面。
- 四个网站分别维护仓库，统一品牌、五项导航与基础视觉；具体内容布局可以不同。

## 3. 各栏目的内容方向

### Home

主页快速说明“JoeyDDong 是谁，以及这个网站有什么”，通过有视觉印象的首屏和清晰入口引导访问者浏览。

当前布局包含居中的首屏标题、简短介绍、三语切换、三个子站的彩色栏目卡片，以及带肖像的个人简介和 Portfolio 入口。

首屏第一行使用自我介绍：中文 **我是 JoeyDDong。**、英文 **I’m JoeyDDong.**、日文 **JoeyDDong です。**。移除顶部 `A PERSONAL SPACE` 小字，使用自然、亲切的介绍：

2026-10-13：移除大标题第二行，首屏只保留自我介绍；下方简介加粗并使用以下三语文案。

| 语言 | 简短介绍 |
| --- | --- |
| 中文 | 我是一名：程序员、摄影师和终身学习者。 |
| 英文 | I'm a: Programmer, Photographer and Lifelong Learner. |
| 日文 | プログラマー、写真家、そして生涯学び続ける人です。 |


### Blog

继续使用已有 Hexo 项目。后续统一 Header、Footer、字体、配色及三语界面；文章保留原始语言，无需默认翻译每篇文章。

### Projects

展示类型较杂的个人项目，包括传统 Coding、AI 辅助的 Vibe Coding 和 Data Science。使用统一列表和多个标签组织交叉类型。

网站负责项目介绍，并提供 GitHub 和可用的独立 Demo 入口。实际应用保持独立仓库与部署。具体项目内容、详情页模板及内容管理方式后续确定。

### Photography

用于展示摄影作品。具体照片、分类方式和作品浏览布局尚未确定。

### Portfolio

以个人介绍为主，展示经过确认的三语简介、教育背景、技术探索、摄影、写作及 GitHub 联系入口。京都大学硕士经历标为已毕业；不展示当前职业或所在地。

## 4. 已确认的视觉方向

用户最新指定 [Kickpush](https://kickpush.co/) 为视觉参考，替代此前的暖白编辑式方案。网站仍保留个人品牌、照片与文字，以及强烈的首屏视觉印象。

- 珊瑚红背景 `#cc4942`，白色粗体无衬线字，局部使用奶油色、紫色和绿色卡片。
- 首页背景以珊瑚红为主色，叠加圆形、倾斜圆角矩形和圆环的渐变形状，以 12–16 秒的交错节奏移动、旋转和缩放，增强渐变叠加的变化；背景延续至各内容区和页尾，导航使用半透明红色背景。首屏提供播放／暂停按钮；根据 2026-10-13 用户要求，三语主页每次进入均默认播放背景动画，包括系统开启“减少动态效果”时，用户可手动暂停。
- 首屏以居中的自我介绍大标题为重点，保留个人姓名、简介、语言选择和向下浏览入口。
- 下方使用超大段落标题、宽幅项目入口、略带倾斜的装饰卡片和圆形箭头。
- 项目、博客、摄影封面使用原生 HTML / CSS / SVG 装饰图形，表示栏目主题，不冒充真实作品。
- 个人肖像放在首页个人介绍区；Portfolio、导航和页尾共享新版视觉。
- 卡片悬停使用轻微动效，兼顾键盘操作、减少动画设置和手机布局。

首页与 Portfolio 使用用户指定的本人照片 `public/images/portfolio-portrait.jpg`。首页卡片采用偏上裁切，保留面部和相机，照片标注为 JoeyDDong。图片来源见 [docs/ASSETS.md](docs/ASSETS.md)。

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

当前主站使用 **Astro + TypeScript + 原生 CSS**，输出静态网站，包管理器为 npm。

- Node.js 要求：22.12 以上，推荐 Node 24；`.node-version` 记录为 24.19.0。
- 常用命令：`npm run dev`、`npm run check`、`npm run build`、`npm run preview`。
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

Blog 地址可通过 `.env` 中的 `PUBLIC_BLOG_URL` 覆盖，示例见 `.env.example`。新 Blog 链接默认为 `https://blog.joeyddong.top`。Projects 和 Photography 固定使用对应语言的站内页面，不受旧环境变量覆盖；未来独立子站上线时再调整路由。

## 7. 当前进度与后续事项

主站主页基础版已完成，包括共享 Header / Footer / Layout、三语 Home、基础 Portfolio、语言切换与记忆、手机导航和基础页面元信息。已通过 Astro 检查与静态构建，并检查了桌面、手机布局及主要交互。

生产构建环境已同步为 `PUBLIC_BLOG_URL=https://blog.joeyddong.top`。主站已通过 Wrangler 发布，十二个三语页面的新 Blog 链接与 canonical 均验证通过，两个旧主站域名仍正常 301 跳转。Cloudflare 自动构建命令已移除旧 `pnpm build`，由 `npx wrangler deploy` 调用仓库中的 `npm run build`。新博客域名已验证 HTTPS 200；独立 Blog 源码未在本次修改中调整。Projects 与 Photography 当前使用主站本地路由。

后续事项：

1. 根据主页预览反馈调整细节。
2. 根据后续需要维护 Portfolio 内容；2026-10-13 三语内容已确认并本地完成。
3. 分别建设 Projects 与 Photography 子项目，确定内容和布局。
4. 建设新的 Blog，并统一新四站导航、视觉和语言规则；保持旧博客独立。
5. 各新子站部署完成后，添加对应子域名的 DNS 与托管绑定。

当前已连接 GitHub 与 Cloudflare Workers，生产分支为 `main`。仓库通过 `wrangler.jsonc` 指定部署 `dist/`，执行 `npx wrangler deploy` 时先自动运行 `pnpm build`，避免全新构建环境缺少输出目录；Cloudflare 控制台的构建命令可以留空。构建环境使用 Node.js 24.19.0 和 pnpm 11.25.0。2026-10-12 已按用户最新要求完成域名对调：新首页使用 `www.joeyddong.top`，旧博客使用 `joeyddong.top`。域名在阿里云管理和续费，DNS 由 Cloudflare 托管。自动构建仍出现 Cloudflare API 超时，已通过控制台直接上传并成功发布，版本 `1c28c102` 为就绪。六个主站页面通过 Cloudflare 端点 HTTPS 验证，旧博客正常 HTTPS 可访问；本地 DNS 缓存仍可能产生 www 的旧跳转，详情与回滚步骤见 `docs/DOMAIN_MIGRATION.md`。

## 8. 后续开发原则

最新域名安排和接入进度以 `docs/PRIMARY_DOMAIN_SWITCH.md` 为准，`docs/NEW_DOMAIN_SETUP.md` 与上一节对调旧域名的部署记录作为历史保留。

- 优先静态化、可读性与可维护性，使用语义化 HTML，兼顾桌面和手机。
- 各站统一基础视觉，同时允许内容采用合适的独立布局。
- 项目介绍与真实应用分开管理，避免把所有作品代码放入个人主页仓库。
- 内容增多时再选择合适的数据或 Markdown 管理方式，避免大量重复页面。
- 根据实际需求增加依赖和架构，默认沿用 Astro、TypeScript 与原生 CSS。
- 修改前先检查现有代码，保留合理实现；较大架构调整先简短说明理由。
- 未提供的职业经历、作品和个人信息应留待确认，不编造内容。

## 2026-10-13 Portfolio 更新

三语文案已获用户确认，Portfolio 展示个人照片、关于我、教育背景、探索方向、摄影与写作及 GitHub。京都大学硕士已毕业；不公开当前职业、所在地、日期或研究详情。正文仅提供 GitHub 与返回首页，共享导航保持原样。Portfolio 使用旧 About 页本人照片的本地副本；用户随后指定首页底部个人介绍卡片也使用同一照片 `public/images/portfolio-portrait.jpg`，替换原占位图并更新三语图片说明。文案维护于 `src/lib/portfolio.ts`。

当前包管理器改为 npm 11.19.0，使用 `package-lock.json` 和 `npm ci`；仓库构建命令改为 `npm run build`。上文与域名记录中的 pnpm 命令是历史记录。本次只本地制作与预览，不提交、不推送、不部署，也不修改线上控制台设置。

## 2026-10-13 Projects 占位页

在主站添加简单静态占位页，显示“正在制作中”，沿用共享导航、页尾及珊瑚红视觉。路由为 `/projects/`、`/zh/projects/`、`/ja/projects/`，支持三语切换与语言偏好。首页卡片和导航默认指向此页；未来设置 `PUBLIC_PROJECTS_URL` 可接入独立子站。已通过 Astro 检查和静态构建。本次仅本地修改，未提交、推送或部署。

## 2026-10-13 Photography 本地页面

用户确认先在当前仓库创建 Photography 静态页并加入导航，沿用旧博客及用户提供的全部 78 张照片链接，重新排版并优化标题与介绍文字。页面沿用珊瑚红视觉，提供中英日三语介绍、完整竖幅照片网格、懒加载、点击大图、左右按钮及方向键切换、Escape 关闭与打开原图。原顺序及编号保留，照片未复制到仓库；通过原 OSS 图片链接的处理参数生成适配显示尺寸的 WebP 预览，原图入口不变。数据及文案维护于 `src/lib/photography.ts`。

新增路由 `/photography/`、`/zh/photography/`、`/ja/photography/`，导航与首页 Photography 卡片均指向当前静态页面。Photography 独立仓库与子域名作为后续事项。本次仅本地制作与预览，不提交、不推送、不部署。

2026-10-13 Photography 文案调整：删除首屏 `PHOTOGRAPHY / JOEYDDONG` 小字，扩充三语介绍以贴近旧博客的致谢、业余摄影、街头漫步、分享手机壁纸与展示眼中世界的原意；底部恢复原博客的中英日收藏时光句子。

Photography 版式细化：介绍段落统一为 18px、同一字体与行高，仅最后的邀请句加粗；移除 THROUGH MY LENS 装饰文字、照片总数、放大提示及每张图下的作者和编号。底部原句改为 18px 正文字号，在桌面端一行显示，小屏自然换行。

Photography 首屏装饰调整：移除绿色背景块，改为原清单第 3 张红叶照片与第 1 张夕阳照片错位堆叠，使用相同奶油色边框。背景照片仅作装饰，手机布局无横向溢出。

Photography 轮播调整：取消每张照片右下角的放大图标，点击整张照片打开全屏轮播。前后图片使用水平滑动过渡，支持按钮、键盘方向键及触屏左右滑动，首尾循环；减少动态效果设置下直接切换。保留 Escape 关闭、焦点恢复和打开原图。

Photography 轮播视觉升级：照片色彩构成模糊环境背景，采用奶油色细线导航与圆角计数，底部展示当前照片及前后三张的缩略图导航，支持直接跳转与选中高亮。按需加载预览，保留键盘、触屏、减少动态效果及 Escape 关闭；桌面和手机已验证。

Photography 轮播改为居中浮层：桌面最大 1040×780px，视口周围留白；手机左右留 16px、上下留 24px。半透明模糊遮罩保留底层页面，保留缩略图、切换与关闭交互。

## 2026-10-13 共享背景动画

Home、Projects、Photography、Portfolio 使用共享 `AnimatedBackground.astro`，沿用首页渐变图形、动画节奏及手机适配。四类页面默认开启动画；Projects、Photography、Portfolio 不显示动画开关，Home 保留现有开关。共享半透明导航与背景层级同步应用。已通过 Astro 检查、静态构建及十二个三语页面的输出检查。本次仅本地修改，未提交、推送或部署。

Photography 第 69 张照片修复：其原文件名 `20211030-DSC01103 2.jpg` 含空格，预览链接通过 URL API 编码后再生成 srcset，避免空格被当作响应式图片描述符分隔符。原图地址及编号保持不变。

## 2026-10-13 Projects 与三个 Demo

用户确认 Projects 在当前主站仓库内维护，采用上下两个区块：上方“我的 Coding 项目”，以手动实现为主，内容暂为“制作中”；下方“Vibe Coding 测试”，通过项目卡片进入各自独立的 Demo 页面。首屏使用“动手做点东西。”及朴素介绍，删除原装饰小标题。

已实现引力花园、小猫的院子、保时捷车库三个 Demo，分别位于 `/projects/gravity-garden/`、`/projects/cat-yard/`、`/projects/porsche-garage/`，均有 `/zh/` 与 `/ja/` 版本。Demo 保留项目导航高亮、返回列表、三语切换及正确 canonical。列表使用静态封面，3D 依赖和模型仅在车库页面加载。

保时捷使用 CC BY 4.0 的经典 911 Turbo 模型，保留 Karol Miklas / Lionsharp Studios 署名，模型与贴图已本地优化，左右车门已独立拆分；源版本、许可证和变更记录在素材目录。素材处理脚本可通过 `npm run porsche:prepare` 复用。桌面及手机交互、模型完整性、Astro 检查与静态构建已验证；构建产生 22 个页面。

用户现已明确授权使用中文提交说明提交当前改动、推送 GitHub，并部署主站；此前“仅本地制作、不提交或部署”的记录描述当时状态，不再限制本次发布。
