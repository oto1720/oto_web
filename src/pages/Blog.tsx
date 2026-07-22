import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ArticleCard, { ArticleCardData } from '../components/ArticleCard';
import { useQiitaArticles } from '../hooks/useQiitaArticles';
import { getAllPosts } from '../lib/posts';

type Filter = 'all' | 'own' | 'qiita';

const Blog: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const { articles: qiita, loading, error } = useQiitaArticles();
  const posts = useMemo(() => getAllPosts(), []);

  const items: ArticleCardData[] = useMemo(() => {
    const own: ArticleCardData[] = posts.map((p) => ({
      key: `own-${p.slug}`,
      source: 'own',
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
      tags: p.tags,
      cover: p.cover,
      to: `/blog/${p.slug}`,
    }));

    const qiitaItems: ArticleCardData[] = qiita.map((a) => ({
      key: `qiita-${a.id}`,
      source: 'qiita',
      title: a.title,
      date: a.date,
      excerpt: a.excerpt,
      tags: a.tags,
      likesCount: a.likesCount,
      href: a.url,
    }));

    const merged = [...own, ...qiitaItems].filter((item) =>
      filter === 'all' ? true : item.source === filter
    );

    return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [posts, qiita, filter]);

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'すべて' },
    { key: 'own', label: 'Blog' },
    { key: 'qiita', label: 'Qiita' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] relative">
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
              Blog
            </h1>
            <p className="mt-3 text-[var(--color-text-muted)]">
              自分で書いた記事と Qiita の投稿
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                  filter === tab.key
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]'
                    : 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Qiita 取得失敗の通知（自作記事は表示継続） */}
          {error && filter !== 'own' && (
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 mb-8">
              <AlertCircle size={16} />
              Qiita の記事を取得できませんでした。時間をおいて再度お試しください。
            </div>
          )}

          {loading && filter !== 'own' && items.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] animate-pulse"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-[var(--color-text-muted)]">記事がまだありません。</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <ArticleCard key={item.key} data={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
