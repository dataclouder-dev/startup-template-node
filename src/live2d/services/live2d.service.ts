import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Live2dEntity, Live2dDocument } from '../schemas/live2d.schema';
import { MongoService } from '@dataclouder/nest-mongo';
import { CloudStorageService } from '@dataclouder/nest-storage';
import { EntityCommunicationService } from '@dataclouder/nest-mongo';

/**
 * Service for managing live2d entities in the database
 * Provides CRUD operations and query capabilities for Live2dEntity objects
 */
/**
 * Service for managing live2d entities in the database
 * Provides CRUD operations and query capabilities for Live2dEntity objects
 * @description
 * This service provides methods for creating, retrieving, updating, and deleting live2d entities
 * It also provides a query method that takes a filters configuration object and returns a promise resolving to a query response containing results and metadata
 */
@Injectable()
export class Live2dService extends EntityCommunicationService<Live2dDocument> {
  constructor(
    @InjectModel(Live2dEntity.name)
    live2dModel: Model<Live2dDocument>,
    mongoService: MongoService
  ) {
    super(live2dModel, mongoService);
  }
}
