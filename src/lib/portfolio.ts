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
    "titleLines": ["你好呀，", "我是 JoeyDDong。"],
    "tagline": "写代码，也记录生活。在技术与日常之间，保持好奇，持续探索。",
    "description": "JoeyDDong 的个人介绍：教育背景、编程与数据科学探索，以及摄影、写作与终身学习。",
    "portraitAlt": "JoeyDDong 在户外举起相机拍摄。",
    "aboutTitle": "关于我",
    "paragraphs": [
      "我来自中国，曾在京都大学情报学研究科攻读硕士，现已毕业。在京都的学习经历，让我有机会在现代科技与传统文化交织的环境中，感受不同的生活方式，也拓展了看待世界的视角。",
      "我喜欢编程，享受梳理问题、探索逻辑和把想法变成实际作品的过程。代码之外，我也喜欢拿起相机记录生活，用文字整理学习中的收获和对世界的思考。",
      "终身学习是我希望坚持的生活方式。面对未知，我愿意保持开放，在尝试中积累经验，在解决问题的过程中成长。"
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
    "exploreTitle": "探索方向",
    "explorations": [
      {
        "title": "编程与开发",
        "text": "通过代码探索问题，把想法逐步变成可以使用的工具与作品。"
      },
      {
        "title": "AI 辅助开发",
        "text": "探索 AI 如何参与编程与创作，尝试从想法到实现的不同路径。"
      },
      {
        "title": "数据科学",
        "text": "对通过数据理解问题保持兴趣，持续探索数据分析与建模的方法。"
      },
      {
        "title": "算法竞赛",
        "text": "曾通过 AtCoder 和 AcWing 学习算法，享受拆解问题、推敲思路与寻找解法的过程。"
      }
    ],
    "lifeTitle": "生活兴趣与写作",
    "interests": [
      {
        "title": "摄影",
        "text": "作为一名业余摄影爱好者，我喜欢捕捉日常中吸引目光的画面，也拍摄了不少适合作为手机壁纸的照片。摄影让我放慢脚步，留意那些容易被忽略的瞬间。"
      },
      {
        "title": "写作",
        "text": "我喜欢用文字记录学习与生活，整理遇到的问题、留下值得回顾的想法。写作既是记录，也帮助我更清楚地理解自己的思考。"
      }
    ],
    "contactTitle": "联系我",
    "back": "返回首页"
  },
  "en": {
    "eyebrow": "ABOUT ME",
    "titleLines": ["Hello，", "I’m JoeyDDong."],
    "tagline": "Writing code. Capturing life. Staying curious and exploring technology and everyday life.",
    "description": "Meet JoeyDDong: education, programming and data science interests, photography, writing, and lifelong learning.",
    "portraitAlt": "JoeyDDong taking a photograph outdoors.",
    "aboutTitle": "About Me",
    "paragraphs": [
      "I’m from China and have completed a master’s degree at Kyoto University’s Graduate School of Informatics. Studying in Kyoto, where modern technology and traditional culture meet, gave me the opportunity to experience different ways of life and broaden my perspective.",
      "I enjoy programming: making sense of problems, exploring their logic, and turning ideas into something tangible. Beyond code, I like capturing everyday moments through photography and writing about what I learn and how I see the world.",
      "Lifelong learning is a way of life I hope to maintain. When faced with something unfamiliar, I try to stay open, learn through experimentation, and grow by working through problems."
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
        "degree": "Master’s degree, completed",
        "detail": "Graduate School of Informatics · Systems Science"
      }
    ],
    "exploreTitle": "What I Explore",
    "explorations": [
      {
        "title": "Programming and Development",
        "text": "Exploring problems through code and gradually turning ideas into useful tools and projects."
      },
      {
        "title": "AI-Assisted Development",
        "text": "Exploring how AI can support programming and creative work, and trying different paths from idea to implementation."
      },
      {
        "title": "Data Science",
        "text": "Learning how data can help us understand problems, while exploring approaches to analysis and modeling."
      },
      {
        "title": "Competitive Programming",
        "text": "I have studied algorithms through AtCoder and AcWing. I enjoy breaking down problems, refining ideas, and finding solutions."
      }
    ],
    "lifeTitle": "Life Beyond Code",
    "interests": [
      {
        "title": "Photography",
        "text": "As an amateur photography enthusiast, I enjoy capturing scenes that catch my eye in everyday life. I’ve also taken many photos suitable for phone wallpapers. Photography encourages me to slow down and notice moments that might otherwise pass me by."
      },
      {
        "title": "Writing",
        "text": "I like recording what I learn and experience, working through questions in writing, and keeping thoughts worth revisiting. Writing helps me preserve these moments and understand my own thinking more clearly."
      }
    ],
    "contactTitle": "Get in Touch",
    "back": "Back to Home"
  },
  "ja": {
    "eyebrow": "自己紹介",
    "titleLines": ["こんにちは、", "JoeyDDong です。"],
    "tagline": "コードを書き、日々を記録する。技術にも日常にも好奇心を持ち、探求を続けています。",
    "description": "JoeyDDong の自己紹介。学歴、プログラミングとデータサイエンスへの関心、写真、文章、生涯学習について。",
    "portraitAlt": "屋外でカメラを構えて撮影する JoeyDDong。",
    "aboutTitle": "自己紹介",
    "paragraphs": [
      "中国出身で、京都大学大学院情報学研究科の修士課程を修了しました。現代の技術と伝統文化が交わる京都での学生生活を通して、さまざまな暮らし方に触れ、世界を見る視野を広げることができました。",
      "プログラミングが好きで、問題を整理し、その論理を探り、アイデアを形にしていく過程を楽しんでいます。コードを書くほかにも、写真で日常を記録したり、学んだことや世界について考えたことを文章に残したりしています。",
      "生涯学び続ける姿勢を大切にしたいと思っています。未知のことにも柔軟に向き合い、試行錯誤から経験を積み、問題を解決する過程で成長していきたいです。"
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
        "degree": "修士課程修了",
        "detail": "大学院情報学研究科 · システム科学"
      }
    ],
    "exploreTitle": "探求していること",
    "explorations": [
      {
        "title": "プログラミング・開発",
        "text": "コードを通して問題を探り、アイデアを使えるツールや作品へと少しずつ形にしています。"
      },
      {
        "title": "AI を活用した開発",
        "text": "AI がプログラミングや創作をどのように支援できるかを探り、アイデアから実装までのさまざまな方法を試しています。"
      },
      {
        "title": "データサイエンス",
        "text": "データを通して問題を理解することに関心を持ち、分析やモデリングの手法を学び、探求しています。"
      },
      {
        "title": "競技プログラミング",
        "text": "AtCoder や AcWing を通してアルゴリズムを学んできました。問題を分解し、考え方を練り、解法を見つける過程を楽しんでいます。"
      }
    ],
    "lifeTitle": "日常の楽しみと文章",
    "interests": [
      {
        "title": "写真",
        "text": "趣味で写真を撮りながら、日常の中で目に留まった景色や瞬間を記録しています。スマートフォンの壁紙に使える写真も数多く撮ってきました。写真を撮ることで足を止め、見過ごしがちな瞬間に目を向けられるように感じています。"
      },
      {
        "title": "文章",
        "text": "学びや暮らしを文章に残し、出会った疑問を整理したり、振り返りたい考えを書き留めたりすることが好きです。書くことは記録であると同時に、自分の考えをより明確にする助けにもなっています。"
      }
    ],
    "contactTitle": "連絡先",
    "back": "ホームへ戻る"
  }
} satisfies Record<Locale, PortfolioCopy>;
