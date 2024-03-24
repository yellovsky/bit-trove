export interface UploadFileFormat {
  mime: string;
  width: number;
  height: number;
  url: string;
}

// ==================================================
//               S E G M E N T
// ==================================================
export interface UploadFile {
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large', UploadFileFormat>>;
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
