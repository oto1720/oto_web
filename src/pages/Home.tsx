import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Scene from '../components/three/Scene';
import Sphere from '../components/three/Sphere';
//import FloatingText from '../components/three/FloatingText';
import PageTransition from '../components/PageTransition';
import { ArrowDown, ArrowRight, Code, Briefcase, Mail } from 'lucide-react';

// Sample portfolio data - import from portfolio.tsx
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
    liveDemo: 'https://example.com',
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
];

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);  // Fixed missing parenthesis
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="w-full h-screen relative overflow-hidden">
        {/* 3Dの背景 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/95 to-black/90">
          <Scene cameraPosition={[0, 0, 4]} controls={false}>
            <Sphere 
              position={[0, 0, 0]} 
              radius={2} 
              color="#ffffff" 
              wireframe={true} 
              segments={24}
              speed={0.3}
            />
          </Scene>
        </div>

        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={textVariants}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40"></span>Potofolio
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/70 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            こちらがotoのポートフォリオです。
          </motion.p>
          
          <motion.div
            className="animate-bounce mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <ArrowDown size={32} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Profile Preview */}
      <motion.section
        className="min-h-screen relative py-32 px-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <Code size={32} className="text-white/80" /> */}
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">Profile</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to="/profile"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-500"
              >
                View Full Profile 
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            <div className="h-[400px] relative">
              <Scene cameraPosition={[0, 0, 3]} controls={false}>
                <Sphere position={[0, 0, 0]} radius={1.2} color="#ffffff" wireframe={true} speed={0.2} />
              </Scene>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Portfolio Preview */}
      <motion.section
        className="min-h-screen relative py-32 px-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-black/95 to-black/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <Briefcase size={32} className="text-white/80" /> */}
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">Portfolio</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to="/portfolio"
                className="block"
              >
                <motion.div 
                  className="group relative aspect-video bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
                  <span className="text-white font-medium text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.title}
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.technologies.slice(0, 2).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs bg-white/20 rounded-full text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full h-full flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                  <span className="text-white/60 text-lg font-medium">{project.title}</span>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <Link 
            to="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-500"
          >
            View All Projects
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.section>

      {/* Contact Preview */}
      <motion.section
        className="min-h-screen relative py-32 px-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <Mail size={32} className="text-white/80" /> */}
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">Contact</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-500"
              >
                Get in Touch
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            <div className="h-[400px] relative">
              <Scene cameraPosition={[0, 0, 3]} controls={false}>
                <Sphere position={[0, 0, 0]} radius={1.2} color="#ffffff" wireframe={true} speed={0.15} />
              </Scene>
            </div>
          </div>
        </div>
      </motion.section>
    </PageTransition>
  );
};

export default Home;