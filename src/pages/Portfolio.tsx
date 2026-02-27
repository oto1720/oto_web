import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimatedBackground from '../components/AnimatedBackground';
import { X, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'ドブスニート結婚RTA',
    description: 'ハッカソンで、お題が「起承転結」だったので、人生をテーマにした結婚をするRTAゲームを作成しました。',
    image: '/assets/images/dobusu.png',
    technologies: ['Unity', 'C#', 'github'],
    github: 'https://github.com/oto1720/2025_jyogi',
    liveDemo: 'https://topaz.dev/projects/242cef13b3da449a383e',
  },
  {
    id: 2,
    title: 'Neatify',
    description: '一人暮らしの部屋の綺麗さをAIが判断し、点数化し共有できるアプリ',
    image: '/assets/images/neatify.png',
    technologies: ['Flutter', 'firebase', 'github', 'OpenAI API'],
    github: 'https://github.com/oto06/room1',
    liveDemo: 'https://apps.apple.com/jp/app/neatify/id6746064755',
  },
  {
    id: 3,
    title: '作るっちゃんのWEBサイト',
    description: '所属しているゲーム制作コミュニティー、作るっちゃんのWEBサイトを作成しました。',
    image: '/assets/images/tukuruttyan.png',
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'supabase', 'Vercel'],
    github: 'https://github.com/oto1720/tukurutyaWeb',
    liveDemo: 'https://tukurutya-web.vercel.app/',
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
    github: 'https://github.com/oto1720/2025_1week_ai',
    liveDemo: 'https://unityroom.com/games/motimotimaker',
  },
  {
    id: 6,
    title: '買ったらダメよ',
    description: '技育ハッカソンでチームで、買いすぎを防ぐサービスを作成しました。',
    image: '/assets/images/kattaradame.png',
    technologies: ['Flutter', 'Google拡張機能', 'OpenAI API'],
    github: 'https://github.com/kuroda50/2025_giiku_vol2',
    liveDemo: 'assets/movie/Clipchamp_1.mov',
  },
  {
    id: 7,
    title: '俺２',
    description: '俺と理想の俺2が会話するアプリ',
    image: '/assets/images/ore2.png',
    technologies: ['Flutter', 'Python', 'Flask', 'OpenAI API'],
    github: 'https://github.com/kuroda50/ai_my',
    liveDemo: 'https://topaz.dev/projects/63b8bd917b65b4f91601',
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
  },
  {
    id: 11,
    title: '福大ピアプロのwebサイト',
    description: '福大ピアプロのwebサイトを作成しました',
    image: '/assets/images/hukudai.png',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'GAS'],
    github: 'https://github.com/oto1720/piapuro-web',
    liveDemo: 'https://www.piapuro.net/',
  },
  {
    id: 12,
    title: 'Critica',
    description: 'エコーチェンバーを壊す多角的思考育成アプリ',
    image: '/assets/images/Critica.png',
    technologies: ['Flutter', 'Firebase', 'GeminiAI'],
    github: '',
    liveDemo: 'https://apps.apple.com/jp/app/critica/id6756059095',
  },
  {
    id: 13,
    title: 'AIを使ったマッチングアプリ(mirr)',
    description: '技育キャンプvol17で作成した、AIを使ったマッチングアプリ',
    image: '/assets/images/giiku.png',
    technologies: ['Flutter', 'Echo(Go)', 'Firebase', 'Swagger', 'GeminiAPI', 'Docker', 'Neon'],
    github: 'https://github.com/hackathon-20260110/app_pub',
    liveDemo: 'https://drive.google.com/file/d/10rYh6ORxTrSG7dzlC-oskU0iFMgFFG68/view',
  },
  {
    id: 14,
    title: 'TRI-KNOT',
    description: 'ハッカソンで作成した、3人1組の連帯責任で「サボり」を防ぐ、運動習慣化監視アプリ',
    image: '/assets/images/triknot.png',
    technologies: ['Nest.js', 'TypeScript', 'Go', 'Echo', 'Swagger', 'PostgreSQL', 'Docker', 'Supabase','Google Cloud Run'],
    github: 'https://github.com/trihackathon/app',
    liveDemo: 'https://topaz.dev/projects/c0ed034fd5d669809012',
  },
  {
    id: 15,
    title: 'PatiPuro.vscode',
    description: 'vscodeの拡張機能を使ってコードを打つとパチンコができるプロダクト',
    image: '/assets/images/patipuro.png',
    technologies: ['vscode', 'React', 'Matter.js','Websocket','Docker'],
    github: 'https://github.com/guriguri00451/PatiPro',
    liveDemo: 'https://topaz.dev/projects/9182aa2a62d8cc83b5f0',
  },
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
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
        <AnimatedBackground />

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
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
                      {selectedProject.title}
                    </h2>

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
