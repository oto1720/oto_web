import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import AnimatedBackground from '../components/AnimatedBackground';
import { ArrowDown, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'ドブスニート結婚RTA',
    description: 'ハッカソンで、お題が「起承転結」だったので、人生をテーマにした結婚をするRTAゲームを作成しました。',
    image: '/assets/images/dobusu.png',
    technologies: ['Unity', 'C#', 'github'],
  },
  {
    id: 2,
    title: 'Neatify',
    description: '一人暮らしの部屋の綺麗さをAIが判断し、点数化し共有できるアプリ',
    image: '/assets/images/neatify.png',
    technologies: ['Flutter', 'firebase', 'OpenAI API'],
  },
  {
    id: 3,
    title: '作るっちゃんのWEBサイト',
    description: '所属しているゲーム制作コミュニティー、作るっちゃんのWEBサイトを作成しました。',
    image: '/assets/images/tukuruttyan.png',
    technologies: ['React', 'Next.js', 'TypeScript'],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const Home: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-[var(--color-bg)]">
        <AnimatedBackground />

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-text)]">
              Portfolio
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-[var(--color-text-muted)] mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            こちらがotoのポートフォリオです。
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:opacity-90 transition-opacity duration-300"
            >
              Works を見る
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-surface)] transition-colors duration-300"
            >
              Profile
            </Link>
          </motion.div>

          <motion.div
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <ArrowDown size={28} className="text-[var(--color-text-muted)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Profile Preview */}
      <motion.section
        className="py-24 px-4 bg-[var(--color-surface)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-text)] mb-6">
                Profile
              </h2>
              <p className="text-lg text-[var(--color-text-muted)] mb-8">
                使える技術や経験が見れます！
              </p>
              <Link
                to="/profile"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:opacity-90 transition-opacity duration-300"
              >
                プロフィールを見る
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Flutter', 'React', 'Unity', 'Next.js', 'TypeScript', 'Firebase'].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-center text-[var(--color-text)] font-medium text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Works Preview */}
      <motion.section
        className="py-24 px-4 bg-[var(--color-bg)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-text)] mb-12">
            Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {projects.map((project, index) => (
              <Link key={project.id} to="/portfolio" className="block group">
                <motion.div
                  className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-text)] mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-surface)] transition-colors duration-300"
          >
            すべて見る
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.section>

      {/* Contact Preview */}
      <motion.section
        className="py-24 px-4 bg-[var(--color-surface)] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
      >
        <AnimatedBackground />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-text)] mb-6">
            Contact
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] mb-8">
            SNSリンクやお問い合わせはこちら
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:opacity-90 transition-opacity duration-300"
          >
            お問い合わせ
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.section>
    </PageTransition>
  );
};

export default Home;
