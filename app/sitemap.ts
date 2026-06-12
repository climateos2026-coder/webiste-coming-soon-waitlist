import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://climateos2026.vercel.app';
  const routes = [
    '', '/tracks', '/timeline', '/sponsors', '/faq', '/recruitment', '/privacy', '/terms',
    '/blog', '/about', '/contact', '/judging', '/mentors', '/press', '/prizes', '/schedule',
    '/community', '/register', '/resources', '/code-of-conduct'
  ];
  
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
