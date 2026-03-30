import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Mail, Github, Twitter, Link2 } from 'lucide-react';

const Contact: React.FC = () => {
  const socialLinks = [
    { name: 'Email', icon: <Mail size={22} />, url: 'mailto:kotaro17206@gmail.com', display: 'kotaro17206@gmail.com' },
    { name: 'GitHub', icon: <Github size={22} />, url: 'https://github.com/oto1720', display: 'github.com/oto1720' },
    { name: 'Qiita', icon: <Link2 size={22} />, url: 'https://qiita.com/oto1720', display: 'qiita.com/oto1720' },
    { name: 'Twitter', icon: <Twitter size={22} />, url: 'https://x.com/ot6217', display: 'x.com/ot6217' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] relative">
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
              Contact
            </h1>
            <p className="mt-3 text-[var(--color-text-muted)]">お気軽にご連絡ください</p>
          </motion.div>

          <motion.div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-[var(--color-text)] text-center">Connect With Me</h2>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 6 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {link.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">
                      {link.display}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
