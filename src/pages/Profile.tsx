import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Code, Briefcase, Circle, Trophy, Building2, ArrowRight, X } from 'lucide-react';

type Tag = 'ハッカソン' | 'サークル' | 'イベント' | '個人開発' | '講座・登壇' | 'インターン';

const allTags: Tag[] = ['ハッカソン', 'サークル', 'イベント', '個人開発', '講座・登壇', 'インターン'];

type Experience = {
  id: number;
  title: string;
  subtitle?: string;
  institution?: string;
  period: string;
  description: string;
  icon: JSX.Element;
  image?: string;
  link?: string;
  tags: Tag[];
};

type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner';

type Skill = {
  name: string;
  image?: string;
  level: SkillLevel;
};

const skills: Skill[] = [
  { name: 'Flutter',     image: '/assets/images/flutter.png', level: 'Advanced' },
  { name: 'Dart',        image: '/assets/images/dart.png',    level: 'Advanced' },
  { name: 'Swift',       image: '/assets/images/swift.png',   level: 'Intermediate' },
  { name: 'Kotlin',      image: '/assets/images/kotlin.jpeg',  level: 'Intermediate' },
  { name: 'Next.js',     image: '/assets/images/next.png',    level: 'Intermediate' },
  { name: 'React',                                            level: 'Intermediate' },
  { name: 'TypeScript',  image: '/assets/images/ts.png',      level: 'Intermediate' },
  { name: 'GitHub',      image: '/assets/images/github.jpg',  level: 'Intermediate' },
  { name: 'Unity',                                            level: 'Beginner' },
  { name: 'C#',                                               level: 'Beginner' },
  { name: 'Docker',      image: '/assets/images/docker.jpeg',  level: 'Beginner' },
  { name: 'Python',                                           level: 'Beginner' },
  { name: 'Go',          image: '/assets/images/go.png',      level: 'Beginner' },
];

const levelConfig: Record<SkillLevel, { label: string; className: string }> = {
  Advanced:     { label: 'Advanced',     className: 'bg-[var(--color-accent)] text-white' },
  Intermediate: { label: 'Intermediate', className: 'bg-blue-500 text-white' },
  Beginner:     { label: 'Beginner',     className: 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]' },
};

type Internship = {
  company: string;
  period: string;
  role: string;
  description: string;
  technologies: string[];
  image?: string;
  // ↓ 詳細（モーダルに表示。埋めた会社だけ「詳細を見る」が出る）
  detail?: {
    overview?: string;        // どんなインターンか
    challenge?: string;       // 課題・お題
    work?: string[];          // やったこと（箇条書き）
    techReason?: string;      // 技術選定の理由
    outcome?: string;         // 成果（受賞・数値・完成物）
    learned?: string;         // 学んだこと
    links?: { label: string; url: string }[];
  };
};

const internships: Internship[] = [
  {
    company: '株式会社サイバーエージェント',
    period: '2026年3月',
    role: 'CA Tech Dojo - Android エンジニア（1week インターン）',
    description: 'Android開発をテーマに、1週間で1人でアプリを開発・リリースできるようになることを目指す育成型インターン。設計を第一に据え、AIを活用した開発スタイルを実践し、最優秀賞を獲得。',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Qiita API', 'Gemini API'],
    image: '/assets/images/cainternandroid.png',
    detail: {
      overview:
        'サイバーエージェント主催の学生向け育成型インターン。「Android開発をテーマに、1週間でアプリ開発の基礎スキルを身につける」ことが目的で、全体ゴールは「1人でアプリを開発しリリースできるようになる」こと。',
      challenge:
        'お題は「コンテンツポータルアプリ」。ここから、技術記事の「読んだつもり」をなくす“理解完了アプリ”を企画・開発した。',
      work: [
        'ポータル画面：Qiita API からトレンド記事を取得して一覧表示',
        '積読リスト画面：Gemini API で記事を要約し、積んだ記事を管理',
        '消化フロー：AI が記事内容に即した問いを生成し、理解度をチェック',
        '完了リスト画面：消化し切った記事を蓄積',
        'データ管理は Room + Repository 層、状態管理は Flow、ViewModel 中心のアーキテクチャで構築',
      ],
      techReason:
        '「設計を第一に考える」方針で、公式のベストプラクティスを参考にアーキテクチャを構築。AI活用では「テスト駆動AI開発」「仕様駆動開発」を取り入れ、AIに任せる部分と自分が責任を持つ部分を明確に分けて進めた。',
      outcome: '参加者の中で最優秀賞を獲得。',
      learned:
        'ネイティブアプリ開発ならではの考え方や設計を学べた。Figma MCP を使ったUI開発では開発のスピードと精度が大きく変わる可能性を感じ、AIを活用したこれからの開発スタイルを考える良いきっかけになった。',
      links: [
        {
          label: '参加記（Qiita）',
          url: 'https://qiita.com/oto1720/items/910598fe80cf49739317',
        },
      ],
    },
  },
  {
    company: 'TrueNest',
    period: '2026年4-7月',
    role: '兄の会社の業務委託（サイトのシステム作り）',
    description: 'レンタルスペース事業を行う兄の会社でのレンタルスペースの予約サイトのシステム作りを行った。要件定義、設計、実装、テスト、デプロイ、運用までを担当。',
    technologies: ['React', 'TypeScript', 'echo', 'Go','PostgreSQL','Neon', 'Docker', 'Cloud Run'],
    image: '/assets/images/truenest.png',
    detail: {
      overview:
        'レンタルスペース事業を営む兄の会社から業務委託を受け、予約サイトを個人で一気通貫で開発。要件定義から運用までを一人で担当した。',
      challenge:
        '実際に事業で使う予約システムを、実運用に耐える品質・コストで構築する必要があった。空き状況の管理や予約フローの整合性が要件の中心。',
      work: [
        '事業側とヒアリングして要件定義・画面設計を実施',
        'フロントを React + TypeScript、バックエンドを Go（echo）で REST API として実装',
        'PostgreSQL（Neon）でデータ設計、予約・空き状況を管理',
        'Docker でコンテナ化し、Cloud Run にデプロイして運用まで担当',
      ],
      techReason:
        'Go（echo）は軽量で起動が速く Cloud Run のスケール・課金と相性が良いため採用。DB はサーバーレスでコストを抑えられる Neon を選び、個人運用でも管理負荷を最小化した。',
      // TODO: 稼働実績・予約件数・工数削減など、あれば数値を追記してください
      outcome: '要件定義から実装・デプロイ・運用まで一人で完了し、実事業で稼働するシステムを構築した。',
      learned:
        '個人で全工程を担うことで、技術選定をコスト・運用まで含めて判断する力がついた。事業要件を仕様に落とし込む難しさも学んだ。',
    },
  },
  {
    company: '株式会社サイバーエージェント',
    period: '2026年8月',
    role: 'CA Job Lite - Flutter エンジニア（2week インターン）',
    description: '大規模プロダクト開発チームに2週間配属され、実務のアジャイル開発フローで機能開発を担当。実務と学生開発の差を1日1個ずつ言語化し、成長の道標を持ち帰った。',
    technologies: ['Flutter', 'Dart', 'Riverpod', 'flutter_hooks', 'Freezed', 'Melos'],
    image: '/assets/images/cainternflutter.png',
    detail: {
      overview:
        '現場の大規模プロダクト開発チームに2週間配属される実務型インターン。実際のアジャイル開発フロー（チケット → Draft PR → CI・VRT → 多視点レビュー → マージ＝リリース）に入って機能開発を担当した。目標は「実務と自分の経験の差を1日1個探し、成長の道標を3つ立てて持ち帰る」こと。',
      challenge:
        '既存の大規模プロダクトを理解した上で、実運用の品質基準（小さい単位のPR・多視点レビュー・自動テスト / VRT）に沿って機能を実装しきること。',
      work: [
        '機能追加のPRを複数出し、うち一つをレビュー往復を経てマージ・リリースまで到達させた',
        '影響範囲の大きい共通基盤には手を入れず機能側で実装するなど、影響範囲を意識した設計判断を行った',
        'APIのデータを表示用のモデルに再構成し、UI層に結合ロジックを散らさない設計にした',
        '分岐ロジックを enum に集約してユニットテストを追加するなど、判断ロジックを一箇所にまとめた',
        'Feature Flag を前提に、段階的リリース・切り戻しを織り込んで実装した',
      ],
      techReason:
        '状態管理は Riverpod + flutter_hooks、モデルは Freezed、モノレポ管理は Melos。「動く」は前提として「なぜこの形にしたか」を説明できる状態を重視して設計した。',
      outcome:
        '複数のPRを出し、人間とAIによる多視点レビューの往復を経て一つをマージ・リリースまで到達。実務と学生開発の差を12個言語化し、成長の道標を3本立てて持ち帰った。',
      learned:
        '一番の学びは「実装はタスクの一部でしかない」こと。要件の背景理解・レビュー往復・将来の変更（Feature Flag / Legacy 切り）まで含めて見積もる必要があると実感した。また、判断を記録に残す（design doc・PR説明・コミット）のは丁寧さではなく、自分がいなくても引き継げるための成立要件だと学んだ。2週間の見積もりの甘さも痛感し、限られた期間で何を学ぶかを最優先に据えるシフトチェンジの重要性に気づいた。',
    },
  },
  {
    company: '株式会社MIXI',
    period: '2026年9-10月',
    role: 'Dive into MIXI インターン androidエンジニア',
    description: '',
    technologies: ['Android'],
    image: '/assets/images/mixi.webp',
  }
  
];

type Award = {
  event: string;
  prize: string;
};

const awards: Award[] = [
  { event: 'サイバーエージェント主催 内製化ハッカソン', prize: '最優秀賞' },
  { event: 'サイバーエージェント CA Tech Dojo 1week Android インターン', prize: '最優秀賞' },
  { event: '技育キャンプ vol17', prize: '優秀賞' },
  { event: 'チャレキャラ2025', prize: 'サイバーエージェント賞' },
  { event: 'サイバーエージェントとのハッカソン', prize: '優秀賞' },
  { event: 'ハックツハッカソン', prize: 'WingArc1st賞' },
  { event: '技育ハッカソン', prize: '参加賞' },
  { event: 'DDDハッカソン', prize: 'サイバーエージェント賞' },
];

const experiences: Experience[] = [
  {
    id: 1,
    title: '福岡大学入学',
    period: '2024 4月',
    description: '福岡大学-工学部-電子情報工学科',
    icon: <Circle size={20} />,
    tags: ['サークル'],
  },
  {
    id: 2,
    title: '福大ピアプロ入部',
    period: '2024  4月',
    description: '福岡大学のプログラミングサークル、ピアプロに入部',
    icon: <Circle size={20} />,
    tags: ['サークル'],
  },
  {
    id: 3,
    title: '作るっちゃんのメンバーになる',
    period: '2024 5月',
    description: '九州の学生対象とした、ゲーム制作コミュニティーのメンバーになる',
    icon: <Circle size={20} />,
    tags: ['サークル'],
  },
  {
    id: 4,
    title: 'チャレキャラ参加',
    period: '2024 6月',
    description: '九州の学生を対象とした、アプリの開発を行うコンテストに参加',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 5,
    title: '初めてのゲームジャムに参加',
    image: '/assets/images/gejam1.JPG',
    period: '2024 8月',
    description: '福岡の学生を対象とした、ゲーム制作を行うジャムに参加',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 6,
    title: '作るっちゃんの運営になる',
    period: '2024 10月',
    description: 'ゲーム制作コミュニティーの運営に携わる',
    icon: <Circle size={20} />,
    tags: ['サークル'],
  },
  {
    id: 7,
    title: 'チャレキャラの発表',
    image: '/assets/images/tyarekyara.JPG',
    period: '2024 12月',
    description: '遊びと学びを題材にしたマッチングアプリの発表を行なった',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 8,
    title: '２回目のゲームジャム参加',
    period: '2025 2月',
    image: '/assets/images/gejam2.JPG',
    description: '２回目となるゲームジャムに参加し、プログラムリーダーを務める',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 9,
    title: 'つくると参加',
    image: '/assets/images/tukuruto.jpg',
    period: '2025 2月',
    description: '工学系のイベントで、制作物を展示（チャレキャラで作成した作品を発表）',
    icon: <Circle size={20} />,
    tags: ['イベント'],
  },
  {
    id: 10,
    title: '技育ハッカソン参加',
    period: '2025 4月',
    description: '初めてのハッカソンに参加。チームで賞を受賞（フロントエンドを担当）',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 12,
    title: 'アプリをリリース',
    image: '/assets/images/neatify.png',
    link: 'https://apps.apple.com/jp/app/neatify/id6746064755',
    period: '2025 5月',
    description: '個人開発を行っていた、部屋掃除管理アプリをリリース',
    icon: <Circle size={20} />,
    tags: ['個人開発'],
  },
  {
    id: 13,
    title: 'ハックツハッカソン',
    image: '/assets/images/hakkaso.jpeg',
    period: '2025 6月',
    description: 'aiを使った作品でWingArc1st賞を獲得。（フロントエンドを担当）',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 14,
    title: 'CyberAgentさんのMCPについて講演参加',
    period: '2025 7月',
    description: 'CA.ai MCPについての勉強会に参加',
    icon: <Circle size={20} />,
    tags: ['イベント'],
  },
  {
    id: 15,
    title: 'CyberAgentさんとサークルのイベントを主催',
    image: '/assets/images/cahakkaso.PNG',
    period: '2025 8月',
    description: '人のプロダクトをブラッシュアップするハッカソンイベントを主催(優秀賞獲得）',
    icon: <Circle size={20} />,
    tags: ['イベント', 'サークル'],
  },
  {
    id: 16,
    title: '学生展示会CPQの運営、開催',
    image: '/assets/images/CPQ.jpg',
    period: '2025 8月',
    description: '学生団体対象とした展示会の運営を行った。所属サークルも展示',
    icon: <Circle size={20} />,
    tags: ['イベント'],
  },
  {
    id: 17,
    title: 'サークル代表就任',
    period: '2025 9月',
    description: '所属サークル、福大ピアプロの代表に就任',
    icon: <Circle size={20} />,
    tags: ['サークル'],
  },
  {
    id: 18,
    title: '学生団体交流会参加',
    image: '/assets/images/giiku.jpg',
    period: '2025 10月',
    description: '全国のエンジニア学生団体と交流',
    icon: <Circle size={20} />,
    tags: ['イベント'],
  },
  {
    id: 19,
    title: 'RiverPodの講座を開く',
    image: '/assets/images/kouenn.png',
    period: '2025 10月',
    description: 'エンジニアカフェでRiverPodについてのハンズオン講座を開いた',
    icon: <Circle size={20} />,
    tags: ['講座・登壇'],
  },
  {
    id: 20,
    title: 'Flutterkaigi2025に参加',
    image: '/assets/images/flutterkaigi.jpg',
    period: '2025 10月',
    description: 'Flutterのカンファレンスに参加',
    icon: <Circle size={20} />,
    tags: ['イベント'],
  },
  {
    id: 21,
    title: 'チャレキャラ2025に参加',
    image: '/assets/images/tyarekyara2.jpg',
    period: '2025 12月',
    description: 'チャレキャラ2025に参加し、企業賞を獲得',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 22,
    title: '株式会社dipさんとのLT会を主催',
    image: '/assets/images/dip.jpg',
    period: '2025 12月',
    description: '株式会社dipさんとのLT会を主催',
    icon: <Circle size={20} />,
    tags: ['イベント'],
  },
  {
    id: 23,
    title: '技育キャンプvol17に参加',
    image: '/assets/images/giiku.png',
    period: '2026 1月',
    description: 'AIを使ったマッチングアプリを作成し、優秀賞を獲得',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 24,
    title: 'Flutterの入門＋Liquid glass講座を開いた',
    image: '/assets/images/Flutterliquid.png',
    period: '2026 1月',
    description: 'Flutterの環境構築から入門の講座とliquid glassの簡単な講座を3時間開いた',
    icon: <Circle size={20} />,
    tags: ['講座・登壇'],
  },
  {
    id: 25,
    title: 'ハッカソンでTRI-KNOTを作成',
    image: '/assets/images/triknot.png',
    period: '2026 2月',
    description: 'ハッカソンで3人1組の連帯責任で「サボり」を防ぐ、運動習慣化監視アプリを作成した',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 26,
    title: 'ハッカソンでPatiPuro.vscodeを作成',
    image: '/assets/images/pati.jpg',
    period: '2026 2月',
    description: 'ハッカソンでvscodeの拡張機能を使ってパチンコができるプロダクトを作成',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 27,
    title: 'CA Tech Dojoに参加(1weekでのandroidアプリ開発インターン）',
    image: '/assets/images/catech.png',
    period: '2026 3月',
    description: 'CA Tech Dojoに参加し、1weekでのandroidアプリ開発インターンを行った。最優秀賞を獲得',
    icon: <Circle size={20} />,
    tags: ['インターン'],
  },
  {
    id: 28,
    title: 'CybarAgentさんとの内製化ハッカソン',
    image: '/assets/images/cyberagent.jpg',
    period: '2026 3月',
    description: 'CyberAgentさんとの内製化ハッカソンに参加し、最優秀賞を獲得',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 29,
    title: 'hack1の一ヶ月ハッカソン',
    image: '/assets/images/hack1.png',
    period: '2026 4月',
    description: '全国でのハッカソンイベントであるhack1の一ヶ月ハッカソンに参加した',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 30,
    title: '三団体合同ハッカソン',
    image: '/assets/images/dddd.jpg',
    period: '2026 5月',
    description: 'DDDハッカソンに参加し、サイバーエージェント賞を獲得',
    icon: <Circle size={20} />,
    tags: ['ハッカソン'],
  },
  {
    id: 31,
    title: 'Flutter webのハンズオン講座開催',
    image: '/assets/images/flutterweb.png',
    period: '2026 5月',
    description: 'Flutter webのハンズオン講座を開催',
    icon: <Circle size={20} />,
    tags: ['講座・登壇'],
  },
  {
    id: 32,
    title: 'dipさんとのAI-DLCハンズオン',
    image: '/assets/images/dip1.jpg',
    period: '2026 6月',
    description: '株式会社dipさんとのAI-DLCのハンズオンを開催',
    icon: <Circle size={20} />,
    tags: ['講座・登壇', 'イベント'],
  }

];

const Profile: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [openIntern, setOpenIntern] = useState<Internship | null>(null);

  // モーダル表示中は背景スクロールを止め、Escで閉じる
  React.useEffect(() => {
    if (!openIntern) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIntern(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [openIntern]);

  const sortedExperiences = useMemo(
    () => experiences.slice().sort((a, b) => b.id - a.id),
    []
  );

  const filteredExperiences = useMemo(
    () => selectedTag
      ? sortedExperiences.filter((e) => e.tags.includes(selectedTag))
      : sortedExperiences,
    [sortedExperiences, selectedTag]
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)]">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-text)]">
              Profile
            </h1>
          </motion.div>

          {/* Skills Section */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3 text-[var(--color-text)]">
              <Code size={24} className="text-[var(--color-accent)]" />
              Skills
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((skill, index) => {
                const { label, className } = levelConfig[skill.level];
                return (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)] transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {skill.image ? (
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="w-12 h-12 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] text-xl font-bold">
                        {skill.name.slice(0, 2)}
                      </div>
                    )}
                    <span className="text-[var(--color-text)] text-xs font-medium text-center leading-tight">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${className}`}>
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Internship Section */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3 text-[var(--color-text)]">
              <Building2 size={24} className="text-[var(--color-accent)]" />
              インターン・業務経験
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internships.map((intern, index) => (
                <motion.div
                  key={index}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  {intern.image && (
                    <img
                      src={intern.image}
                      alt={intern.company}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-semibold text-[var(--color-text)]">
                        {intern.company}
                      </span>
                      <span className="text-xs text-[var(--color-accent)] font-medium">
                        {intern.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
                      {intern.role}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-3">
                      {intern.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {intern.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {intern.detail && (
                      <button
                        onClick={() => setOpenIntern(intern)}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:gap-2 transition-all duration-200"
                      >
                        詳細を見る
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Awards Section */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3 text-[var(--color-text)]">
              <Trophy size={24} className="text-[var(--color-accent)]" />
              実績・受賞歴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  {/* accent bar */}
                  <div className="shrink-0 w-1 rounded-full bg-[var(--color-accent)]" />
                  <div className="flex flex-col justify-between gap-3 min-w-0 flex-1">
                    <span className="text-base font-semibold text-[var(--color-text)] leading-snug">{award.event}</span>
                    <span className="inline-block self-start px-4 py-1.5 text-sm font-bold bg-[var(--color-accent)] text-white rounded-full">
                      {award.prize}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3 text-[var(--color-text)]">
              <Briefcase size={24} className="text-[var(--color-accent)]" />
              経歴紹介
            </h2>

            {/* Tag filter bar */}
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                  selectedTag === null
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
                }`}
              >
                すべて
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-[var(--color-border)]" />

              <AnimatePresence mode="wait">
              <motion.div
                key={selectedTag ?? 'all'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              {filteredExperiences.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0 ? 'md:pr-12 md:ml-auto md:mr-1/2' : 'md:pl-12 md:mr-auto md:ml-1/2'
                  } md:w-1/2`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '200px' }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? 'md:-left-6 left-0' : 'md:-right-6 left-0'
                    } top-0 w-10 h-10 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)]`}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block ml-14 md:ml-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-accent)] transition-all duration-300"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-36 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">{item.title}</h3>
                      {(item.subtitle || item.institution) && (
                        <p className="text-[var(--color-text-muted)] text-sm mt-1">
                          {item.subtitle || item.institution}
                        </p>
                      )}
                      <p className="text-xs text-[var(--color-accent)] mt-1 mb-3 font-medium">{item.period}</p>
                      <p className="text-[var(--color-text)] text-sm">{item.description}</p>
                    </a>
                  ) : (
                    <div className="ml-14 md:ml-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-accent)] transition-all duration-300">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-36 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">{item.title}</h3>
                      {(item.subtitle || item.institution) && (
                        <p className="text-[var(--color-text-muted)] text-sm mt-1">
                          {item.subtitle || item.institution}
                        </p>
                      )}
                      <p className="text-xs text-[var(--color-accent)] mt-1 mb-3 font-medium">{item.period}</p>
                      <p className="text-[var(--color-text)] text-sm">{item.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Internship detail modal */}
      <AnimatePresence>
        {openIntern && openIntern.detail && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenIntern(null)}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative z-10 w-full max-w-2xl my-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => setOpenIntern(null)}
                aria-label="閉じる"
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <X size={18} />
              </button>

              {openIntern.image && (
                <img
                  src={openIntern.image}
                  alt={openIntern.company}
                  className="w-full h-48 md:h-56 object-cover"
                />
              )}

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                    {openIntern.company}
                  </h3>
                  <span className="text-xs text-[var(--color-accent)] font-medium whitespace-nowrap">
                    {openIntern.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--color-text-muted)] mb-5">
                  {openIntern.role}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {openIntern.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-5">
                  {openIntern.detail.overview && (
                    <DetailBlock label="概要" text={openIntern.detail.overview} />
                  )}
                  {openIntern.detail.challenge && (
                    <DetailBlock label="課題・お題" text={openIntern.detail.challenge} />
                  )}
                  {openIntern.detail.work && openIntern.detail.work.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-accent)] mb-2">
                        やったこと
                      </h4>
                      <ul className="space-y-1.5">
                        {openIntern.detail.work.map((w, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-[var(--color-text)] leading-relaxed"
                          >
                            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {openIntern.detail.techReason && (
                    <DetailBlock label="技術選定の理由" text={openIntern.detail.techReason} />
                  )}
                  {openIntern.detail.outcome && (
                    <DetailBlock label="成果" text={openIntern.detail.outcome} />
                  )}
                  {openIntern.detail.learned && (
                    <DetailBlock label="学んだこと" text={openIntern.detail.learned} />
                  )}

                  {openIntern.detail.links && openIntern.detail.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {openIntern.detail.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
                        >
                          {l.label}
                          <ArrowRight size={14} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

const DetailBlock: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div>
    <h4 className="text-sm font-semibold text-[var(--color-accent)] mb-1.5">{label}</h4>
    <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);

export default Profile;
