// global modules
import type { UploadFileResponse } from '@repo/api-models/upload-file';

export interface RichTextBlock {
  __component: 'blocks.rich-text-block';
  title: string | null;
  body: string | null;
}

export interface ImageBlock {
  __component: 'blocks.image-block';
  title: string | null;
  image: UploadFileResponse | null;
}

export type Block = RichTextBlock | ImageBlock;

export const POPULATE_BLOCKS = {
  populate: '*',
};
