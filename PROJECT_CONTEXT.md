# JoeyDDong 个人网站项目上下文

更新日期：2026-10-14

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

以个人介绍为主，展示经过确认的三语简介、教育背景、编程与工作、摄影、写作及 GitHub 联系入口。用户目前从事数据科学工作，主要使用 C++ 和 Python，仍练习算法；不展示工作单位或所在地。

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

## 2026-10-13 Portfolio 初版更新（历史记录）

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

## 2026-10-13 Portfolio 文案修订

中文及对应英日文稿均已获用户确认，改为自然、直接的叙述，介绍当前数据科学家身份、C++ 与 Python、持续练习算法，以及闲暇时在街巷散步拍风景、解压和博客学习记录。删除 AI 辅助开发卡片，保留编程、数据科学、算法三张卡片；栏目名称改为“编程与工作”“摄影与写作”，三语学位名称简化为本科／硕士。首屏副标题、正文和页面描述移除空泛理念与宣传式表达。

沿用现有两行问候、照片、统一容器宽度、红色卡片、语言切换和页尾。三卡桌面两列、手机一列；正文无返回首页按钮。本次仅更新本地内容和预览，不提交、不推送、不部署。

## 2026-10-13 Photography 已确认文案

按用户确认的计划将三语文案改为贴近旧博客的自然表达，中文主标题“我的照片”、相册标题“摄影作品”，英文为“My Photos”及“Photographs”，日文为“私の写真”及“写真”。介绍保留摄影爱好、街头散步、朋友使用照片当壁纸及分享照片的内容，使用用户确认的完整三语草稿。页面摘要简化，主标题统一读取文案数据。原底部句子及译文保持不变，正文继续为18px，仅最后一句加粗。布局、图片与轮播不变；本次仅本地修改与验证，不提交、不推送、不部署。

## 2026-10-13 当前版本发布

用户授权将当前版本使用中文 commit 提交并推送至 GitHub main，再部署现有 Cloudflare Worker `joeyddong-homepage`。本次包括已确认的 Photography 与 Portfolio 三语文案和对应文档；此前各节“仅本地”描述为历史状态。本次发布沿用现有主域名 `joeyddong.top` 与别名重定向配置。

## 2026-10-14 FADE Coding 项目介绍页

用户确认在 Projects 上方 Coding 区用“FADE — 图片雾浓度评估”卡片替换“制作中”，独立详情页为 `/projects/fade-py/`，含 `/zh/` 与 `/ja/` 三语版本。页面面向普通访客及技术读者，沿用珊瑚红共享背景、导航和页尾，使用奶油色内容区，按项目介绍、真实示例切换、简要原理、个人贡献、短代码、文档与论文入口组织内容。

中文开头为已确认文案：“这是我根据 FADE 论文，用 Python 实现的图片雾浓度评估工具。它不需要配对的无雾图片，可以从单张 RGB 图片计算 FADE 分数，并生成局部雾浓度图。”算法归于 Choi、You、Bovik 的 2015 年论文，个人贡献为 Python 实现、模块化、向量化与缓存优化。详细公式及性能数据通过仓库文档查看，不添加未提供的应用背景、性能承诺或评分阈值。

使用 fade_py 仓库三组示例原图及同一源版本离线计算的评分、局部密度图。默认第一组，按钮切换原图、评分与密度图，刷新或历史恢复时复位。桌面并排、手机上下排列；共用灰度色标与独立 NaN 标记。来源和再生成方法见 `docs/ASSETS.md`，数值清单为 `src/lib/fade-examples.json`。网站不执行 Python，不支持上传或实时计算；现有 Vibe Coding 项目保留。

本次授权仅限本地实现、验证与预览，不提交、不推送、不部署；此前版本的发布授权不适用于本次改动。

验证完成：`npm run check` 为 0 错误、0 警告，`npm run build` 生成 25 个页面；保留原有 PorscheGarage 的约 630 KB 包体提示，FADE 仅加载自身约 15 KB 的示例切换脚本。已核对三语 canonical、hreflang、列表及素材链接，浏览器验证切换原图／密度图／评分、Enter 与 Space 键操作、刷新复位、三语切换及语言偏好跳转；宽屏并排、窄屏上下布局均无横向溢出。图片与密度图 SHA-256 与生成清单一致。

详情页后续补充：用户要求加入论文简介与出处、简要原理和计算流程，并强调输出为反映全图雾浓度的数值与局部雾浓度热力图，缩小评分字号。三语页面将论文介绍放到项目简介之后，说明 FADE 与论文中的 DEFADE 应用，提供正式期刊 DOI 和作者公开 PDF；正式题名为 *Referenceless Prediction of Perceptual Fog Density and Perceptual Image Defogging*。原理段补充雾对对比度、纹理、颜色与亮度的影响，流程展开为分块、12 维特征与 log1p、参考统计距离、全图数值和局部热力图。结果数值改为 22px 的紧凑信息块；热力图沿用已确认的统一灰度色标。

技术说明再更新：用户要求依据 GitHub 刚上传的三语技术文档优化原理与流程，并删除“在 Python 中试一试”。文档版本为 `dc68df29112521a8a1c0e1e1d9f1374bd485cf83`，与示例计算版本 `50643c5` 相比仅变更三份技术文档，算法和示例结果保持一致。页面按 f01–f05、f06–f09、f10–f12 展示特征类别，流程为裁剪与共享预处理、特征提取、log1p 矩阵、逐块特征方差、双参考参数、两组 Mahalanobis-like 距离。随后分别展示距离均值之比的全图评分、逐块距离之比的热力图，并说明程序的方差代理与论文 MVG 拟合的差异。三语技术文档入口指向各自语言的新版；Python 使用模块及关联代码、文案、样式已删除。本次仍仅本地更新。

本轮验证：Astro 检查 0 错误、0 警告，构建 25 个页面；三语页面均包含六步流程、两个具备朗读标签的计算表达式及对应语言文档链接，均已移除 Python 使用模块。浏览器宽屏验证三列流程、双列输出，窄屏为单列且无横向溢出；示例热力图文件校验值保持一致。当前保留的本地预览服务为 `http://127.0.0.1:4325`。

## 2026-10-14 FADE 项目发布授权

用户已明确授权将当前 FADE 项目及相关页面、素材和文档使用中文 commit 提交并推送到 GitHub `main`，随后部署现有 Cloudflare Worker `joeyddong-homepage`。此前 FADE 各阶段“仅本地、不提交或部署”的记录描述当时状态，不再限制本次发布。发布沿用 `joeyddong.top`、两个主站别名及现有 Blog 地址；生产构建使用 `PUBLIC_BLOG_URL=https://blog.joeyddong.top`。

## 2026-10-14 Photography 图片加载优化

按用户确认的计划生成78张照片的234个本地WebP预览（320/640/960px，质量75），通过sharp完整解码验证，保留原始链接与顺序。生成命令 `npm run photography:prepare` 会复用有效已有文件；正常构建和部署不下载素材。列表、首屏、轮播背景、缩略图及相邻缓冲均引用本地小图。仅当前照片按实际显示尺寸及最高2倍像素比请求长边960/1440/1920/2560px、质量85的OSS高清图；先展示小图，解码成功后替换，失败保留预览并支持三语提示和重试。关闭或快速切换使旧请求失效，不预加载相邻高清图。

实测原始照片总量116.48MB；78张640px质量75小图合计5.74MB（约少95.1%）。旧页实际上已使用OSS默认压缩小图，同宽640px合计4.21MB，因此新质量75的总量比旧小图大36.3%；此次主要提升为消除列表的OSS请求、减少轮播高清预加载及解码开销，不声称同尺寸小图流量进一步下降。维护和验收见 `docs/PHOTOGRAPHY_PERFORMANCE.md`。本次只本地实现与验证，不提交、不推送、不部署。

## 2026-10-14 Photography 优化版本发布授权

用户明确授权将当前摄影图片加载优化版本使用中文 commit 提交并推送 GitHub main，然后部署现有网站。本次包含234个本地预览文件、来源及尺寸清单、按需高清加载逻辑、测试和维护说明；此前本轮“仅本地”的描述为历史状态。沿用现有 Cloudflare Worker 与主域名配置。
