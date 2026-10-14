# Portrait assets

`public/images/portrait-placeholder.jpg` is the former temporary sample portrait, not JoeyDDong. It is no longer displayed on the homepage.

- Source: https://github.com/StartBootstrap/startbootstrap-agency/blob/master/dist/assets/img/team/1.jpg
- Retrieved: 2026-10-12

Portrait images are stored locally so the website does not depend on an external image server.

## Home and Portfolio portrait (2026-10-13)

`public/images/portfolio-portrait.jpg` is the owner’s photo reused with approval from the old About page. The homepage profile card and Portfolio both use this image. The homepage uses an upper crop to keep the face and camera visible, with the caption “JoeyDDong”. Source: https://my-markdown-picture-bedding.oss-ap-northeast-1.aliyuncs.com/uPic/2024-12-15/6B332ADD-F701-457F-B6AD-3EDB4B4169D0-FF7D364D-BBDD-4ECD-AC26-F2D76EEF306B.jpg

## Photography 照片

`src/lib/photography.ts` 保存用户提供的 78 张照片及原始顺序，来源为旧博客 `https://joeyddong.top/photos/`。所有照片继续引用原阿里云 OSS URL，无本地副本。页面展示添加 `x-oss-process` 参数进行等比例缩小与 WebP 转换；网格采用响应式尺寸及懒加载，大图查看器按需加载 1600px 预览，「打开原图」保留原 URL。照片编号不是拍摄日期或地点，页面不添加未经确认的地点、分类与拍摄信息。

## FADE 项目示例（2026-10-14）

用户确认复用 [fade_py/test_image](https://github.com/weiweiweidong/fade_py/tree/50643c5a5468171ebf399108aaa7052d0c57d015/test_image) 的三张测试图片。仅注明仓库来源，不将其描述为用户的摄影作品。`public/images/fade-py/sample-1.png`、`sample-2.jpg`、`sample-3.jpg` 为原始文件的逐字节副本，对应 `test_image1.png`、`test_image2.JPG`、`test_image3.jpg`；不裁切或缩放算法输入。列表封面与缩略图仅在显示时裁切，详情页原图保持完整。

`density-1.png` 至 `density-3.png` 使用同一干净源版本 `50643c5a5468171ebf399108aaa7052d0c57d015` 的 `fade_with_map()` 离线生成。每个 PNG 像素对应一个 8×8 图像块，页面以最近邻效果放大；三图统一使用 `[0, 20.247848320176296]` 灰度映射，最大值来自三组结果的最大有限值。非有限值以紫红色 `#cf4c93` 标记，不计入色标范围。三组评分为 `0.9113393845241384`、`2.7121977530723784`、`5.767438622699199`，显示四位小数。前两组分别有 2 和 7 个无有效结果块，第三组为 0。第三张原图高 531 像素，计算保留高 528 像素的完整块，图形状为 66×100。

`src/lib/fade-examples.json` 保存源版本、图片与结果文件 SHA-256、尺寸、评分、无有效结果块数及共用色标。网页不执行算法，也不请求 GitHub 获取图片。重新生成需已有 fade_py demo Python 环境：

```sh
PYTHONDONTWRITEBYTECODE=1 /absolute/path/to/fade_py/.venv/bin/python scripts/prepare-fade-examples.py --source /absolute/path/to/fade_py
```

脚本要求源仓库干净，校验评分四位小数与已确认结果一致，再生成静态素材与清单。未新增网站运行时依赖。算法项目为 MIT 许可；图片的独立作者与许可未在仓库中注明，故只保留已确认的来源，不推断作者身份。论文 PDF 仅提供外链，不复制进主站。

论文正式出处已核对作者提供的 PDF，题名为 *Referenceless Prediction of Perceptual Fog Density and Perceptual Image Defogging*，作者 Lark Kwon Choi、Jaehee You、Alan Conrad Bovik，IEEE Transactions on Image Processing, 24(11), 3888–3901, November 2015，DOI [10.1109/TIP.2015.2456502](https://doi.org/10.1109/TIP.2015.2456502)。页面提供 DOI 正式出版入口及 [作者公开的论文 PDF](https://utw10503.utweb.utexas.edu/publications/2015/LarkKwonChoi_TIP_2015_Referenceless_Prediction_of_Perceptual_Fog_Density_and_Perceptual_Image_Defogging.pdf)，修正早期仓库 README 中的题名错误。

技术说明内容与链接现使用新版文档提交 `dc68df29112521a8a1c0e1e1d9f1374bd485cf83`；该提交仅更新三语技术文档，算法代码仍为上述示例计算基线。文档链接按中／英／日语言选择 `technical_documentation.md`、`technical_documentation_EN.md`、`technical_documentation_JA.md`。本次未重新生成原图、热力图或修改结果清单。

## 2026-10-14 Photography 本地小图（当前实现）

列表和首屏使用 `public/images/photography/` 中的本地 WebP，覆盖 78 张照片，每张有 320、640、960px 三档，质量 75。来源清单在 `src/lib/photography-sources.json`，生成的真实宽高、大小和路径记录在 `src/lib/photography-assets.json`。用 `npm run photography:prepare` 维护，构建不联网生成。此前直接引用 OSS 小图的描述为历史记录。

轮播的背景、缩略图和前后滑动缓冲也使用本地小图；仅当前选中照片请求 OSS 屏幕适配高清图，原图入口继续使用原 URL。详细维护与验收数据见 `PHOTOGRAPHY_PERFORMANCE.md`。
