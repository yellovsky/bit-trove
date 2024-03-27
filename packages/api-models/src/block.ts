// global modules
import type { UploadFileResponse } from '@repo/api-models/upload-file';

export interface RichTextBlock {
  __component: 'blocks.rich-text-block';

  id: number;
  body: string | null;
  title: string | null;
}

export interface ImageBlock {
  __component: 'blocks.image-block';

  id: number;
  title: string | null;
  image: UploadFileResponse | null;
}

export type Block = RichTextBlock | ImageBlock;

export const POPULATE_BLOCKS = {
  populate: '*',
};
