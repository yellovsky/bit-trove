// global modules
import { apiHost } from '@bit-trove/utils/api-host';
import { faker } from '@faker-js/faker';
import type { ImageLoader } from 'next/image';
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
      .find((format) => format.width >= width)?.url || uploadFile.url
  );
};

export const generateFakeUploadFileResponse = (options?: { height?: number; width?: number }) => {
  const height = options?.height || 954;
  const width = options?.width || 1440;

  return {
    data: {
      id: faker.number.int(),

      attributes: {
        alternativeText: faker.lorem.sentence(),
        caption: faker.lorem.sentence(),
        ext: 'jpg',
        height,
        mime: '',
        previewUrl: '',
        url: faker.image.urlPicsumPhotos({ height, width }),
        width,

        formats: {
          large: {
            height: 663,
            mime: 'image/jpeg',
            url: faker.image.urlPicsumPhotos({ height: 663, width: 1000 }),
            width: 1000,
          },
          medium: {
            height: 497,
            mime: 'image/jpeg',
            url: faker.image.urlPicsumPhotos({ height: 497, width: 750 }),
            width: 750,
          },
          small: {
            height: 331,
            mime: 'image/jpeg',
            url: faker.image.urlPicsumPhotos({ height: 331, width: 500 }),
            width: 500,
          },
          thumbnail: {
            height: 156,
            mime: 'image/jpeg',
            url: faker.image.urlPicsumPhotos({ height: 156, width: 236 }),
            width: 236,
          },
        },
      },
    },
  } satisfies UploadFileResponse;
};

export const imgLoader =
  (uploadFile: UploadFile | undefined): ImageLoader =>
  ({ src, width }) =>
    !uploadFile ? src : apiHost(getUploadFileUrlByWidth(uploadFile, width));
