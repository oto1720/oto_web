---
title: このポートフォリオにブログ機能を追加しました
date: 2026-07-22
excerpt: Markdown ファイルを追加するだけで記事を公開できるブログ機能を作りました。この記事はその最初の投稿です。
tags: [React, Vite, Markdown]
---

## はじめに

このポートフォリオサイトに、**自分で記事を書いて公開できるブログ機能**を追加しました。
`src/content/posts/` に Markdown ファイルを置いて git に push するだけで、Vercel が自動でデプロイして公開されます。

## 記事の書き方

1. `src/content/posts/` に `YYYY-MM-DD-好きな名前.md` を作成する
2. 先頭に frontmatter を書く（下記参照）
3. 本文を Markdown で書く
4. `git commit` して `git push` する

### frontmatter の例

```yaml
---
title: 記事のタイトル
date: 2026-07-22
excerpt: 一覧に表示される短い説明文
tags: [React, TypeScript]
cover: /assets/images/example.png   # 任意（省略可）
---
```

## 対応している記法

GitHub Flavored Markdown に対応しています。

- リスト
- **太字** と *斜体*
- [リンク](https://qiita.com/oto1720)
- `インラインコード`

> 引用もこのように表示されます。

コードブロックはシンタックスハイライトされます。

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

| 項目 | 内容 |
| --- | --- |
| 記法 | GFM |
| ハイライト | highlight.js |

## おわりに

Qiita の記事一覧も同じ Blog ページに統合表示しています。ぜひご覧ください。
