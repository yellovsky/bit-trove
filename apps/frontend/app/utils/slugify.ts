// global modules
import slugifyNPM from 'slugify';

export const slugify = (text: string): string =>
  slugifyNPM(text, { lower: true, strict: true, trim: true });
