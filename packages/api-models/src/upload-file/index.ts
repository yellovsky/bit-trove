// global modules
import { faker } from '@faker-js/faker';
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

export const generateFakeUploadFileResponse = (options?: { height?: number; width?: number }) => {
  const height = options?.height || faker.number.int({ min: 100, max: 300 });
  const width = options?.width || faker.number.int({ min: 100, max: 300 });

  return {
    data: {
      id: faker.number.int(),
      attributes: {
        width,
        height,
        mime: '',
        ext: 'jpg',
        formats: {},
        previewUrl: '',
        caption: faker.lorem.sentence(),
        alternativeText: faker.lorem.sentence(),
        url: faker.image.urlPicsumPhotos({ width, height }),
      },
    },
  } satisfies UploadFileResponse;
};
