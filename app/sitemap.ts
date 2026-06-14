import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://climateos2026.vercel.app';
const ignoredDirectories = new Set(['api']);

async function getPageRoutes(directory = 'app'): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      const childRoutes = await getPageRoutes(join(directory, entry.name));
      routes.push(...childRoutes);
      continue;
    }

    if (entry.name === 'page.tsx' || entry.name === 'page.mdx') {
      const routeDirectory = directory === 'app' ? '' : directory.replace(/^app[\\/]/, '');
      routes.push(`/${routeDirectory.replace(/[\\/]/g, '/')}`);
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getPageRoutes();

  return routes.map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }));
}
