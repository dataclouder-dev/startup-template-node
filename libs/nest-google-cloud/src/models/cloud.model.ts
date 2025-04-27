export class CloudModel {
  path: string;
  bucket: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
}

export interface DataStorage {
  path: string;
  bucket: string;
  url: string;
}
