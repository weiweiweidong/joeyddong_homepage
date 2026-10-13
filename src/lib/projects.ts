import type { Locale } from './i18n';
import { catYardCopy } from './cat-yard-copy';
import { porscheCopy } from './porsche-copy';
import { fadeCopy, fadeTags, fadeExamples } from './fade-py';
const en = {
  title: 'Making things.',
  description: 'Some projects I’ve made: a mix of code I write myself and small demos I try out with vibe coding.',
  codingTitle: 'Coding projects', codingDescription: 'Built by hand, with little to no vibe coding. A place for projects I implement and refine myself.',
  inProgress: 'Work in progress', vibeTitle: 'Vibe coding experiments', vibeDescription: 'Small demos made with vibe coding. Pick a card to open its demo and try it out.',
  cardDescription: 'A sculpture made of light. Attract particles with your cursor and release ripples with a click.',
  openDemo: 'Explore demo', backToProjects: 'All projects',
  name: 'Gravity Garden', badge: 'INTERACTIVE EXPERIMENT',
  about: 'My first vibe coding experiment: a living sculpture made of light. Thousands of particles orbit, bend toward your cursor, and bloom with every click. An idea you can play with, right here.',
  tagsLabel: 'Project technologies', canvasLabel: 'Interactive glowing particle sculpture. Move to attract particles; click or press Enter to release a ripple.',
  hint: 'Move to attract · Click to ripple', touchHint: 'Drag to attract · Tap to ripple',
  pause: 'Pause', play: 'Play', reset: 'Reset', palette: 'Color palette',
  palettes: ['Aurora', 'Ember', 'Cosmic'], fallback: 'This experiment needs a browser with Canvas support.',
};
export const projects = {
  en,
  zh: {
    title: '动手做点东西。',
    description: '这里放一些我动手做的项目，有自己写代码的，也有用 Vibe Coding 试出来的小 Demo。',
    codingTitle: '我的 Coding 项目', codingDescription: '以手动实现为主，基本不使用 Vibe Coding。在这里记录自己编写、打磨的项目。',
    inProgress: '制作中', vibeTitle: 'Vibe Coding 测试', vibeDescription: '展示一些用 Vibe Coding 制作的小 Demo。点击卡片，进入对应的演示页面体验。',
    cardDescription: '用光构成一座空间雕塑。移动鼠标牵引粒子，轻轻一点，释放涟漪。',
    openDemo: '体验 Demo', backToProjects: '所有项目',
    name: '引力花园', badge: '可交互实验',
    about: '我的第一个 Vibe Coding 实验：用光构成一座有生命的雕塑。数千粒子在空间中环绕、向鼠标靠近，又随着每次点击绽放。让一个想法，变成可以亲手体验的作品。',
    tagsLabel: '项目技术', canvasLabel: '发光粒子互动雕塑。移动鼠标牵引粒子，点击或按回车键释放涟漪。',
    hint: '移动鼠标，牵引粒子 · 点击，释放涟漪', touchHint: '滑动，牵引粒子 · 轻触，释放涟漪',
    pause: '暂停', play: '播放', reset: '重置', palette: '配色',
    palettes: ['极光', '余烬', '宇宙'], fallback: '此实验需要支持 Canvas 的浏览器。',
  },
  ja: {
    title: '手を動かして、作ってみる。',
    description: '自分でコードを書いたものや、Vibe Coding で試した小さなデモなど、作ったものをここに載せています。',
    codingTitle: 'Coding プロジェクト', codingDescription: 'Vibe Coding はほとんど使わず、自分で実装し、磨き上げるプロジェクトを集めます。',
    inProgress: '制作中', vibeTitle: 'Vibe Coding の実験', vibeDescription: 'Vibe Coding で作った小さなデモ。カードをクリックして、それぞれのデモを体験してみてください。',
    cardDescription: '光でできた立体彫刻。カーソルで粒子を引き寄せ、クリックで波紋を作ってみてください。',
    openDemo: 'デモを体験', backToProjects: 'すべてのプロジェクト',
    name: '重力の庭', badge: 'インタラクティブ実験',
    about: '初めての Vibe Coding 実験。光でできた、生きているような彫刻です。数千の粒子が巡り、カーソルに引き寄せられ、クリックするたびに花開きます。アイデアを、ここで触れられる作品に。',
    tagsLabel: '使用技術', canvasLabel: '光る粒子の彫刻。カーソルで粒子を引き寄せ、クリックまたは Enter キーで波紋を作れます。',
    hint: '動かして引き寄せる · クリックで波紋', touchHint: 'ドラッグで引き寄せる · タップで波紋',
    pause: '停止', play: '再生', reset: 'リセット', palette: '配色',
    palettes: ['オーロラ', '残り火', '宇宙'], fallback: 'Canvas 対応のブラウザでご覧ください。',
  },
} satisfies Record<Locale, typeof en>;
export type ProjectCopy = typeof en;

export const codingProjects = [
  { id: 'fade-py', page: 'projects/fade-py', tags: fadeTags, content: fadeCopy, preview: fadeExamples.examples[1] },
] as const;

export const projectCatalog = [
  { id: 'gravity-garden', page: 'projects/gravity-garden', category: 'VIBE CODING', label: 'GRAVITY GARDEN / 001', tags: ['Canvas 2D', 'Generative art'], content: {
    en: { name: projects.en.name, description: projects.en.cardDescription },
    zh: { name: projects.zh.name, description: projects.zh.cardDescription },
    ja: { name: projects.ja.name, description: projects.ja.cardDescription },
  } },
  { id: 'cat-yard', page: 'projects/cat-yard', category: 'VIBE CODING', label: 'A LITTLE YARD / 002', tags: ['SVG', 'Interactive playground'], content: catYardCopy },
  { id: 'porsche-garage', page: 'projects/porsche-garage', category: 'VIBE CODING', label: 'PORSCHE GARAGE / 003', tags: ['Three.js', '3D interaction'], content: porscheCopy },
] as const;
