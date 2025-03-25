import { Schema } from 'mongoose';

export function addIdAfterSave(schema: Schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.id = this._id.toString();
    }
    next();
  });
}

/**
 * Convert nested objects to dot notation eg. { "video.captions.remotion": captions.captions }
 * This way you can only remove properties that are present in the update object
 * @param obj The object to search through
 * @returns Array of objects that contain a path property
 */
export function flattenObject(obj: any, prefix = ''): any {
  const flattened: any = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      const nested = flattenObject(obj[key], prefix + key + '.');
      Object.assign(flattened, nested);
    } else {
      flattened[prefix + key] = obj[key];
    }
  }

  return flattened;
}

/**
 * Recursively finds all objects that contain a 'path' property
 * @param obj The object to search through
 * @returns Array of objects that contain a path property
 */
export function findAllObjectsWithPaths(obj: any): any[] {
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
