import type { Locale } from './i18n';
import sources from './photography-sources.json';
import assets from './photography-assets.json';

// Originals keep the user-provided URLs. Only prepared local previews render in the list.
export const photos = sources.filenames.map((filename, index) => {
  const asset = assets[index];
  const url = sources.baseUrl + filename;
  if (!asset || asset.id !== index + 1 || asset.original !== url) {
    throw new Error(`Missing previews for photo ${index + 1}. Run npm run photography:prepare.`);
  }
  return { id: index + 1, url, width: asset.variants['960'].width, height: asset.variants['960'].height, previews: asset.variants };
});

export function photoSrcset(photo: (typeof photos)[number]) {
  return [photo.previews['320'], photo.previews['640'], photo.previews['960']].map(image => `${image.src} ${image.width}w`).join(', ');
}

export const photography = {
  "en": {
    "loading": "Loading a sharper image…",
    "loadError": "Couldn’t load the larger image. The preview is still available.",
    "retry": "Retry",
    "title": "My Photos",
    "description": "Photographs by JoeyDDong.",
    "intro": "I’m an amateur photography enthusiast, and this is a collection of my photographs. In my spare time, I like walking through streets and alleys with my camera and photographing things I find beautiful. These photos show the world as I see it.",
    "note": "When friends tell me they’re using my photos as phone wallpapers, it makes me really happy. I’d like to share that happiness with you, too.",
    "browse": "Browse the photographs",
    "collection": "Photographs",
    "count": "photographs",
    "hint": "Choose a photograph to view it larger.",
    "photo": "Photograph",
    "view": "View photograph",
    "close": "Close viewer",
    "previous": "Previous photograph",
    "next": "Next photograph",
    "original": "Open original image",
    "quote": "In life, we are passers-by; in photographs, we are collectors of past moments.",
    "back": "Back to Home",
    "welcome": "Thank you for visiting this page.",
    "invitation": "I’d like to show you the world as I see it!"
  },
  "zh": {
    "loading": "高清图加载中…",
    "loadError": "高清图加载失败，仍可查看预览或打开原图。",
    "retry": "重试",
    "title": "我的照片",
    "description": "JoeyDDong 的摄影作品。",
    "intro": "我是一名业余摄影爱好者，这里收录了我的一些摄影作品。闲暇的时候，我喜欢背着相机在街头巷尾走走，拍下生活中那些让我觉得好看的画面。这些照片记录着我眼中的世界。",
    "note": "当朋友们告诉我，他们在用我拍的照片当手机壁纸时，我真的很开心。我也很乐意和屏幕前的你分享这份开心。",
    "browse": "浏览摄影作品",
    "collection": "摄影作品",
    "count": "张照片",
    "hint": "点击照片，放大看一看。",
    "photo": "摄影作品",
    "view": "查看摄影作品",
    "close": "关闭大图",
    "previous": "上一张照片",
    "next": "下一张照片",
    "original": "打开原图",
    "quote": "对于生活，我们是过客；对于照片，我们是过去时光的收藏家。",
    "back": "返回首页",
    "welcome": "谢谢你点进这个页面。",
    "invitation": "我想把我眼中的世界展示给你看！"
  },
  "ja": {
    "loading": "高画質の写真を読み込み中…",
    "loadError": "高画質の写真を読み込めませんでした。プレビューは引き続き見られます。",
    "retry": "再試行",
    "title": "私の写真",
    "description": "JoeyDDong の写真。",
    "intro": "趣味で写真を撮っています。ここには、これまでに撮った写真をいくつか載せています。時間があるときは、カメラを持って街を歩き、きれいだなと思った景色を撮るのが好きです。写真には、私の目に映った世界が残っています。",
    "note": "友だちが「写真をスマホの壁紙にしているよ」と教えてくれると、本当に嬉しくなります。このページを見ているあなたにも、そんな写真を楽しんでもらえたら嬉しいです。",
    "browse": "写真を見る",
    "collection": "写真",
    "count": "枚の写真",
    "hint": "写真を選ぶと、大きく表示できます。",
    "photo": "写真",
    "view": "写真を見る",
    "close": "閉じる",
    "previous": "前の写真",
    "next": "次の写真",
    "original": "元の画像を開く",
    "quote": "人生では、私たちは通りすがりの旅人。写真では、私たちは過ぎ去った時の収集家。",
    "back": "ホームへ戻る",
    "welcome": "このページをご覧いただき、ありがとうございます。",
    "invitation": "私の目に映る世界を、あなたにも見てもらいたいです！"
  }
} satisfies Record<Locale, Record<string, string>>;
