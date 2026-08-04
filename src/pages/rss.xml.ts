import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft || !import.meta.env.PROD);
  const til = await getCollection('til', ({ data }) => !data.draft || !import.meta.env.PROD);

  const items = [
    ...articles.map((entry) => ({ entry, path: `/articles/${entry.id}/` })),
    ...til.map((entry) => ({ entry, path: `/til/${entry.id}/` })),
  ].sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());

  return rss({
    title: 'The Product Bet',
    description: 'Notes on AI product management, voice AI, RAG, and agentic workflows.',
    site: context.site!,
    items: items.map(({ entry, path }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: path,
      categories: entry.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
