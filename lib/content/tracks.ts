import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface TrackMeta {
  slug: string;
  name: string;
  emoji: string;
  accentColor: string;
  problemDomain: string;
  prizeUSD: number;
  datasetCount: number;
  mentorCount: number;
}

export interface TrackContent extends TrackMeta {
  content: string;
}

const tracksDir = path.join(process.cwd(), 'content', 'tracks');

export async function getAllTracks(): Promise<TrackMeta[]> {
  try {
    const files = fs.readdirSync(tracksDir);
    const tracks = files
      .filter(f => f.endsWith('.mdx'))
      .map(f => {
        const fileContent = fs.readFileSync(path.join(tracksDir, f), 'utf-8');
        const { data } = matter(fileContent);
        return data as TrackMeta;
      })
      .sort((a, b) => a.slug.localeCompare(b.slug));
    
    return tracks;
  } catch {
    return [];
  }
}

export async function getTrackBySlug(slug: string): Promise<TrackContent | null> {
  try {
    const fileContent = fs.readFileSync(path.join(tracksDir, `${slug}.mdx`), 'utf-8');
    const { data, content } = matter(fileContent);
    return { ...data, content } as TrackContent;
  } catch {
    return null;
  }
}