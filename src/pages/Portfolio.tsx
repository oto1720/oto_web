import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Scene from '../components/three/Scene';
import SpinningCube from '../components/three/SpinningCube';
import { X, Github, ExternalLink } from 'lucide-react';

// Sample portfolio data - replace with your actual projects
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
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS','supabase','Vercel'],
    github: 'https://github.com/oto1720/tukurutyaWeb',
    liveDemo: 'https://tukurutya-web.vercel.app/',
  },
  {
    id: 4,
    title: 'AIこ',
    description: 'Unity1Weekでのお題で「あい」だったので、AIとあいこを出しつ付けて記録を伸ばすゲームを作成しました。',
    image: '/assets/images/aiko.png',
    technologies: ['Unity', 'C#', 'github', ],
    github: 'https://github.com/oto1720/2025_1week_ai',
    liveDemo: 'https://unityroom.com/games/aiko',
  },
  {
    id: 5,
    title: 'もちもちMAKER',
    description: 'ゲームジャムで、チームで作成しました。（プログラマーとして）',
    image: '/assets/images/motimoti.png',
    technologies: ['Unity', 'C#', 'github', ],
    github: 'https://github.com/oto1720/2025_1week_ai',
    liveDemo: 'https://unityroom.com/games/motimotimaker',
  },
  {
    id: 6,
    title: '買ったらダメよ',
    description: '技育ハッカソンでチームで、買いすぎを防ぐサービスを作成しました。',
    image: '/assets/images/kattaradame.png',
    technologies: ['Flutter', 'Google拡張機能', 'OpenAI API', ],
    github: 'https://github.com/kuroda50/2025_giiku_vol2',
    liveDemo: 'assets/movie/Clipchamp_1.mov',
  },
  {
    id: 7,
    title: '俺２',
    description: '俺と理想の俺2が会話するアプリ',
    image: '/assets/images/ore2.png',
    technologies: ['Flutter', 'Python','Flask', 'OpenAI API', ],
    github: 'https://github.com/kuroda50/ai_my',
    liveDemo: 'https://topaz.dev/projects/63b8bd917b65b4f91601',
  },
  {
    id: 8,
    title: 'AmazonQCLIのゲーム',
  description: 'AmazonQCLIを使ってゲームを作るとTシャツがもらえるキャンペーンに参加しました',
    image: '/assets/images/amazonqcli.png',
    technologies: ['React', 'There.js','Typescript', 'AmazonQCLI', ],
    github: 'https://github.com/oto1720/AmazonQCLI.git',
    liveDemo: 'https://amazon-qcli.vercel.app/',
  },
  {
    id: 9,
    title: '就活戦士',
  description: '就活のためのタスクアプリを作成しました',
    image: '/assets/images/shuukatu.png',
    technologies: ['Flutter', 'RiverPod','Github',],
    github: 'https://github.com/9970628/syuukatusensi',
    liveDemo: 'https://amazon-qcli.vercel.app/',
  },
  {
    id: 10,
    title: 'ReadMaker',
  description: '速読用のアプリで文字がパラパラと流れ読書ができるもの',
    image: '/assets/images/readmaker.png',
    technologies: ['Expo', 'React Native','Rust','Docker','PostgreSQL',],
    github: 'https://github.com/oto1720/2025_ReadMaker',
    liveDemo: 'https://www.canva.com/design/DAGwSL5s78M/OcWyrOiquL0TaNtNmirHfw/edit',
  },
  {
    id: 11,
    title: '福大ピアプロのwebサイト',
  description: '福大ピアプロのwebサイトを作成しました',
    image: '/assets/images/hukudai.png',
    technologies: ['Next.js', 'TypeScript','TailwindCSS','GAS',],
    github: 'https://github.com/oto1720/piapuro-web',
    liveDemo: 'https://www.piapuro.net/',
  },
  {
    id: 12,
    title: 'Critica',
  description: 'エコーチェンバーを壊す多角的思考育成アプリ',
    image: '/assets/images/Critica.png',
    technologies: ['Flutter', 'Firebase','GeminiAI',],
    github: '',
    liveDemo: 'https://apps.apple.com/jp/app/critica/id6756059095',
  }
  
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

  return (
    <PageTransition>
      <div className="min-h-screen relative">
        {/* Background 3D Scene */}
        <div className="fixed inset-0 z-0">
          <Scene cameraPosition={[0, 0, 5]} controls={false}>
            <SpinningCube position={[-3, 2, -3]} size={0.7} color="#ffffff" wireframe={true} speed={0.2} />
            <SpinningCube position={[3, -2, -2]} size={0.5} color="#ffffff" wireframe={true} speed={0.3} />
            <SpinningCube position={[0, -3, -4]} size={0.6} color="#ffffff" wireframe={true} speed={0.4} />
          </Scene>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Portfolio</h1>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[...projects].sort((a, b) => b.id - a.id).map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openProject(project)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 relative">
                  <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs bg-white/10 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-white/10 rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Modal */}
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
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={closeProject}
                ></div>
                
                <motion.div
                  className="relative bg-black border border-white/20 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <button 
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors duration-300"
                    onClick={closeProject}
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedProject.title}</h2>
                    
                    <p className="text-white/80 mb-6">
                      {selectedProject.description}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 text-sm bg-white/10 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                      >
                        <Github size={18} />
                        <span>GitHub</span>
                      </a>
                      <a 
                        href={selectedProject.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-black rounded-full transition-colors duration-300"
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