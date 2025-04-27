import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { DataStorage } from './models/cloud.model';

@Injectable()
export class CloudStorageService {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  /**
   * Uploads a file to a Google Cloud Storage bucket
   * @param bucketName - The name of the bucket
   * @param fileName - The name to give the file in storage
   * @param fileBuffer - The file content as a Buffer
   * @param contentType - Optional MIME type of the file
   * @returns Promise with upload results
   */
  public async uploadFile(bucketName: string, fileName: string, fileBuffer: Buffer, contentType?: string): Promise<any> {
    const bucket = this.storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const options = contentType ? { contentType } : undefined;

    return new Promise((resolve, reject) => {
      const stream = file.createWriteStream(options);

      stream.on('error', err => {
        reject(err);
      });

      stream.on('finish', async () => {
        console.log(`gs://${bucketName}/${fileName} uploaded successfully`);
        resolve({
          success: true,
          fileName,
          path: `gs://${bucketName}/${fileName}`,
        });
      });

      stream.end(fileBuffer);
    });
  }

  /**
   * Uploads a file to a Google Cloud Storage bucket and makes it public
   * @param bucketName - The name of the bucket
   * @param fileName - The name to give the file in storage
   * @param fileBuffer - The file content as a Buffer
   * @param contentType - Optional MIME type of the file
   * @param metadata - Optional metadata for the file
   * @returns Promise with bucket, path, and public URL
   */
  public async uploadFileAndMakePublic(
    bucketName: string,
    fileName: string,
    fileBuffer: Buffer,
    contentType?: string,
    metadata?: { [key: string]: any }
  ): Promise<DataStorage> {
    const bucket = this.storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Set metadata if provided
    if (metadata) {
      // The Node.js client requires metadata to be nested under 'metadata' key
      await file.setMetadata({ metadata });
    }

    return new Promise((resolve, reject) => {
      const stream = file.createWriteStream(
        // Pass contentType in options if provided
        contentType ? { contentType } : undefined
      );

      stream.on('error', err => {
        reject(err);
      });

      stream.on('finish', async () => {
        try {
          // Make the file public
          await file.makePublic();
          console.log(`gs://${bucketName}/${fileName} uploaded and made public`);

          // Resolve with the required information
          resolve({
            bucket: bucketName,
            path: file.name, // file.name is the path within the bucket
            url: file.publicUrl(), // Get the public URL
          });
        } catch (makePublicError) {
          // Reject if making public fails
          reject(makePublicError);
        }
      });

      // End the stream with the file buffer
      stream.end(fileBuffer);
    });
  }

  /**
   * Deletes a file from a Google Cloud Storage bucket
   * @param bucketName - The name of the bucket
   * @param fileName - The name of the file to delete
   * @returns Promise with deletion results
   */
  public async deleteStorageFile(bucketName: string, fileName: string): Promise<any> {
    const _results = await this.storage.bucket(bucketName).file(fileName).delete();
    console.log(`gs://${bucketName}/${fileName} deleted`);
    return _results;
  }

  /**
   * Removes all files present in an object
   * @param obj The object to search through
   * @returns Promise with removal results
   */
  public async removeAllStorageFilesPresentInObject(obj: any): Promise<any> {
    const pathsObjects = this.findAllObjectsWithPaths(obj);
    console.log('Removing items from storage: ', pathsObjects.length);
    const promises = pathsObjects.map(obj => this.deleteStorageFile(obj.bucket, obj.path));
    try {
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error removing items from storage: ', error);
      return null;
    }
  }

  /**
   * Recursively finds all objects that contain a 'path' property, used with CloudStorageData Object Type
   * @param obj The object to search through
   * @returns Array of objects that contain a path property
   */
  findAllObjectsWithPaths(obj: any): any[] {
    if (!obj) return [];

    const objectsWithPaths: any[] = [];

    const search = (current: any) => {
      if (!current || typeof current !== 'object') return;

      if (current.path && typeof current.path === 'string') {
        objectsWithPaths.push(current);
      }

      // Search arrays
      if (Array.isArray(current)) {
        current.forEach(item => search(item));
      } else {
        // Search object properties
        Object.values(current).forEach(value => search(value));
      }
    };

    search(obj);
    return objectsWithPaths;
  }

  /**
   * Gets a file from a Google Cloud Storage bucket
   * @param bucketName - The name of the bucket
   * @param fileName - The name of the file to get
   * @returns Promise with the file contents as a Buffer
   */
  public async getFile(bucketName: string, fileName: string): Promise<Buffer> {
    const file = this.storage.bucket(bucketName).file(fileName);
    const [fileContent] = await file.download();
    return fileContent;
  }

  /**
   * Generates a signed URL for temporary access to a file
   * @param bucketName - The name of the bucket
   * @param fileName - The name of the file
   * @param expiresInMinutes - How long the URL should be valid (default: 15 minutes)
   * @returns Promise with the signed URL
   */
  public async generateSignedUrl(bucketName: string, fileName: string, expiresInMinutes = 15): Promise<string> {
    const options = {
      version: 'v4' as const,
      action: 'read' as const,
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    };

    const [url] = await this.storage.bucket(bucketName).file(fileName).getSignedUrl(options);

    return url;
  }

  /**
   * Lists all files in a bucket with optional prefix filter
   * @param bucketName - The name of the bucket
   * @param prefix - Optional prefix to filter files (like a folder path)
   * @returns Promise with array of file metadata
   */
  public async listFiles(bucketName: string, prefix?: string): Promise<any[]> {
    const options = prefix ? { prefix } : undefined;
    const [files] = await this.storage.bucket(bucketName).getFiles(options);

    return files.map(file => ({
      name: file.name,
      size: file.metadata.size,
      contentType: file.metadata.contentType,
      updated: file.metadata.updated,
      timeCreated: file.metadata.timeCreated,
    }));
  }

  /**
   * Checks if a file exists in a bucket
   * @param bucketName - The name of the bucket
   * @param fileName - The name of the file to check
   * @returns Promise with boolean indicating if file exists
   */
  public async fileExists(bucketName: string, fileName: string): Promise<boolean> {
    const file = this.storage.bucket(bucketName).file(fileName);
    const [exists] = await file.exists();
    return exists;
  }
}
