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
    title: '3D Product Configurator',
    description: 'Interactive 3D product configurator built with Three.js and React. Allows users to customize products in real-time.',
    image: 'https://images.pexels.com/photos/2236382/pexels-photo-2236382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    id: 2,
    title: 'E-commerce Website',
    description: 'Fully responsive e-commerce platform with product filtering, user authentication, and payment integration.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard displaying complex data sets through various chart types and filterable views.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'D3.js', 'GraphQL', 'Material UI'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    id: 4,
    title: 'Mobile Weather App',
    description: 'Weather application with location detection, forecasts, and animated weather conditions.',
    image: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React Native', 'Weather API', 'Geolocation', 'Animations'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
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
            <p className="text-xl opacity-70 max-w-2xl mx-auto">
              A selection of my recent work and personal projects.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
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