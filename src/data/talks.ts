// 講座・LT の資料一覧
// 新しい登壇を追加するときは、この配列の先頭に1件足す（上にあるものほど新しい）。
//
// - image:     public/ 配下の写真のパス（例: /assets/images/xxx.png）
// - materials: 資料へのリンク。PDF は public/slides/ に置いて '/slides/xxx.pdf' と書く。
//              Notion は公開ページの URL をそのまま書く。
//              空配列のままだとカードに「資料準備中」と表示される。

export type TalkMaterial = {
  type: 'pdf' | 'notion';
  url: string;
  label?: string; // 省略時は「PDF」「Notion」
};

export type Talk = {
  slug: string;
  title: string;
  tags: string[];
  image?: string;
  materials: TalkMaterial[];
};

export const talks: Talk[] = [
  {
    slug: 'kmp-handson',
    title: 'KMPハンズオン',
    tags: ['Kotlin', 'KMP', 'ハンズオン'],
    image: '/assets/images/talks/kmp-handson.jpg',
    materials: [{ type: 'pdf', url: '/slides/kmp-handson.pdf' }],
  },
  {
    slug: 'flutter-ui',
    title: 'FlutterUI講座',
    tags: ['Flutter', 'UI', 'Widgetbook', '講座'],
    image: '/assets/images/talks/flutter-ui.jpg',
    materials: [{ type: 'pdf', url: '/slides/flutter-ui.pdf' }],
  },
  {
    slug: 'hackathon-strategy',
    title: 'ハッカソンでの戦い方',
    tags: ['ハッカソン', 'LT'],
    image: '/assets/images/talks/hackathon-strategy.jpg',
    materials: [{ type: 'pdf', url: '/slides/hackathon-strategy.pdf' }],
  },
  {
    slug: 'internship-learnings',
    title: 'インターンで感じたこと',
    tags: ['インターン', 'LT'],
    image: '/assets/images/talks/internship-learnings.jpg',
    materials: [{ type: 'pdf', url: '/slides/internship-learnings.pdf' }],
  },
  {
    slug: 'self-introduction',
    title: '自己紹介スライド',
    tags: ['自己紹介'],
    image: '/assets/images/talks/self-introduction.jpg',
    materials: [{ type: 'pdf', url: '/slides/self-introduction.pdf' }],
  },
  {
    slug: 'ai-dlc-handson',
    title: 'dipさんとのAI-DLCハンズオン',
    tags: ['AI', 'AI-DLC', 'ハンズオン'],
    image: '/assets/images/dip1.jpg',
    materials: [],
  },
  {
    slug: 'flutter-web-handson',
    title: 'Flutter webのハンズオン講座',
    tags: ['Flutter', 'Flutter Web', 'ハンズオン'],
    image: '/assets/images/flutterweb.png',
    materials: [{ type: 'pdf', url: '/slides/flutter-web.pdf' }],
  },
  {
    slug: 'flutter-intro-liquid-glass',
    title: 'Flutterの入門＋Liquid glass講座',
    tags: ['Flutter', 'Liquid Glass', '講座'],
    image: '/assets/images/Flutterliquid.png',
    materials: [
      {
        type: 'notion',
        url: 'https://app.notion.com/p/Flutter-Liquid-Grass-2ea430c9c406808d9689e2ebca3647fd',
      },
    ],
  },
  {
    slug: 'dip-lt',
    title: '株式会社dipさんとのLT会',
    tags: ['LT'],
    image: '/assets/images/dip.jpg',
    materials: [],
  },
  {
    slug: 'riverpod-handson',
    title: 'RiverPodのハンズオン講座',
    tags: ['Flutter', 'Riverpod', 'ハンズオン'],
    image: '/assets/images/kouenn.png',
    materials: [
      {
        type: 'notion',
        url: 'https://app.notion.com/p/RiverPod-26a430c9c40680e7846fedc5c13c83a1',
      },
    ],
  },
];
