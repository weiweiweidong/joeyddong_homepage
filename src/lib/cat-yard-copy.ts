import type { Locale } from './i18n';
const en = {
  name: 'A Cat in the Yard', description: 'A little cat with a yard of its own. Watch it wander, cuddle its yarn, chase a ball, and stop for a snack.',
  hint: 'Move to invite the cat · Click the cat to pet it · Drag the toys',
  sceneLabel: 'Interactive cat yard. Click the ground to guide the cat, drag toys, or use the buttons below.',
  call: 'Come here', feed: 'Fill the bowl', yarn: 'Play with yarn', ball: 'Play ball', pause: 'Pause', play: 'Play', food: 'Food',
  yarnLabel: 'Yarn ball: click to play, or drag', ballLabel: 'Ball: click to play, or drag', bowlLabel: 'Food bowl: click to fill and feed', catLabel: 'Pet the cat',
  statuses: { idle: 'Enjoying the sunshine', walk: 'Taking a little walk', follow: 'Coming to say hello', yarn: 'Mine! Cuddling the yarn', ball: 'Chasing the ball', eat: 'Snack time', pet: 'Purr… that feels nice', empty: 'The bowl is empty', paused: 'Taking a break' },
};
export const catYardCopy = {
  en,
  zh: {
    name: '小猫的院子', description: '一只小猫，一个小院子。看它散步、抱着毛线团玩、追球，玩累了再吃点猫粮。',
    hint: '移动鼠标叫小猫过来 · 点击小猫摸摸它 · 可以拖动玩具',
    sceneLabel: '可互动的小猫院子。点击地面让小猫走过去，拖动玩具，或使用下方按钮。',
    call: '叫它过来', feed: '添猫粮', yarn: '玩毛线团', ball: '玩球', pause: '暂停', play: '继续', food: '猫粮',
    yarnLabel: '毛线团：点击让小猫玩，或拖动', ballLabel: '球：点击让小猫玩，或拖动', bowlLabel: '猫粮碗：点击添粮并喂猫', catLabel: '摸摸小猫',
    statuses: { idle: '晒晒太阳，发会儿呆', walk: '在院子里溜达', follow: '来看看你在干什么', yarn: '抱住毛线团，不撒手！', ball: '追着球跑', eat: '开饭啦', pet: '呼噜呼噜，舒服～', empty: '碗空啦，添点猫粮吧', paused: '休息一会儿' },
  },
  ja: {
    name: '猫の小さな庭', description: '小さな猫と、小さな庭。散歩して、毛糸玉を抱え、ボールを追いかけて、疲れたらごはん。',
    hint: 'カーソルで猫を呼ぶ · 猫をクリックしてなでる · おもちゃはドラッグできます',
    sceneLabel: '猫と遊べる庭。地面をクリックして猫を誘導したり、おもちゃをドラッグしたり、下のボタンを使えます。',
    call: 'おいで', feed: 'ごはんを補充', yarn: '毛糸玉で遊ぶ', ball: 'ボールで遊ぶ', pause: '停止', play: '再開', food: 'ごはん',
    yarnLabel: '毛糸玉：クリックで遊ぶ、またはドラッグ', ballLabel: 'ボール：クリックで遊ぶ、またはドラッグ', bowlLabel: 'ごはん皿：クリックで補充して食べる', catLabel: '猫をなでる',
    statuses: { idle: '日なたでのんびり', walk: '庭をお散歩', follow: '何してるの？', yarn: '毛糸玉をぎゅっと！', ball: 'ボールを追いかける', eat: 'ごはんの時間', pet: 'ごろごろ、気持ちいい', empty: 'ごはん皿が空っぽ', paused: 'ちょっと休憩' },
  },
} satisfies Record<Locale, typeof en>;
export type CatYardCopy = typeof en;
