import type { Locale } from './i18n';
const en = {
  name: 'Porsche Garage', description: 'A classic 911 Turbo, up close. Rotate it, open the doors, and try a different coat of paint.',
  hint: 'Drag to rotate · Scroll or pinch to zoom · Click a door to open it',
  canvasLabel: 'Interactive 3D Porsche 911. Drag to rotate, scroll to zoom, or use the controls below. Arrow keys rotate the view.',
  leftDoor: 'Left door', rightDoor: 'Right door', reset: 'Reset view', autoRotate: 'Auto rotate', paint: 'Paint',
  colors: ['Racing yellow', 'Guards red', 'Silver', 'Midnight blue'],
  loading: 'Bringing the 911 into the garage…', ready: 'Ready to explore', opened: 'Door open', closed: 'Door closed',
  error: 'The 3D scene could not load. Please retry, or use a browser with WebGL enabled.', retry: 'Try again',
  credit: '3D model by Karol Miklas / Lionsharp Studios', license: 'CC BY 4.0 · Optimized textures and animated doors',
};
export const porscheCopy = {
  en,
  zh: {
    name: '保时捷车库', description: '近距离看看经典的 911 Turbo。转一转车身，打开车门，再换个喜欢的车漆颜色。',
    hint: '拖动旋转 · 滚轮或双指缩放 · 点击车门开关',
    canvasLabel: '可互动的 3D 保时捷 911。拖动旋转、滚轮缩放，或使用下方按钮。方向键可以旋转视角。',
    leftDoor: '左侧车门', rightDoor: '右侧车门', reset: '重置视角', autoRotate: '自动旋转', paint: '车漆',
    colors: ['赛车黄', '卫红', '银色', '午夜蓝'], loading: '正在把 911 开进车库…', ready: '可以开始体验了', opened: '车门已打开', closed: '车门已关闭',
    error: '3D 场景未能加载，请重试或使用开启 WebGL 的浏览器。', retry: '重试',
    credit: '3D 模型：Karol Miklas / Lionsharp Studios', license: 'CC BY 4.0 · 贴图已优化，并添加车门动画',
  },
  ja: {
    name: 'ポルシェガレージ', description: 'クラシックな 911 Turbo を間近で。車を回して、ドアを開けて、好きな色に変えてみましょう。',
    hint: 'ドラッグで回転 · スクロールやピンチで拡大 · ドアをクリックして開閉',
    canvasLabel: '3D ポルシェ 911。ドラッグで回転、スクロールで拡大。下のボタンや矢印キーでも操作できます。',
    leftDoor: '左ドア', rightDoor: '右ドア', reset: '視点をリセット', autoRotate: '自動回転', paint: 'ボディカラー',
    colors: ['レーシングイエロー', 'ガーズレッド', 'シルバー', 'ミッドナイトブルー'], loading: '911 をガレージへ…', ready: '準備できました', opened: 'ドアを開きました', closed: 'ドアを閉じました',
    error: '3D シーンを読み込めませんでした。再試行するか、WebGL 対応のブラウザをご利用ください。', retry: '再試行',
    credit: '3D モデル：Karol Miklas / Lionsharp Studios', license: 'CC BY 4.0 · テクスチャを最適化、ドアのアニメーションを追加',
  },
} satisfies Record<Locale, typeof en>;
export type PorscheCopy = typeof en;
