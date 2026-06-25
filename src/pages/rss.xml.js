import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context) {
  const reports = (await getCollection('reports')).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: reports.map((report) => ({
      title: report.data.title,
      pubDate: report.data.publishDate,
      description: report.data.summary,
      link: `/research/${report.id}/`,
      categories: [report.data.sector, report.data.rating],
    })),
    customData: `<language>en-us</language>`,
  });
}
