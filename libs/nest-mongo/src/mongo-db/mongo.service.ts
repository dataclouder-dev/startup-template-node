import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Model } from 'mongoose';

export class FiltersConfig {
  page: number;
  rowsPerPage: number;
  sort: Record<string, any>;
  filters: Record<string, any>;
  text: string;
  returnProps?: Record<string, boolean>;
}

export interface IQueryResponse {
  count: number;
  page: number;
  rows: any[];
  rowsPerPage: number;
  skip: number;
}

@Injectable()
export class MongoService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  //   Note for every filter use this method in next servics.
  async queryUsingFiltersConfig(filterConfig: FiltersConfig, modelEntity: Model<any>): Promise<IQueryResponse> {
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
    const [count, entities] = await Promise.all([filterConfig.text ? 0 : modelEntity.countDocuments(filters), query.lean().exec()]);

    return { count, page, rows: entities, rowsPerPage: limit, skip };
  }

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
}
