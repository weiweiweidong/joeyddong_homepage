# Nook 主页集成

Nook 位于 Projects 的 Vibe Coding 栏目，按当前语言进入 `/projects/nook/`、`/zh/projects/nook/` 或 `/ja/projects/nook/`。页面沿用主页布局，同源 iframe 只展示模拟器工作台。

## 本地运行与更新

```sh
npm ci
npm run dev
```

模拟器产物已纳入 `public/demos/nook/`。普通主页检查、构建和部署不需要模拟器仓库，不下载其资源，也不安装 Angular。

更新模拟器版本时，在主页仓库运行：

```sh
# 先在模拟器仓库安装依赖
(cd ../home_simulator && npm ci)
npm run nook:sync -- --source ../home_simulator
npm run nook:test
npm run check
npm run build
npm run preview
```

同步脚本先执行模拟器的类型检查、测试和生产构建，再替换固定的资源目录，清理过期哈希文件，保留第三方许可证。`source-manifest.json` 记录来源、提交号、是否包含未提交修改、每个文件的 SHA-256 和整包摘要。把更新后的完整目录与主页变更一起提交。iframe 使用显式入口 `/demos/nook/index.html`，保留 Angular 的 `<base href="./">`，不要让 SPA 回退覆盖资源文件。Astro 开发服务器不会为 public 静态目录自动解析 index.html，因此不能仅依赖 `/demos/nook/` 作为 iframe 地址；生产预览和正式部署也共用这个文件入口。

卡片封面为 `public/images/nook-preview.webp`，根据模拟器 `docs/preview-desktop.png` 的房间区域裁切生成。

## 语言控制与状态

Nook 页面初始化时先注册消息监听器，再设置 `/demos/nook/index.html?embed=1&lang=<locale>`。语言代码为 `zh | en | ja`：

```ts
// 主页 → 模拟器
{ type: 'nook:set-locale', version: 1, locale: 'ja' }
// 模拟器 → 主页
{ type: 'nook:ready', version: 1, locale: 'ja' }
{ type: 'nook:locale-changed', version: 1, locale: 'ja' }
```

父页面校验同源 origin、当前 iframe source、消息类型、版本和语言；发送使用明确的同源地址。尚未就绪时只记住最新语言。首次加载 15 秒无 ready 会显示错误，重试使用最新语言，不自动重复加载。

只有 Nook 详情页接管普通语言点击。客户端更新外层文案、导航、无障碍标签、元信息、主页语言偏好和 URL，再向模拟器发消息。URL 使用对应语言路由和显式 `lang`，保留其他查询参数与 hash。前进、后退恢复语言。Ctrl/Cmd 点击、新标签页和无 JavaScript 链接保留原生导航；其他页面行为不变。

正常即时语言切换保留 iframe、相机、家具、户型、选中对象、绘制草稿、名称输入、搜索筛选和撤销历史。不读写 iframe 内部 DOM 或 Angular 状态，也不因换语言保存设计。

设计仍需手动保存，使用同源 `nook-project-v1`。刷新或离开页面会重新载入模拟器，丢弃未保存编辑和撤销历史。保存只属于当前浏览器和站点；localhost 存档不会自动迁移到正式域名。嵌入模式不读取或覆盖独立模式的 `nook-locale-v1`。

## 验证

`npm run nook:test` 检查消息来源、协议、就绪前选择、快速切换确认、重试和语言 URL。`npm run check` / `npm run build` 检查 Astro 类型与三语静态页面。真实浏览器中检查 1280px / 390px 三语布局、保存、帮助、手机面板及语言切换时的编辑状态；不能用 mock 替代 iframe 集成检查。

发布沿用主页现有 Cloudflare Worker `joeyddong-homepage`、主域名 `joeyddong.top` 和两个别名，其他项目的导航机制保持原有配置。先通过测试和 `wrangler deploy --dry-run` 检查，再提交、推送并执行现有部署流程；生产构建保留 `PUBLIC_BLOG_URL=https://blog.joeyddong.top`。

## 本次验证记录（2026-10-18）

- 模拟器：11 项几何、字典、语言初始化、协议与旧存档测试通过，类型检查和生产构建通过。
- 主页：5 项 Nook 协议与 URL 测试通过；Astro 检查 62 个文件，0 错误、0 警告、0 提示；生产构建生成 28 个页面。构建仍报告大于 500kB 的客户端分块体积提示。
- 6 个嵌入构建文件均与来源清单的 SHA-256 一致。预编译的 `public/demos/nook` 已从 Astro 源码类型扫描中排除，避免压缩 Angular bundle 被当作源码分析。
- 真实同源页面：三语即时切换、浏览器前进后退、家具选择、未保存状态、撤销及搜索保持通过；未完成多边形草稿点位完全一致。自定义设计名保存并刷新后保持。
- 同源诊断页比较 iframe、canvas、户型节点、视图、选择、撤销按钮、草稿、几何、存档和独立语言偏好，全部保持；同源其他窗口发送的伪造回复被忽略。诊断只读取 DOM 和存储，不修改 Angular 私有状态。
- 人为阻断模拟器请求后显示日文超时提示；恢复请求并重试，iframe 使用最新的 `lang=ja`，成功收到就绪及语言确认。该故障在临时测试服务上模拟，未改变生产代码。
- 1280px 桌面与 390px 手机检查三语排版，无横向溢出；手机目录和属性抽屉、帮助弹窗及主页菜单可用。FADE、Gravity Garden、Cat Yard、Porsche Garage 的路由与语言链接回归通过。

### 截图

| 语言    | 桌面                                        | 手机                                   |
| ------- | ------------------------------------------- | -------------------------------------- |
| 中文    | [桌面](nook/preview-desktop-zh.png)         | [手机](nook/preview-mobile-zh.png)     |
| English | [Desktop](nook/preview-desktop-en.png)      | [Mobile](nook/preview-mobile-en.png)   |
| 日本語  | [デスクトップ](nook/preview-desktop-ja.png) | [モバイル](nook/preview-mobile-ja.png) |

[Projects 栏目与 Nook 卡片](nook/preview-projects-zh.png)。

## 开发模式加载修复

开发服务器中 `/demos/nook/` 返回主页 404，而 `/demos/nook/index.html` 返回模拟器入口。此前只验证生产预览，未覆盖开发模式的目录解析差异。加载和重试现统一使用 `nookEmbedUrl` 生成显式 HTML 地址，仍先安装消息监听器再加载 iframe；正常语言切换不重载 iframe。新增回归用例覆盖三语初始化、重试参数和显式入口的兼容性。

修复后已分别在 `astro dev` 和 `astro preview` 中验证：iframe 加载显式 index.html，收到 ready 与语言确认，加载遮罩消失。开发模式三语切换保持原 iframe 地址。6 项主页测试、Astro 类型检查和生产构建均通过。[修复后的页面截图](nook/loading-fixed.png)。

## 项目介绍与发布

标题下方新增“可以做什么”和“为什么做这个项目”，介绍户型编辑、3D 布置、本地保存，以及空间布局探索与 Angular / 3D 学习实践。三语文案随主页语言即时更新，桌面双栏、手机单栏。[桌面介绍截图](nook/intro-desktop.png) · [手机截图](nook/intro-mobile.png)。

发布资源的 `source-manifest.json` 已更新为模拟器提交 `a1a38c284a7ca23a38ea05d21c683153b614ec9f`，来源工作区干净。发布前通过模拟器 11 项、主页 Nook 6 项、摄影 3 项测试，以及 Astro 类型检查。
