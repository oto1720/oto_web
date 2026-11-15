import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { talks, Talk, TalkMaterial } from '../data/talks';

const materialLabel = (m: TalkMaterial): string => m.label ?? (m.type === 'pdf' ? 'PDF' : 'Notion');

const MaterialLink: React.FC<{ material: TalkMaterial }> = ({ material }) => (
  <a
    href={material.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] hover:border-[var(--color-text)] transition-all duration-300"
  >
    {material.type === 'pdf' ? <FileText size={14} /> : <ExternalLink size={14} />}
    {materialLabel(material)}
  </a>
);

const TalkCard: React.FC<{ talk: Talk; index: number }> = ({ talk, index }) => (
  <motion.article
    className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden h-full"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
  >
    {talk.image && (
      <div className="relative overflow-hidden aspect-video">
        <img
          src={talk.image}
          alt={talk.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )}

    <div className="p-5 flex flex-col flex-1">
      <h2 className="text-lg font-semibold text-[var(--color-text)] leading-snug mb-3">
        {talk.title}
      </h2>

      {talk.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {talk.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2">
        {talk.materials.length > 0 ? (
          talk.materials.map((m) => <MaterialLink key={m.url} material={m} />)
        ) : (
          <span className="text-sm text-[var(--color-text-muted)]">資料準備中</span>
        )}
      </div>
    </div>
  </motion.article>
);

const Talks: React.FC = () => (
  <PageTransition>
    <div className="min-h-screen bg-[var(--color-bg)] relative">
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Talks
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)]">講座や LT で使った資料</p>
        </motion.div>

        {talks.length === 0 ? (
          <p className="text-[var(--color-text-muted)]">資料がまだありません。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talks.map((talk, index) => (
              <TalkCard key={talk.slug} talk={talk} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  </PageTransition>
);

export default Talks;
