import type { JSONContent } from '@repo/api-models';

const WORDS_PER_MINUTE = 200;

/**
 * Count words in text
 */
const countWords = (text: string): number => {
  if (!text || typeof text !== 'string') return 0;

  // Remove extra whitespace and split by whitespace
  const words = text.trim().split(/\s+/);

  // Filter out empty strings and count
  return words.filter((word) => word.length > 0).length;
};

/**
 * Calculate reading time from title and description only
 */
const calculateFromText = (title: string, shortDescription: string | null): number => {
  const titleText = title || '';
  const descriptionText = shortDescription || '';
  const totalText = `${titleText} ${descriptionText}`.trim();

  if (!totalText) return 1;

  const wordCount = countWords(totalText);
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};

/**
 * Extract plain text from TipTap JSON content
 */
const extractTextFromJSON = (content: JSONContent): string => {
  if (!content) return '';

  const textParts: string[] = [];

  const extractText = (node: JSONContent): void => {
    if (typeof node === 'string') {
      textParts.push(node);
      return;
    }

    if (typeof node !== 'object' || !node) return;

    // Extract text from text nodes
    if (node.type === 'text' && node.text) {
      textParts.push(node.text);
      return;
    }

    // Handle specific node types
    switch (node.type) {
      case 'paragraph':
      case 'heading':
      case 'blockquote':
      case 'codeBlock':
      case 'listItem':
        if (Array.isArray(node.content)) {
          node.content.forEach(extractText);
        }
        break;
      case 'bulletList':
      case 'orderedList':
        if (Array.isArray(node.content)) {
          node.content.forEach(extractText);
        }
        break;
      // Skip media and interactive elements
      case 'image':
      case 'video':
      case 'embed':
      case 'horizontalRule':
        break;
      default:
        // For unknown types, try to extract content
        if (Array.isArray(node.content)) {
          node.content.forEach(extractText);
        }
        break;
    }
  };

  extractText(content);
  return textParts.join(' ');
};

/**
 * Calculate reading time in minutes from TipTap JSON content
 */
export const calculateReadingTime = (
  contentJSON: JSONContent | null,
  title: string,
  shortDescription: string | null
): number => {
  if (!contentJSON) {
    return calculateFromText(title, shortDescription);
  }

  const text = extractTextFromJSON(contentJSON);
  const titleText = title || '';
  const descriptionText = shortDescription || '';

  const totalText = `${titleText} ${descriptionText} ${text}`.trim();

  if (!totalText) {
    return 1; // Minimum reading time
  }

  const wordCount = countWords(totalText);
  const readingTime = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

  return Math.min(readingTime, 999); // Cap at 999 minutes
};
