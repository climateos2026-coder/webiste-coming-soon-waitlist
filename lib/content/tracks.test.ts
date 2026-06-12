import { describe, it, expect } from 'vitest';
import { getAllTracks, getTrackBySlug } from './tracks';

describe('Tracks Content Module', () => {
  it('getAllTracks returns an array', async () => {
    const tracks = await getAllTracks();
    expect(Array.isArray(tracks)).toBe(true);
  });

  it('getTrackBySlug returns null for non-existent track', async () => {
    const track = await getTrackBySlug('non-existent-track-12345');
    expect(track).toBeNull();
  });
});
