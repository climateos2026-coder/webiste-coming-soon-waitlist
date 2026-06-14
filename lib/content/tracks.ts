import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

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

const trackSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  emoji: z.string().min(1),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  problemDomain: z.string().min(1),
  prizeUSD: z.coerce.number().int().nonnegative(),
  datasetCount: z.coerce.number().int().nonnegative(),
  mentorCount: z.coerce.number().int().nonnegative(),
});

function isSafeSlug(slug: string) {
  return /^[a-z0-9-]+$/.test(slug) && !slug.includes('..');
}

function parseTrackFile(filePath: string, expectedSlug?: string): TrackContent | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const parsed = trackSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    if (expectedSlug && parsed.data.slug !== expectedSlug) {
      return null;
    }

    return { ...parsed.data, content };
  } catch {
    return null;
  }
}

export async function getAllTracks(): Promise<TrackMeta[]> {
  try {
    const files = fs.readdirSync(tracksDir);
    const tracks = files
      .filter(f => f.endsWith('.mdx'))
      .map(f => parseTrackFile(path.join(tracksDir, f)))
      .filter((track): track is TrackContent => track !== null)
      .sort((a, b) => a.slug.localeCompare(b.slug));

    return tracks;
  } catch {
    return [];
  }
}

export async function getTrackBySlug(slug: string): Promise<TrackContent | null> {
  if (!isSafeSlug(slug)) {
    return null;
  }

  const filePath = path.join(tracksDir, `${slug}.mdx`);
  const realTracksDir = fs.realpathSync(tracksDir);
  let realFilePath: string;

  try {
    realFilePath = fs.realpathSync(filePath);
  } catch {
    return null;
  }

  if (!realFilePath.startsWith(`${realTracksDir}${path.sep}`)) {
    return null;
  }

  return parseTrackFile(realFilePath, slug);
}
