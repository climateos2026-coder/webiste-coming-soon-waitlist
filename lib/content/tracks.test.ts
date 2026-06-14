import { describe, expect, it } from 'vitest';
import { getAllTracks, getTrackBySlug } from './tracks';

describe('Tracks Content Module', () => {
  it('getAllTracks returns validated track metadata', async () => {
    const tracks = await getAllTracks();

    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThan(0);
    expect(tracks.every(track => track.slug && track.name && track.accentColor.startsWith('#'))).toBe(true);
  });

  it('getTrackBySlug returns a validated track for known slugs', async () => {
    const track = await getTrackBySlug('heatshield');

    expect(track).not.toBeNull();
    expect(track?.slug).toBe('heatshield');
    expect(track?.content).toContain('Urban Heat');
  });

  it('getTrackBySlug returns null for non-existent and unsafe slugs', async () => {
    await expect(getTrackBySlug('non-existent-track-12345')).resolves.toBeNull();
    await expect(getTrackBySlug('../heatshield')).resolves.toBeNull();
    await expect(getTrackBySlug('..\\heatshield')).resolves.toBeNull();
  });
});
