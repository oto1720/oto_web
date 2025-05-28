import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Scene from '../components/three/Scene';
import SpinningCube from '../components/three/SpinningCube';
import { Code, Briefcase, GraduationCap } from 'lucide-react';

// Sample profile data - replace with your actual data
const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Three.js', level: 75 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 70 },
  { name: 'CSS/SCSS', level: 85 },
];

const experiences = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: '2020 - Present',
    description: 'Led the development of interactive web applications using React and Three.js. Implemented 3D visualizations and animations.',
    icon: <Briefcase size={24} />,
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Developed responsive websites and applications. Worked with various JavaScript frameworks and libraries.',
    icon: <Briefcase size={24} />,
  },
  {
    id: 3,
    title: 'Computer Science Degree',
    institution: 'University',
    period: '2014 - 2018',
    description: 'Studied Computer Science with focus on web development and interactive media.',
    icon: <GraduationCap size={24} />,
  },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Profile</h1>
            <p className="text-xl opacity-70 max-w-2xl mx-auto">
              A look at my professional journey, skills, and experiences.
            </p>
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
              <Code className="mr-3" /> Technical Skills
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
              <Briefcase className="mr-3" /> Experience & Education
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-white/20" />

              {/* Timeline items */}
              {experiences.map((item, index) => (
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
                  <div className="ml-16 md:ml-0 bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-white/70 mb-2">{item.company || item.institution}</p>
                    <p className="text-sm text-white/50 mb-4">{item.period}</p>
                    <p className="text-base">{item.description}</p>
                  </div>
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