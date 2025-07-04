import { calculateReadingTime } from './reading-time';

describe('calculateReadingTime', () => {
  describe('calculateReadingTime', () => {
    it('should return 1 minute for empty content', () => {
      const result = calculateReadingTime(null, 'Test Title', 'Test Description');
      expect(result).toBe(1);
    });

    it('should calculate reading time from title and description only', () => {
      const result = calculateReadingTime(
        null,
        'This is a test title with several words',
        'This is a test description with more words to count'
      );
      // 15 words total / 200 WPM = 0.075 minutes, rounded to 1
      expect(result).toBe(1);
    });

    it('should calculate reading time from JSON content', () => {
      const contentJSON = {
        content: [
          {
            content: [
              {
                text: 'This is a paragraph with several words to test the reading time calculation.',
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
          {
            content: [
              {
                text: 'This is another paragraph with more words to add to the total count.',
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // ~20 words in content + 4 words in title/description = 24 words / 200 WPM = 0.12 minutes, rounded to 1
      expect(result).toBe(1);
    });

    it('should calculate reading time for longer content', () => {
      const contentJSON = {
        content: [
          {
            content: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // ~70 words in content + 4 words in title/description = 74 words / 200 WPM = 0.37 minutes, rounded to 1
      expect(result).toBe(1);
    });

    it('should handle content with 200+ words', () => {
      const longText = 'word '.repeat(250); // 250 words
      const contentJSON = {
        content: [
          {
            content: [
              {
                text: longText,
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // 250 words / 200 WPM = 1.25 minutes, rounded to 1
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('should handle content with 400+ words', () => {
      const longText = 'word '.repeat(450); // 450 words
      const contentJSON = {
        content: [
          {
            content: [
              {
                text: longText,
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // 450 words / 200 WPM = 2.25 minutes, rounded to 2
      expect(result).toBeGreaterThan(1);
      expect(result).toBeLessThanOrEqual(15);
    });

    it('should cap reading time at 999 minutes', () => {
      const veryLongText = 'word '.repeat(200000); // 200,000 words
      const contentJSON = {
        content: [
          {
            content: [
              {
                text: veryLongText,
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // Should be capped at 999
      expect(result).toBe(999);
    });

    it('should handle different content types', () => {
      const contentJSON = {
        content: [
          {
            attrs: { level: 1 },
            content: [
              {
                text: 'Main Heading',
                type: 'text',
              },
            ],
            type: 'heading',
          },
          {
            content: [
              {
                text: 'This is a paragraph with some text.',
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
          {
            content: [
              {
                content: [
                  {
                    content: [
                      {
                        text: 'First list item',
                        type: 'text',
                      },
                    ],
                    type: 'paragraph',
                  },
                ],
                type: 'listItem',
              },
              {
                content: [
                  {
                    content: [
                      {
                        text: 'Second list item',
                        type: 'text',
                      },
                    ],
                    type: 'paragraph',
                  },
                ],
                type: 'listItem',
              },
            ],
            type: 'bulletList',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // Should calculate reading time from all text content
      expect(result).toBeGreaterThan(0);
    });

    it('should ignore media content', () => {
      const contentJSON = {
        content: [
          {
            attrs: {
              alt: 'Test image',
              src: 'test.jpg',
            },
            type: 'image',
          },
          {
            content: [
              {
                text: 'This is the only text content.',
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
      };

      const result = calculateReadingTime(contentJSON, 'Test Title', 'Test Description');
      // Should only count text content, not images
      expect(result).toBe(1);
    });
  });
});
