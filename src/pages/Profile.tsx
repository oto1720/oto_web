import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Code, Briefcase, Circle, Trophy } from 'lucide-react';

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
  },
  {
    id: 2,
    title: '福大ピアプロ入部',
    period: '2024  4月',
    description: '福岡大学のプログラミングサークル、ピアプロに入部',
    icon: <Circle size={20} />,
  },
  {
    id: 3,
    title: '作るっちゃんのメンバーになる',
    period: '2024 5月',
    description: '九州の学生対象とした、ゲーム制作コミュニティーのメンバーになる',
    icon: <Circle size={20} />,
  },
  {
    id: 4,
    title: 'チャレキャラ参加',
    period: '2024 6月',
    description: '九州の学生を対象とした、アプリの開発を行うコンテストに参加',
    icon: <Circle size={20} />,
  },
  {
    id: 5,
    title: '初めてのゲームジャムに参加',
    image: '/assets/images/gejam1.JPG',
    period: '2024 8月',
    description: '福岡の学生を対象とした、ゲーム制作を行うジャムに参加',
    icon: <Circle size={20} />,
  },
  {
    id: 6,
    title: '作るっちゃんの運営になる',
    period: '2024 10月',
    description: 'ゲーム制作コミュニティーの運営に携わる',
    icon: <Circle size={20} />,
  },
  {
    id: 7,
    title: 'チャレキャラの発表',
    image: '/assets/images/tyarekyara.JPG',
    period: '2024 12月',
    description: '遊びと学びを題材にしたマッチングアプリの発表を行なった',
    icon: <Circle size={20} />,
  },
  {
    id: 8,
    title: '２回目のゲームジャム参加',
    period: '2025 2月',
    image: '/assets/images/gejam2.JPG',
    description: '２回目となるゲームジャムに参加し、プログラムリーダーを務める',
    icon: <Circle size={20} />,
  },
  {
    id: 9,
    title: 'つくると参加',
    image: '/assets/images/tukuruto.jpg',
    period: '2025 2月',
    description: '工学系のイベントで、制作物を展示（チャレキャラで作成した作品を発表）',
    icon: <Circle size={20} />,
  },
  {
    id: 10,
    title: '技育ハッカソン参加',
    period: '2025 4月',
    description: '初めてのハッカソンに参加。チームで賞を受賞（フロントエンドを担当）',
    icon: <Circle size={20} />,
  },
  {
    id: 12,
    title: 'アプリをリリース',
    image: '/assets/images/neatify.png',
    link: 'https://apps.apple.com/jp/app/neatify/id6746064755',
    period: '2025 5月',
    description: '個人開発を行っていた、部屋掃除管理アプリをリリース',
    icon: <Circle size={20} />,
  },
  {
    id: 13,
    title: 'ハックツハッカソン',
    image: '/assets/images/hakkaso.jpeg',
    period: '2025 6月',
    description: 'aiを使った作品でWingArc1st賞を獲得。（フロントエンドを担当）',
    icon: <Circle size={20} />,
  },
  {
    id: 14,
    title: 'CyberAgentさんのMCPについて講演参加',
    period: '2025 7月',
    description: 'CA.ai MCPについての勉強会に参加',
    icon: <Circle size={20} />,
  },
  {
    id: 15,
    title: 'CyberAgentさんとサークルのイベントを主催',
    image: '/assets/images/cahakkaso.PNG',
    period: '2025 8月',
    description: '人のプロダクトをブラッシュアップするハッカソンイベントを主催(優秀賞獲得）',
    icon: <Circle size={20} />,
  },
  {
    id: 16,
    title: '学生展示会CPQの運営、開催',
    image: '/assets/images/CPQ.jpg',
    period: '2025 8月',
    description: '学生団体対象とした展示会の運営を行った。所属サークルも展示',
    icon: <Circle size={20} />,
  },
  {
    id: 17,
    title: 'サークル代表就任',
    period: '2025 9月',
    description: '所属サークル、福大ピアプロの代表に就任',
    icon: <Circle size={20} />,
  },
  {
    id: 18,
    title: '学生団体交流会参加',
    image: '/assets/images/giiku.jpg',
    period: '2025 10月',
    description: '全国のエンジニア学生団体と交流',
    icon: <Circle size={20} />,
  },
  {
    id: 19,
    title: 'RiverPodの講座を開く',
    image: '/assets/images/kouenn.png',
    period: '2025 10月',
    description: 'エンジニアカフェでRiverPodについてのハンズオン講座を開いた',
    icon: <Circle size={20} />,
  },
  {
    id: 20,
    title: 'Flutterkaigi2025に参加',
    image: '/assets/images/flutterkaigi.jpg',
    period: '2025 10月',
    description: 'Flutterのカンファレンスに参加',
    icon: <Circle size={20} />,
  },
  {
    id: 21,
    title: 'チャレキャラ2025に参加',
    image: '/assets/images/tyarekyara2.jpg',
    period: '2025 12月',
    description: 'チャレキャラ2025に参加し、企業賞を獲得',
    icon: <Circle size={20} />,
  },
  {
    id: 22,
    title: '株式会社dipさんとのLT会を主催',
    image: '/assets/images/dip.jpg',
    period: '2025 12月',
    description: '株式会社dipさんとのLT会を主催',
    icon: <Circle size={20} />,
  },
  {
    id: 23,
    title: '技育キャンプvol17に参加',
    image: '/assets/images/giiku.png',
    period: '2026 1月',
    description: 'AIを使ったマッチングアプリを作成し、優秀賞を獲得',
    icon: <Circle size={20} />,
  },

  {
    id: 24,
    title: 'Flutterの入門＋Liquid glass講座を開いた',
    image: '/assets/images/Flutterliquid.png',
    period: '2026 1月',
    description: 'Flutterの環境構築から入門の講座とliquid glassの簡単な講座を3時間開いた',
    icon: <Circle size={20} />,
  },
  {
    id: 25,
    title: 'ハッカソンでTRI-KNOTを作成',
    image: '/assets/images/triknot.png',
    period: '2026 2月',
    description: 'ハッカソンで3人1組の連帯責任で「サボり」を防ぐ、運動習慣化監視アプリを作成した',
    icon: <Circle size={20} />,
  },
  {
    id: 26,
    title: 'ハッカソンでPatiPuro.vscodeを作成',
    image: '/assets/images/pati.jpg',
    period: '2026 2月',
    description: 'ハッカソンでvscodeの拡張機能を使ってパチンコができるプロダクトを作成',
    icon: <Circle size={20} />,
  },
  {
    id: 27,
    title: 'CA Tech Dojoに参加(1weekでのandroidアプリ開発インターン）',
    image: '/assets/images/catech.png',
    period: '2026 3月',
    description: 'CA Tech Dojoに参加し、1weekでのandroidアプリ開発インターンを行った。最優秀賞を獲得',
    icon: <Circle size={20} />,
  },
  {
    id: 28,
    title: 'CybarAgentさんとの内製化ハッカソン',
    image: '/assets/images/cyberagent.jpg',
    period: '2026 3月',
    description: 'CyberAgentさんとの内製化ハッカソンに参加し、最優秀賞を獲得',
    icon: <Circle size={20} />,
  },
  {
    id: 29,
    title: '三団体合同ハッカソン',
    image: '/assets/images/dddd.jpg',
    period: '2026 5月',
    description: 'DDDハッカソンに参加し、サイバーエージェント賞を獲得',
    icon: <Circle size={20} />,
  }

];

const Profile: React.FC = () => {
  const sortedExperiences = useMemo(
    () => experiences.slice().sort((a, b) => b.id - a.id),
    []
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-12 flex items-center gap-3 text-[var(--color-text)]">
              <Briefcase size={24} className="text-[var(--color-accent)]" />
              経歴紹介
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-[var(--color-border)]" />

              {sortedExperiences.map((item, index) => (
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
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
