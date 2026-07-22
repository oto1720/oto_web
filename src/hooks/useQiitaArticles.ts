import { useEffect, useState } from 'react';

// Qiita の記事情報（表示に必要なものだけ抽出）
export type QiitaArticle = {
  id: string;
  title: string;
  url: string;
  date: string; // created_at (ISO)
  likesCount: number;
  tags: string[];
  excerpt: string;
};

const QIITA_USER = 'oto1720';
const CACHE_KEY = `qiita:${QIITA_USER}`;
const CACHE_TTL = 1000 * 60 * 30; // 30分

type RawQiitaItem = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  likes_count: number;
  tags: { name: string }[];
  body: string;
};

function makeExcerpt(body: string, length = 100): string {
  const text = body
    .replace(/```[\s\S]*?```/g, '') // コードブロック除去
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 画像除去
    .replace(/[#>*`_\-]/g, '') // 記号除去
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > length ? `${text.slice(0, length)}…` : text;
}

type State = {
  articles: QiitaArticle[];
  loading: boolean;
  error: boolean;
};

export function useQiitaArticles(): State {
  const [state, setState] = useState<State>({ articles: [], loading: true, error: false });

  useEffect(() => {
    let active = true;

    // セッションキャッシュ確認（API制限 60req/h 対策）
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { at: number; articles: QiitaArticle[] };
        if (Date.now() - parsed.at < CACHE_TTL) {
          setState({ articles: parsed.articles, loading: false, error: false });
          return;
        }
      }
    } catch {
      // キャッシュ破損時は無視して取得へ
    }

    fetch(`https://qiita.com/api/v2/users/${QIITA_USER}/items?per_page=100`, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Qiita API ${res.status}`);
        return res.json() as Promise<RawQiitaItem[]>;
      })
      .then((items) => {
        if (!active) return;
        const articles: QiitaArticle[] = items.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          date: item.created_at,
          likesCount: item.likes_count,
          tags: (item.tags ?? []).map((t) => t.name),
          excerpt: makeExcerpt(item.body ?? ''),
        }));
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), articles }));
        } catch {
          // 容量超過などは無視
        }
        setState({ articles, loading: false, error: false });
      })
      .catch(() => {
        if (!active) return;
        setState({ articles: [], loading: false, error: true });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
