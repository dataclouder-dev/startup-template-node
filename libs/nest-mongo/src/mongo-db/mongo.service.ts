import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Model } from 'mongoose';

export class FiltersConfig {
  // I create this object to handle all posible scenarios in mongo.
  // Pagination is handled by setting skip and limit and perform operations.
  page: number; // page number
  rowsPerPage: number; // limit
  sort: Record<string, any>;
  filters: Record<string, any>; // Mongo filters for query.
  text?: string; // if text is provided, will do text search in all indexed fields.
  returnProps?: Record<string, boolean>; // This will be deprecated in future. by projection.
  projection?: Record<string, boolean>; // This is the projection for the query.
}

export interface IQueryResponse<T> {
  count: number;
  page: number;
  rows: T[];
  rowsPerPage: number;
  skip: number;
}

@Injectable()
export class MongoService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  //   Note for every filter use this method in next servics.
  async queryUsingFiltersConfig<T>(filterConfig: FiltersConfig, modelEntity: Model<T>): Promise<IQueryResponse<T>> {
    // Calculate pagination
    const page = filterConfig.page;
    const limit = filterConfig.rowsPerPage;
    const skip = limit ? limit * page : 0;
    // Build base query
    const filters = filterConfig.filters || {};
    const returnProps = filterConfig.returnProps || {};
    // Add text search if provided
    if (filterConfig.text) {
      filters.$text = { $search: filterConfig.text };
    }
    // Execute query
    const query = modelEntity.find(filters, returnProps).skip(skip).limit(limit);
    // Add sorting if specified
    if (filterConfig.sort) {
      query.sort(filterConfig.sort);
    }
    // Get total count and results in parallel
    const [count, entities] = await Promise.all([
      filterConfig.text ? 0 : modelEntity.countDocuments(filters),
      query.lean().exec() as unknown as T[],
    ]);

    return { count, page, rows: entities, rowsPerPage: limit, skip };
  }

  // 🐁 Explaining using UsingFiltersConfig will return counts and pagination so you can make the next requesty. to the cost of 2 queries.
  // 🐁 If you don't need pagination or counts, use queryCollection.

  async queryCollection(
    collectionName: string,
    filter: Record<string, any> = {},
    options: {
      projection?: Record<string, any>;
      sort?: Record<string, any>;
      skip?: number;
      limit?: number;
    } = {}
  ): Promise<any[]> {
    const collection = this.connection.db.collection(collectionName);
    const { projection, sort, skip, limit } = options;

    const query = collection.find(filter, { projection });

    if (sort) {
      query.sort(sort);
    }

    if (skip !== undefined) {
      query.skip(skip);
    }

    if (limit !== undefined) {
      query.limit(limit);
    }

    return query.toArray();
  }

  async countDocuments(collectionName: string, filter: Record<string, any> = {}): Promise<number> {
    const collection = this.connection.db.collection(collectionName);
    return collection.countDocuments(filter);
  }

  async queryCollectionUsingFiltersConfig<T = any>(collectionName: string, filterConfig: FiltersConfig): Promise<IQueryResponse<T>> {
    const collection = this.connection.db.collection(collectionName);

    // Calculate pagination
    const page = filterConfig.page || 0;
    const limit = filterConfig.rowsPerPage || 0;
    const skip = page * limit;

    // Build base query filters
    const queryFilters: Record<string, any> = filterConfig.filters ? { ...filterConfig.filters } : {};

    // Add text search if provided
    if (filterConfig.text) {
      queryFilters.$text = { $search: filterConfig.text };
    }

    // Prepare projection
    const findOptions: { projection?: Record<string, boolean> } = {};
    if (filterConfig.projection) {
      findOptions.projection = filterConfig.projection;
    }

    let cursor = collection.find(queryFilters, findOptions);

    // Add sorting if specified
    if (filterConfig.sort && Object.keys(filterConfig.sort).length > 0) {
      cursor = cursor.sort(filterConfig.sort);
    }

    // Add skip
    if (skip > 0) {
      cursor = cursor.skip(skip);
    }

    // Apply limit
    cursor = cursor.limit(limit); // limit is filterConfig.rowsPerPage (number)

    console.log('cursor', cursor);

    // Get total count and results in parallel
    const countPromise = filterConfig.text
      ? Promise.resolve(0) // If text search is active, count is 0 (consistent with queryUsingFiltersConfig)
      : collection.countDocuments(queryFilters); // Otherwise, count with all filters

    const [count, entities] = await Promise.all([countPromise, cursor.toArray() as unknown as T[]]);

    return {
      count,
      page,
      rows: entities,
      rowsPerPage: limit,
      skip,
    };
  }

  async save(collectionName: string, document: any) {
    const collection = this.connection.db.collection(collectionName);
    return collection.insertOne(document);
  }

  async upsert(collectionName: string, filter: Record<string, any>, data: any) {
    const collection = this.connection.db.collection(collectionName);
    return collection.updateOne(filter, { $set: data }, { upsert: true });
  }
}
