import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Scene from '../components/three/Scene';
import SpinningCube from '../components/three/SpinningCube';
import { Code, Briefcase, GraduationCap, Circle } from 'lucide-react';

// Sample profile data - replace with your actual data
type Experience = {
  id: number;
  title: string;
  subtitle?: string;
  institution?: string;
  period: string;
  description: string;
  icon: JSX.Element;
  image?: string; // optional image path (e.g. "/assets/images/xxx.png")
  link?: string;  // optional external link; card becomes clickable when set
};
const skills = [
  { name: 'Flutter', level: 70 },
  { name: 'React', level: 40 },
  { name: 'Unity,C#', level: 60 },
  { name: 'TypeScript', level: 40 },
  { name: 'Next.js', level: 40 },
];

const experiences: Experience[] = [
  {
    id: 1,
    title: '福岡大学入学',
    subtitle: '',
    period: '2024 4月',
    description: '福岡大学-工学部-電子情報工学科',
    icon: <Circle size={24} />,
  },
  {
    id: 2,
    title: '福大ピアプロ入部',
    subtitle: '',
    period: '2024　4月',
    description: '福岡大学のプログラミングサークル、ピアプロに入部',
    icon: <Circle size={24} />,
  },
  {
    id: 3,
    title: '作るっちゃんのメンバーになる',
    institution: '',
    period: '2024 5月',
    description: '九州の学生対象とした、ゲーム制作コミュニティーのメンバーになる',
    icon: <Circle size={24} />,
  },
  {
    id: 4,
    title: 'チャレキャラ参加',
    institution: '',
    period: '2024 6月',
    description: '九州の学生を対象とした、アプリの開発を行うコンテストに参加',
    icon: <Circle size={24} />,
  },
  {
    id: 5,
    title: '初めてのゲームジャムに参加',
    institution: '',
    image: '/assets/images/gejam1.jpg',
    period: '2024 8月',
    description: '福岡の学生を対象とした、ゲーム制作を行うジャムに参加',
    icon: <Circle size={24} />,
  },
  {
    id: 6,
    title: '作るっちゃんの運営になる',
    institution: '',
    period: '2024 10月',
    description: 'ゲーム制作コミュニティーの運営に携わる',
    icon: <Circle size={24} />,
  },
  {
    id: 7,
    title: 'チャレキャラの発表',
    institution: '',
    image: '/assets/images/tyarekyara.jpg',
    period: '2024 12月',
    description: '遊びと学びを題材にしたマッチングアプリの発表を行なった',
    icon: <Circle size={24} />,
  },
  {
    id: 8,
    title: '２回目のゲームジャム参加',

    institution: '',
    period: '2025 2月',
    image: '/assets/images/gejam2.jpg',
    description: '２回目となるゲームジャムに参加し、プログラムリーダーを務める',
    icon: <Circle size={24} />,
  },
  {
    id: 9,
    title: 'つくると参加',
    image: '/assets/images/tukuruto.jpg',
    institution: '',
    period: '2025 2月',
    description: '工学系のイベントで、制作物を展示（チャレキャラで作成した作品を発表）',
    icon: <Circle size={24} />,
  },
  {
    id: 10,
    title: '技育ハッカソン参加',
    institution: '',
    period: '2025 4月',
    description: '初めてのハッカソンに参加。チームで賞を受賞（フロントエンドを担当）',
    icon: <Circle size={24} />,
  },
  {
    id: 12,
    title: 'アプリをリリース',
    image: '/assets/images/neatify.png',
    link: 'https://apps.apple.com/jp/app/neatify/id6746064755',
    institution: '',
    period: '2025 5月',
    description: '個人開発を行っていた、部屋掃除管理アプリをリリース',
    icon: <Circle size={24} />,
  },
  {
    id: 13,
    title: 'ハックツハッカソン',
    institution: '',
    image: '/assets/images/hakkaso.jpg',
    period: '2025 6月',
    description: 'aiを使った作品でWingArc1st賞を獲得。（フロントエンドを担当）',
    icon: <Circle size={24} />,
  },
  {
    id: 14,
    title: 'CyberAgentさんのMCPについて講演参加',
    institution: '',
    period: '2025 7月',
    description: 'CA.ai MCPについての勉強会に参加',
    icon: <Circle size={24} />,
  },
  {
    id: 15,
    title: 'CyberAgentさんとサークルのイベントを主催',
    institution: '',
    image: '/assets/images/cahakkaso.jpg',
    period: '2025 8月',
    description: '人のプロダクトをブラッシュアップするハッカソンイベントを主催(優秀賞獲得）',
    icon: <Circle size={24} />,
  },
  {
    id: 16,
    title: '学生展示会CPQの運営、開催',
    institution: '',
    image: '/assets/images/CPQ.jpg',
    period: '2025 8月',
    description: '学生団体対象とした展示会の運営を行った。所属サークルも展示',
    icon: <Circle size={24} />,
  },
  {
    id: 17,
    title: 'サークル代表就任',
    institution: '',
    period: '2025 9月',
    description: '所属サークル、福大ピアプロの代表に就任',
    icon: <Circle size={24} />,
  },
  {
    id: 18,
    title: 'RiverPodの講座を開く',
    institution: '',
    period: '2025 10月',
    description: 'エンジニアカフェでRiverPodについてのハンズオン講座を開いた',
    icon: <Circle size={24} />,
  }
];

const Profile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <PageTransition>
      <div ref={containerRef} className="min-h-screen relative">
        {/* Background 3D Scene */}
        <div className="fixed inset-0 z-0">
          <Scene cameraPosition={[0, 0, 5]} controls={false}>
            <SpinningCube position={[-2, 1, -2]} size={0.5} color="#ffffff" wireframe={true} speed={0.5} />
            <SpinningCube position={[2, -1, -3]} size={0.8} color="#ffffff" wireframe={true} speed={0.3} />
            <SpinningCube position={[0, 2, -4]} size={0.6} color="#ffffff" wireframe={true} speed={0.7} />
          </Scene>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <motion.div 
            style={{ opacity, y }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Profile</h1>
          </motion.div>

          {/* Skills Section */}
          <motion.section 
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center">
              <Code className="mr-3" /> Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                    <span className="text-sm opacity-70">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div 
                      className="bg-white h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-12 flex items-center">
              <Briefcase className="mr-3" /> 経歴紹介
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-white/20" />

              {/* Timeline items */}
              {experiences
              .sort((a,b) => b.id - a.id)
              .map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={`relative mb-16 md:mb-24 ${
                    index % 2 === 0 ? 'md:pr-12 md:ml-auto md:mr-1/2' : 'md:pl-12 md:mr-auto md:ml-1/2'
                  } md:w-1/2`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {/* Timeline node */}
                  <div className={`absolute ${
                    index % 2 === 0 ? 'md:-left-6 left-0' : 'md:-right-6 left-0'
                  } top-0 w-12 h-12 rounded-full bg-black border border-white/30 flex items-center justify-center`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block ml-16 md:ml-0 bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-white/70 mb-2">{item.subtitle || item.institution}</p>
                      <p className="text-sm text-white/50 mb-4">{item.period}</p>
                      <p className="text-base">{item.description}</p>
                    </a>
                  ) : (
                    <div className="ml-16 md:ml-0 bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-white/70 mb-2">{item.subtitle || item.institution}</p>
                      <p className="text-sm text-white/50 mb-4">{item.period}</p>
                      <p className="text-base">{item.description}</p>
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