import type { Locale } from './i18n';

export interface PortfolioCopy {
  eyebrow: string; titleLines: [string, string]; tagline: string; description: string; portraitAlt: string;
  aboutTitle: string; paragraphs: string[]; educationTitle: string;
  education: { school: string; degree: string; detail: string }[];
  exploreTitle: string; explorations: { title: string; text: string }[];
  lifeTitle: string; interests: { title: string; text: string }[];
  contactTitle: string; back: string;
}

export const portfolio = {
  "zh": {
    "eyebrow": "关于我",
    "titleLines": [
      "你好呀，",
      "我是 JoeyDDong。"
    ],
    "tagline": "平时写代码，闲暇时拍照。",
    "description": "JoeyDDong，数据科学家，主要使用 C++ 和 Python，也练习算法。这里有教育背景、摄影与学习记录。",
    "portraitAlt": "JoeyDDong 在户外举起相机拍摄。",
    "aboutTitle": "关于我",
    "paragraphs": [
      "我来自中国，目前是一名数据科学家。本科在哈尔滨工业大学读机械设计制造及其自动化，后来在京都大学读了系统科学硕士。",
      "最近主要使用 C++ 和 Python，也还在练习算法。除了编程，我喜欢在闲暇时出去走走，带着相机拍些风景。走在大街小巷里，边走边拍，对我来说很解压。",
      "这个网站用来整理我的项目、学习记录和照片。博客里也会留下一些学习笔记和生活中的事情。"
    ],
    "educationTitle": "教育背景",
    "education": [
      {
        "school": "哈尔滨工业大学",
        "degree": "本科",
        "detail": "机电工程学院 · 机械设计制造及其自动化"
      },
      {
        "school": "京都大学",
        "degree": "硕士",
        "detail": "情报学研究科 · 系统科学"
      }
    ],
    "exploreTitle": "编程与工作",
    "explorations": [
      {
        "title": "编程",
        "text": "最近主要使用 C++ 和 Python。"
      },
      {
        "title": "数据科学",
        "text": "目前作为数据科学家工作。"
      },
      {
        "title": "算法",
        "text": "现在还在练习算法，也用过 AtCoder 和 AcWing 学习。"
      }
    ],
    "lifeTitle": "摄影与写作",
    "interests": [
      {
        "title": "摄影",
        "text": "喜欢在闲暇时走走大街小巷，拍一些风景照。没有特别复杂的理由，就是觉得这样很解压。"
      },
      {
        "title": "写作",
        "text": "用博客记录学习笔记，也记一些生活中的事情。"
      }
    ],
    "contactTitle": "联系我",
    "back": "返回首页"
  },
  "en": {
    "eyebrow": "ABOUT ME",
    "titleLines": [
      "Hello，",
      "I’m JoeyDDong."
    ],
    "tagline": "I write code and take photos in my spare time.",
    "description": "JoeyDDong is a data scientist who mainly uses C++ and Python and still practices algorithms. Education, photography, and learning notes.",
    "portraitAlt": "JoeyDDong taking a photograph outdoors.",
    "aboutTitle": "About Me",
    "paragraphs": [
      "I’m from China and currently work as a data scientist. I studied Mechanical Design, Manufacturing and Automation at Harbin Institute of Technology, then earned a master’s degree in Systems Science at Kyoto University.",
      "These days, I mainly use C++ and Python, and I still practice algorithms. Outside of programming, I like going for walks with my camera and taking landscape photos. Wandering through streets and alleyways, taking pictures along the way, helps me unwind.",
      "This website is a place for my projects, learning notes, and photos. I also use the blog to keep notes on what I learn and write about everyday life."
    ],
    "educationTitle": "Education",
    "education": [
      {
        "school": "Harbin Institute of Technology",
        "degree": "Bachelor’s degree",
        "detail": "School of Mechatronics Engineering · Mechanical Design, Manufacturing and Automation"
      },
      {
        "school": "Kyoto University",
        "degree": "Master’s degree",
        "detail": "Graduate School of Informatics · Systems Science"
      }
    ],
    "exploreTitle": "Programming and Work",
    "explorations": [
      {
        "title": "Programming",
        "text": "I mainly use C++ and Python these days."
      },
      {
        "title": "Data Science",
        "text": "I currently work as a data scientist."
      },
      {
        "title": "Algorithms",
        "text": "I still practice algorithms and have used AtCoder and AcWing to study."
      }
    ],
    "lifeTitle": "Photography and Writing",
    "interests": [
      {
        "title": "Photography",
        "text": "I like wandering through streets and alleyways in my spare time, taking landscape photos. There’s no grand reason behind it—I just find it relaxing."
      },
      {
        "title": "Writing",
        "text": "I use the blog to keep learning notes and write about everyday life."
      }
    ],
    "contactTitle": "Contact",
    "back": "Back to Home"
  },
  "ja": {
    "eyebrow": "自己紹介",
    "titleLines": [
      "こんにちは、",
      "JoeyDDong です。"
    ],
    "tagline": "普段はコードを書き、時間があるときは写真を撮っています。",
    "description": "データサイエンティストとして働く JoeyDDong の自己紹介。C++ と Python、アルゴリズム、学歴、写真、学習メモについて。",
    "portraitAlt": "屋外でカメラを構えて撮影する JoeyDDong。",
    "aboutTitle": "自己紹介",
    "paragraphs": [
      "中国出身で、現在はデータサイエンティストとして働いています。ハルビン工業大学で機械設計・製造および自動化を学び、その後、京都大学でシステム科学の修士号を取得しました。",
      "最近は主に C++ と Python を使っていて、アルゴリズムの練習も続けています。プログラミングのほかには、時間があるときにカメラを持って散歩し、風景を撮るのが好きです。街や路地を歩きながら写真を撮ることが、いい気分転換になっています。",
      "このサイトには、自分のプロジェクトや学習メモ、写真をまとめています。ブログには、勉強したことや日常の出来事も書き留めています。"
    ],
    "educationTitle": "学歴",
    "education": [
      {
        "school": "ハルビン工業大学",
        "degree": "学士",
        "detail": "機電工程学院 · 機械設計・製造および自動化"
      },
      {
        "school": "京都大学",
        "degree": "修士",
        "detail": "大学院情報学研究科 · システム科学"
      }
    ],
    "exploreTitle": "プログラミングと仕事",
    "explorations": [
      {
        "title": "プログラミング",
        "text": "最近は主に C++ と Python を使っています。"
      },
      {
        "title": "データサイエンス",
        "text": "現在はデータサイエンティストとして働いています。"
      },
      {
        "title": "アルゴリズム",
        "text": "今も練習を続けています。AtCoder や AcWing でも学んできました。"
      }
    ],
    "lifeTitle": "写真と文章",
    "interests": [
      {
        "title": "写真",
        "text": "時間があるときに街や路地を歩いて、風景を撮るのが好きです。特別な理由があるわけではなく、単純にいい気分転換になるからです。"
      },
      {
        "title": "文章",
        "text": "ブログに学習メモや日常の出来事を書き留めています。"
      }
    ],
    "contactTitle": "連絡先",
    "back": "ホームへ戻る"
  }
} satisfies Record<Locale, PortfolioCopy>;
