import type { Locale } from "./i18n";

export const nookTags = ["Angular", "TypeScript", "Three.js"] as const;
export const nookSource = "https://github.com/weiweiweidong/home_simulator";
const en = {
  name: "Nook · A Little Home",
  description:
    "Draw a floor plan, arrange furniture, and shape your own little space in a soft 3D sandbox.",
  featuresTitle: "What you can do",
  featurePlan: "Draw rectangular or polygonal rooms, adjust walls and openings, and check dimensions and floor area.",
  featureScene: "Switch between a 2D plan and a 3D sandbox to arrange furniture, change colors, and explore your layout from different angles.",
  featureEditing: "Try ideas with undo and redo, save manually in your browser, and use touch controls on mobile. The interface supports Chinese, English, and Japanese.",
  purposeTitle: "Why I built it",
  purpose: "Turn a floor plan into a little space you can furnish and look around. It makes trying furniture layouts and understanding spatial relationships more intuitive.",
  learning: "This is also a hands-on project for learning Angular, TypeScript, and 3D development. With AI-assisted development, I explore how 2D geometry, interaction state, and 3D scenes work together to turn an idea into something people can try.",
  instructions:
    "Draw rooms, add furniture, and switch between 2D and 3D. Save your design manually in this browser.",
  frameTitle: "Nook interactive home design workbench",
  loading: "Preparing your little home…",
  failed: "The workbench could not load. Please try again.",
  retry: "Try again",
  source: "View source on GitHub",
};
export type NookCopy = typeof en;
export const nookCopy = {
  en,
  zh: {
    name: "Nook · 理想小屋",
    description: "绘制户型、摆放家具，在柔和的 3D 沙盘中布置自己的小小空间。",
    featuresTitle: "可以做什么",
    featurePlan: "绘制矩形或多边形房间，调整墙体和门窗，查看尺寸与面积。",
    featureScene: "在 2D 户型与 3D 沙盘之间切换，摆放家具、调整颜色，从不同角度观察空间。",
    featureEditing: "支持撤销重做、浏览器本地手动保存和手机触控，界面可在中文、英文、日文之间切换。",
    purposeTitle: "为什么做这个项目",
    purpose: "把平面户型变成可以亲手布置、旋转查看的小小空间，让家具布局和空间搭配的尝试更直观。",
    learning: "这也是我学习 Angular、TypeScript 和 3D 开发的一次实践：结合 AI 辅助开发，探索二维几何、交互状态与三维场景如何协作，把想法做成可以亲手体验的作品。",
    instructions:
      "绘制户型、添加家具、切换 2D/3D；设计需手动保存到当前浏览器。",
    frameTitle: "Nook 可交互家居设计工作台",
    loading: "正在准备你的小小空间…",
    failed: "工作台暂时无法加载，请重试。",
    retry: "重新加载",
    source: "在 GitHub 查看源码",
  },
  ja: {
    name: "Nook · 小さな住まい",
    description:
      "間取りを描き、家具を置いて、やさしい3D空間で自分らしい住まいを作る。",
    featuresTitle: "できること",
    featurePlan: "長方形や多角形の部屋を描き、壁やドア・窓を調整し、寸法と面積を確認できます。",
    featureScene: "2Dの間取りと3D空間を切り替え、家具の配置や色を変えながら、さまざまな角度からレイアウトを眺められます。",
    featureEditing: "元に戻す・やり直す操作、ブラウザーへの手動保存、スマートフォンのタッチ操作に対応。中国語・英語・日本語を切り替えられます。",
    purposeTitle: "このプロジェクトを作った理由",
    purpose: "平面の間取りを、自分で家具を置き、角度を変えて眺められる小さな空間に。家具のレイアウトや空間のつながりを、直感的に試せるようにしました。",
    learning: "Angular、TypeScript、3D開発を学ぶための実践でもあります。AIを活用した開発を通じて、2Dの形状、操作の状態、3Dシーンの連携を探り、アイデアを実際に体験できる作品にしています。",
    instructions:
      "間取りを描き、家具を追加し、2Dと3Dを切り替えられます。デザインはこのブラウザーに手動で保存してください。",
    frameTitle: "Nook インタラクティブな住まいのデザインツール",
    loading: "小さな住まいを準備しています…",
    failed: "デザインツールを読み込めませんでした。もう一度お試しください。",
    retry: "再読み込み",
    source: "GitHubでソースを見る",
  },
} satisfies Record<Locale, NookCopy>;
