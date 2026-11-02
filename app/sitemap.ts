import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://diskai.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://diskai.vercel.app/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: .4 },
    { url: 'https://diskai.vercel.app/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: .4 },
  ]
}
