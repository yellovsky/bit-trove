import { describe, expect, it } from 'vitest';

import { getWhere } from './shards.repository';

// Mock the getWhere function by extracting it from the file
// This is a simple test to verify the search logic works

describe('Shard Search Functionality', () => {
  it('should create correct where clause for search parameter', () => {
    const params = {
      filter: {
        languageCodeIn: ['en'],
        published: true,
        search: 'react typescript',
      },
      orderBy: { title: 'asc' as const },
      skip: 0,
      take: 10,
    };

    const where = getWhere(params);

    expect(where).toMatchObject({
      languageCode: { in: ['en'] },
      OR: [
        // First term: "react"
        { title: { contains: 'react', mode: 'insensitive' } },
        { shortDescription: { contains: 'react', mode: 'insensitive' } },
        { contentJSON: { path: ['content', '*', 'content', '*', 'text'], string_contains: 'react' } },
        { contentJSON: { path: ['content', '*', 'content', '*', 'content', '*', 'text'], string_contains: 'react' } },
        // Second term: "typescript"
        { title: { contains: 'typescript', mode: 'insensitive' } },
        { shortDescription: { contains: 'typescript', mode: 'insensitive' } },
        { contentJSON: { path: ['content', '*', 'content', '*', 'text'], string_contains: 'typescript' } },
        {
          contentJSON: {
            path: ['content', '*', 'content', '*', 'content', '*', 'text'],
            string_contains: 'typescript',
          },
        },
      ],
      publishedAt: { not: null },
    });
  });

  it('should handle single search term', () => {
    const params = {
      filter: {
        published: true,
        search: 'javascript',
      },
      orderBy: { title: 'asc' as const },
      skip: 0,
      take: 10,
    };

    const where = getWhere(params);

    expect(where.OR).toHaveLength(4); // title, shortDescription, contentJSON (2 paths)
    expect(where.OR?.[0]).toMatchObject({
      title: { contains: 'javascript', mode: 'insensitive' },
    });
  });

  it('should handle empty search term', () => {
    const params = {
      filter: {
        published: true, // whitespace only
        search: '   ',
      },
      orderBy: { title: 'asc' as const },
      skip: 0,
      take: 10,
    };

    const where = getWhere(params);

    expect(where.OR).toBeUndefined();
  });

  it('should handle search with special characters', () => {
    const params = {
      filter: {
        published: true,
        search: 'react.js & typescript',
      },
      orderBy: { title: 'asc' as const },
      skip: 0,
      take: 10,
    };

    const where = getWhere(params);

    expect(where.OR).toBeDefined();
    expect(where.OR?.length).toBeGreaterThan(0);
  });
});
