import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import PageTransition from '../components/PageTransition';
import { getPostBySlug } from '../lib/posts';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) document.title = `${post.title} | Blog`;
  }, [post]);

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[var(--color-bg)]">
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              記事が見つかりませんでした
            </h1>
            <Link to="/blog" className="text-[var(--color-accent)] hover:underline">
              ← Blog 一覧に戻る
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)]">
        <article className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Blog 一覧
            </Link>

            <div className="flex items-center gap-3 mb-4 text-sm text-[var(--color-text-muted)]">
              <span>{formatDate(post.date)}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)] mb-8">
              {post.title}
            </h1>

            {post.cover && (
              <img
                src={post.cover}
                alt={post.title}
                className="w-full rounded-xl border border-[var(--color-border)] mb-10"
              />
            )}

            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        </article>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
