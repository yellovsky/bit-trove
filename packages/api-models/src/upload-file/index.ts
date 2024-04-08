// global modules
import { faker } from '@faker-js/faker';
import type { ImageLoader } from 'next/image';
import { apiHost } from '@bit-trove/utils/api-host';
import type { APIResponse, APIResponseData } from '@bit-trove/api-models/common';

export interface UploadFileFormat {
  mime: string;
  width: number;
  height: number;
  url: string;
}

type UploadFileFormatType = 'thumbnail' | 'small' | 'medium' | 'large';

export interface UploadFile {
  ext: string;
  url: string;
  mime: string;
  width: number;
  height: number;
  caption: string | null;
  previewUrl: string | null;
  alternativeText: string | null;
  formats: Partial<Record<UploadFileFormatType, UploadFileFormat>>;
}
export type UploadFileResponseData = APIResponseData<UploadFile>;
export type UploadFileResponse = APIResponse<UploadFile>;

export const UPLOAD_FILE_POPULATE = '*';

export const getUploadFileUrl = (
  uploadFile: UploadFile,
  formatType?: UploadFileFormatType
): string => {
  const format = formatType ? uploadFile.formats[formatType] : undefined;
  return apiHost(format?.url || uploadFile.url);
};

export const getUploadFileUrlByWidth = (uploadFile: UploadFile, width: number): string => {
  return (
    Object.values(uploadFile.formats)
      .sort((a, b) => a.width - b.width)
      .find((format) => {
        console.log('format.width >= width', format.width, width);
        return format.width >= width;
      })?.url || uploadFile.url
  );
};

export const generateFakeUploadFileResponse = (options?: { height?: number; width?: number }) => {
  const height = options?.height || 954;
  const width = options?.width || 1440;

  return {
    data: {
      id: faker.number.int(),
      attributes: {
        width,
        height,
        mime: '',
        ext: 'jpg',
        formats: {
          thumbnail: {
            mime: 'image/jpeg',
            width: 236,
            height: 156,
            url: faker.image.urlPicsumPhotos({ width: 236, height: 156 }),
          },
          medium: {
            mime: 'image/jpeg',
            width: 750,
            height: 497,
            url: faker.image.urlPicsumPhotos({ width: 750, height: 497 }),
          },
          small: {
            mime: 'image/jpeg',
            width: 500,
            height: 331,
            url: faker.image.urlPicsumPhotos({ width: 500, height: 331 }),
          },
          large: {
            mime: 'image/jpeg',
            width: 1000,
            height: 663,
            url: faker.image.urlPicsumPhotos({ width: 1000, height: 663 }),
          },
        },
        previewUrl: '',
        caption: faker.lorem.sentence(),
        alternativeText: faker.lorem.sentence(),
        url: faker.image.urlPicsumPhotos({ width, height }),
      },
    },
  } satisfies UploadFileResponse;
};

export const imgLoader =
  (uploadFile: UploadFile | undefined): ImageLoader =>
  ({ src, width }) =>
    !uploadFile ? src : apiHost(getUploadFileUrlByWidth(uploadFile, width));
