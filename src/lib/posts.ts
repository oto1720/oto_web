// 自作記事（Markdown）の読み込み・パース
// src/content/posts/*.md をビルド時に一括読み込みする

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO (YYYY-MM-DD)
  excerpt: string;
  tags: string[];
  cover?: string;
  content: string; // frontmatter を除いた本文（Markdown）
};

// 依存を増やさないための軽量な frontmatter パーサ
// gray-matter は Buffer 依存でブラウザで問題が出やすいため自前実装
function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const [, frontmatter, content] = match;
  const data: Record<string, string | string[]> = {};

  for (const line of frontmatter.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (!key) continue;

    // 配列表記: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      // 前後のクォートを除去
      value = value.replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  }

  return { data, content: content.trim() };
}

function toStringValue(v: string | string[] | undefined, fallback = ''): string {
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v ?? fallback;
}

function toArrayValue(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length > 0) return [v];
  return [];
}

// Vite: 生の文字列としてすべての md を読み込む
const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const allPosts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    // ファイル名から slug を生成（フロントマターの slug があれば優先）
    const fileName = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
    const slug = toStringValue(data.slug, fileName);

    return {
      slug,
      title: toStringValue(data.title, slug),
      date: toStringValue(data.date),
      excerpt: toStringValue(data.excerpt),
      tags: toArrayValue(data.tags),
      cover: toStringValue(data.cover) || undefined,
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // 日付降順

export function getAllPosts(): Post[] {
  return allPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}
