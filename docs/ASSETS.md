# Portrait assets

`public/images/portrait-placeholder.jpg` is the former temporary sample portrait, not JoeyDDong. It is no longer displayed on the homepage.

- Source: https://github.com/StartBootstrap/startbootstrap-agency/blob/master/dist/assets/img/team/1.jpg
- Retrieved: 2026-10-12

Portrait images are stored locally so the website does not depend on an external image server.

## Home and Portfolio portrait (2026-10-13)

`public/images/portfolio-portrait.jpg` is the owner’s photo reused with approval from the old About page. The homepage profile card and Portfolio both use this image. The homepage uses an upper crop to keep the face and camera visible, with the caption “JoeyDDong”. Source: https://my-markdown-picture-bedding.oss-ap-northeast-1.aliyuncs.com/uPic/2024-12-15/6B332ADD-F701-457F-B6AD-3EDB4B4169D0-FF7D364D-BBDD-4ECD-AC26-F2D76EEF306B.jpg

## Photography 照片

`src/lib/photography.ts` 保存用户提供的 78 张照片及原始顺序，来源为旧博客 `https://joeyddong.top/photos/`。所有照片继续引用原阿里云 OSS URL，无本地副本。页面展示添加 `x-oss-process` 参数进行等比例缩小与 WebP 转换；网格采用响应式尺寸及懒加载，大图查看器按需加载 1600px 预览，「打开原图」保留原 URL。照片编号不是拍摄日期或地点，页面不添加未经确认的地点、分类与拍摄信息。
