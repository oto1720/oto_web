import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { X, Github, ExternalLink } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  liveDemo: string;
  role?: string[];
  challenges?: string[];
  learnings?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'ドブスニート結婚RTA',
    description: 'ハッカソンで、お題が「起承転結」だったので、人生をテーマにした結婚をするRTAゲームを作成しました。',
    image: '/assets/images/dobusu.png',
    technologies: ['Unity', 'C#', 'github'],
    github: 'https://github.com/oto1720/2025_jyogi',
    liveDemo: 'https://topaz.dev/projects/242cef13b3da449a383e',
    role: ['ゲームデザイン全般', 'UI/UX 設計','チームマネージメント'],
    challenges: ['短い開発時間（数時間）でゲームとして成立させること', '「起承転結」というお題をゲームメカニクスに落とし込む発想','チームでのまとまりを持たせるためにマネージメントを行い、完成まで持っていった'],
    learnings: ['ハッカソンでのスコープ管理の重要性', 'Unity での素早いプロトタイピング手法','チームでのマネージメントの重要性'],
  },
  {
    id: 2,
    title: 'Neatify',
    description: '一人暮らしの部屋の綺麗さをAIが判断し、点数化し共有できるアプリ',
    image: '/assets/images/neatify.png',
    technologies: ['Flutter', 'firebase', 'github', 'OpenAI API'],
    github: 'https://github.com/oto06/room1',
    liveDemo: 'https://apps.apple.com/jp/app/neatify/id6746064755',
    role: ['Flutter フロントエンド', 'OpenAI API との連携実装', 'Firebase 認証・DB 設計'],
    challenges: ['AI による画像評価の精度調整', 'App Store 審査を通すための要件対応'],
    learnings: ['OpenAI Vision API の活用方法', 'App Store 公開フロー', 'Firebase Firestore のデータモデリング'],
  },
  {
    id: 3,
    title: '作るっちゃんのWEBサイト',
    description: '所属しているゲーム制作コミュニティー、作るっちゃんのWEBサイトを作成しました。',
    image: '/assets/images/tukuruttyan.png',
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'supabase', 'Vercel'],
    github: 'https://github.com/oto1720/tukurutyaWeb',
    liveDemo: 'https://tukurutya-web.vercel.app/',
    role: ['フロントエンド設計・実装', 'Supabase を使ったバックエンド構築', 'Vercel へのデプロイ設定'],
    challenges: ['コミュニティメンバーが実際に使えるような管理しやすい構成にすること', 'Next.js App Router への対応'],
    learnings: ['Next.js + Supabase の組み合わせによる実践的な Web 開発', 'TailwindCSS での効率的なスタイリング'],
  },
  {
    id: 4,
    title: 'AIこ',
    description: 'Unity1Weekでのお題で「あい」だったので、AIとあいこを出しつ付けて記録を伸ばすゲームを作成しました。',
    image: '/assets/images/aiko.png',
    technologies: ['Unity', 'C#', 'github'],
    github: 'https://github.com/oto1720/2025_1week_ai',
    liveDemo: 'https://unityroom.com/games/aiko',
  },
  {
    id: 5,
    title: 'もちもちMAKER',
    description: 'ゲームジャムで、チームで作成しました。（プログラマーとして）',
    image: '/assets/images/motimoti.png',
    technologies: ['Unity', 'C#', 'github'],
    github: '',
    liveDemo: 'https://unityroom.com/games/motimotimaker',
    role: ['プログラマーとして物理演算・当たり判定を担当', 'もちもち感を表現する Mesh 変形ロジックの実装'],
    challenges: ['チーム開発での Git を使った作業分担', 'もちもちした見た目の表現を物理ベースで実現すること'],
    learnings: ['チーム開発でのブランチ管理', 'Unity の Physics 2D を活用した表現技術'],
  },
  {
    id: 6,
    title: '買ったらダメよ',
    description: '技育ハッカソンでチームで、買いすぎを防ぐサービスを作成しました。',
    image: '/assets/images/kattaradame.png',
    technologies: ['Flutter', 'Google拡張機能', 'OpenAI API'],
    github: 'https://github.com/kuroda50/2025_giiku_vol2',
    liveDemo: 'assets/movie/Clipchamp_1.mov',
    role: ['Flutter フロントエンド'],
    challenges: ['Google拡張機能との連携実装'],
    learnings: ['Google拡張機能との連携実装'],
  },
  {
    id: 7,
    title: '俺２',
    description: '俺と理想の俺2が会話するアプリ',
    image: '/assets/images/ore2.png',
    technologies: ['Flutter', 'Python', 'Flask', 'OpenAI API'],
    github: 'https://github.com/kuroda50/ai_my',
    liveDemo: 'https://topaz.dev/projects/63b8bd917b65b4f91601',
    role: ['Flutter フロントエンド実装', 'Python/Flask バックエンド API 構築'],
    challenges: [ 'Flutter と Flask の非同期通信の実装'],
    learnings: ['Flask による REST API 設計', 'Flutter の HTTP 通信処理'],
  },
  {
    id: 8,
    title: 'AmazonQCLIのゲーム',
    description: 'AmazonQCLIを使ってゲームを作るとTシャツがもらえるキャンペーンに参加しました',
    image: '/assets/images/amazonqcli.png',
    technologies: ['React', 'Three.js', 'Typescript', 'AmazonQCLI'],
    github: 'https://github.com/oto1720/AmazonQCLI.git',
    liveDemo: 'https://amazon-qcli.vercel.app/',
  },
  {
    id: 9,
    title: '就活戦士',
    description: '就活のためのタスクアプリを作成しました',
    image: '/assets/images/shuukatu.png',
    technologies: ['Flutter', 'RiverPod', 'Github'],
    github: 'https://github.com/9970628/syuukatusensi',
    liveDemo: 'https://amazon-qcli.vercel.app/',
  },
  {
    id: 10,
    title: 'ReadMaker',
    description: '速読用のアプリで文字がパラパラと流れ読書ができるもの',
    image: '/assets/images/readmaker.png',
    technologies: ['Expo', 'React Native', 'Rust', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/oto1720/2025_ReadMaker',
    liveDemo: 'https://www.canva.com/design/DAGwSL5s78M/OcWyrOiquL0TaNtNmirHfw/edit',
    role: ['React Native (Expo) フロントエンド実装', 'Rust バックエンド API 開発', 'Docker を使ったインフラ構築','チームリーダーとしてまとめ上げ'],
    challenges: ['Rust での Web API 開発（初挑戦）', 'Expoでのフロントエンド（初挑戦）','チームでのマネージメントを行い、完成まで持っていった'],
    learnings: ['Rust の基本的な Web 開発パターン', 'Docker Compose を使った複数サービスの管理', 'React Native のアニメーション API'],
  },
  {
    id: 11,
    title: '福大ピアプロのwebサイト',
    description: '福大ピアプロのwebサイトを作成しました',
    image: '/assets/images/hukudai.png',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'GAS'],
    github: 'https://github.com/oto1720/piapuro-web',
    liveDemo: 'https://www.piapuro.net/',
    role: ['フロントエンド設計・実装', 'GAS を使ったスプレッドシート連携', 'デプロイ・ドメイン設定'],
    challenges: ['サークルメンバー全員が使いやすいコンテンツ更新フローの設計', 'GAS と Next.js の連携'],
    learnings: ['GAS を活用した低コストなバックエンド構築', '実際に使われる Web サイトの運用・保守の考え方'],
  },
  {
    id: 12,
    title: 'Critica',
    description: 'エコーチェンバーを壊す多角的思考育成アプリ',
    image: '/assets/images/Critica.png',
    technologies: ['Flutter', 'Firebase', 'GeminiAI'],
    github: '',
    liveDemo: 'https://apps.apple.com/jp/app/critica/id6756059095',
    role: ['Flutter UI/UX 実装', 'Gemini AI を使った反論生成ロジックの設計', 'Firebase Firestore のデータ設計','チームリーダーとしてまとめ上げ'],
    challenges: ['AI が生成する意見の品質管理・フィルタリング', 'App Store の審査（コンテンツポリシー対応）'],
    learnings: ['Gemini API の活用と効果的なプロンプト設計', 'App Store 審査対策のノウハウ', 'UX を意識したインタラクション設計'],
  },
  {
    id: 13,
    title: 'AIを使ったマッチングアプリ(mirr)',
    description: '技育キャンプvol17で作成した、AIを使ったマッチングアプリ',
    image: '/assets/images/giiku.png',
    technologies: ['Flutter', 'Echo(Go)', 'Firebase', 'Swagger', 'GeminiAPI', 'Docker', 'Neon'],
    github: 'https://github.com/hackathon-20260110/app_pub',
    liveDemo: 'https://drive.google.com/file/d/10rYh6ORxTrSG7dzlC-oskU0iFMgFFG68/view',
    role: ['Flutter フロントエンド実装（画面設計・API 連携）','apiの実装', 'Gemini API を使ったマッチングロジックの提案'],
    challenges: ['短期ハッカソン（2日間）でのチーム開発', 'Go（Echo）との API 連携を初めてのメンバーと進めること'],
    learnings: ['Go + Echo による REST API の設計パターン', 'Swagger を使った API ドキュメント管理', 'Docker を使ったマルチサービス開発環境の構築'],
  },
  {
    id: 14,
    title: 'TRI-KNOT',
    description: 'ハッカソンで作成した、3人1組の連帯責任で「サボり」を防ぐ、運動習慣化監視アプリ',
    image: '/assets/images/triknot.png',
    technologies: ['Nest.js', 'TypeScript', 'Go', 'Echo', 'Swagger', 'PostgreSQL', 'Docker', 'Supabase', 'Google Cloud Run'],
    github: 'https://github.com/trihackathon/app',
    liveDemo: 'https://topaz.dev/projects/c0ed034fd5d669809012',
    role: ['バックエンド API 設計・実装（Nest.js / Go）', 'Supabase + PostgreSQL のデータモデリング', 'Google Cloud Run へのデプロイ'],
    challenges: ['Nest.js と Go の 2 言語を組み合わせたアーキテクチャ設計', 'リアルタイムの連帯責任通知ロジックの実装', 'Cloud Run への CI/CD 構築'],
    learnings: ['本格的なバックエンドアーキテクチャ設計の経験', 'Google Cloud Platform の実践的な活用', 'チーム開発での API ドキュメント（Swagger）の重要性'],
  },
  {
    id: 15,
    title: 'PatiPuro.vscode',
    description: 'vscodeの拡張機能を使ってコードを打つとパチンコができるプロダクト',
    image: '/assets/images/patipuro.png',
    technologies: ['vscode', 'React', 'Matter.js', 'Websocket', 'Docker'],
    github: 'https://github.com/guriguri00451/PatiPro',
    liveDemo: 'https://topaz.dev/projects/9182aa2a62d8cc83b5f0',
    role: ['VSCode 拡張機能のイベント検知ロジック実装', 'WebSocket を使ったリアルタイム通信', 'Matter.js による物理演算パチンコ実装'],
    challenges: ['VSCode 拡張機能 API の学習と活用', 'コードタイプイベントを WebSocket でリアルタイムにブラウザへ送信する設計', 'Matter.js の物理演算チューニング'],
    learnings: ['VSCode Extension API の仕組み', 'WebSocket によるリアルタイム双方向通信の実装', 'Matter.js を使ったブラウザ物理演算'],
  },
  
];

type TabKey = 'overview' | 'role' | 'learnings';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('overview');
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const sorted = [...projects].sort((a, b) => b.id - a.id);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] relative">
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
              Portfolio
            </h1>
            <p className="mt-3 text-[var(--color-text-muted)]">制作物一覧</p>
          </motion.div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => openProject(project)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-[var(--color-border)] text-[var(--color-text-muted)] rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={closeProject}
                />

                <motion.div
                  className="relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <button
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors duration-300"
                    onClick={closeProject}
                  >
                    <X size={20} />
                  </button>

                  <div className="relative">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-56 md:h-72 object-cover rounded-t-xl"
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-5">
                      {selectedProject.title}
                    </h2>

                    {/* Tabs */}
                    {(() => {
                      const hasRole = !!(selectedProject.role?.length || selectedProject.challenges?.length);
                      const hasLearnings = !!selectedProject.learnings?.length;
                      const tabs: { key: TabKey; label: string }[] = [
                        { key: 'overview', label: '概要' },
                        ...(hasRole ? [{ key: 'role' as TabKey, label: '担当・取り組み' }] : []),
                        ...(hasLearnings ? [{ key: 'learnings' as TabKey, label: '学んだこと' }] : []),
                      ];

                      return (
                        <>
                          <div className="flex gap-0 border-b border-[var(--color-border)] mb-6">
                            {tabs.map((tab) => (
                              <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                                  activeTab === tab.key
                                    ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                                    : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Tab: 概要 */}
                          {activeTab === 'overview' && (
                            <div>
                              <p className="text-[var(--color-text-muted)] mb-6">
                                {selectedProject.description}
                              </p>

                              <div className="mb-6">
                                <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                                  Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1 text-sm bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-3">
                                {selectedProject.github && (
                                  <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-surface)] transition-colors duration-300"
                                  >
                                    <Github size={18} />
                                    <span>GitHub</span>
                                  </a>
                                )}
                                <a
                                  href={selectedProject.liveDemo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                                >
                                  <ExternalLink size={18} />
                                  <span>Live Demo</span>
                                </a>
                              </div>
                            </div>
                          )}

                          {/* Tab: 担当・取り組み */}
                          {activeTab === 'role' && (
                            <div className="space-y-6">
                              {selectedProject.role && selectedProject.role.length > 0 && (
                                <div>
                                  <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                                    担当したこと
                                  </h3>
                                  <ul className="space-y-2">
                                    {selectedProject.role.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2 text-[var(--color-text-muted)]">
                                        <span className="text-[var(--color-accent)] mt-0.5 shrink-0">●</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                                <div>
                                  <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                                    苦労したこと・頑張ったこと
                                  </h3>
                                  <ul className="space-y-2">
                                    {selectedProject.challenges.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2 text-[var(--color-text-muted)]">
                                        <span className="text-[var(--color-accent)] mt-0.5 shrink-0">●</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Tab: 学んだこと */}
                          {activeTab === 'learnings' && (
                            <div>
                              <ul className="space-y-2">
                                {selectedProject.learnings!.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[var(--color-text-muted)]">
                                    <span className="text-[var(--color-accent)] mt-0.5 shrink-0">●</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
