// global modules
import { faker } from '@faker-js/faker';
import { apiHost } from '@bit-trove/utils/api-host';

export interface UploadFileFormat {
  mime: string;
  width: number;
  height: number;
  url: string;
}

// ==================================================
//               S E G M E N T
// ==================================================
type UploadFileFormatType = 'thumbnail' | 'small' | 'medium' | 'large';

export interface UploadFile {
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Partial<Record<UploadFileFormatType, UploadFileFormat>>;
  ext: string;
  mime: string;
  url: string;
  previewUrl: string | null;
}

export interface UploadFileResponse {
  data: {
    attributes: UploadFile;
  } | null;
}

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
