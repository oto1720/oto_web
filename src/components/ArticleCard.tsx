import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Heart, PenLine } from 'lucide-react';

export type ArticleCardData = {
  key: string;
  source: 'qiita' | 'own';
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  likesCount?: number; // Qiita のみ
  href?: string; // Qiita: 外部リンク
  to?: string; // own: 内部リンク
};

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

const CardInner: React.FC<{ data: ArticleCardData }> = ({ data }) => (
  <>
    {data.cover && (
      <div className="relative overflow-hidden aspect-video">
        <img
          src={data.cover}
          alt={data.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )}
    <div className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            data.source === 'qiita'
              ? 'bg-[#55c500]/10 text-[#55c500]'
              : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
          }`}
        >
          {data.source === 'qiita' ? (
            <>
              <ExternalLink size={12} /> Qiita
            </>
          ) : (
            <>
              <PenLine size={12} /> Blog
            </>
          )}
        </span>
        <span className="text-xs text-[var(--color-text-muted)]">{formatDate(data.date)}</span>
      </div>

      <h3 className="text-lg font-semibold text-[var(--color-text)] leading-snug mb-2 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
        {data.title}
      </h3>

      {data.excerpt && (
        <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-4">{data.excerpt}</p>
      )}

      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {data.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        {typeof data.likesCount === 'number' && (
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] shrink-0">
            <Heart size={13} /> {data.likesCount}
          </span>
        )}
      </div>
    </div>
  </>
);

const cardClass =
  'group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full';

const ArticleCard: React.FC<{ data: ArticleCardData; index: number }> = ({ data, index }) => {
  const motionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: Math.min(index * 0.05, 0.4) },
    whileHover: { y: -4 },
  };

  if (data.source === 'own' && data.to) {
    return (
      <motion.div {...motionProps}>
        <Link to={data.to} className={cardClass}>
          <CardInner data={data} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
      {...motionProps}
    >
      <CardInner data={data} />
    </motion.a>
  );
};

export default ArticleCard;
