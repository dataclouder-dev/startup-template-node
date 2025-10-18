import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericEntity, GenericDocument } from '../schemas/generic.schema';
import { MongoService } from '@dataclouder/nest-mongo';
import { CloudStorageService } from '@dataclouder/nest-storage';
import { EntityCommunicationService } from '@dataclouder/nest-mongo';

/**
 * Service for managing generic entities in the database
 * Provides CRUD operations and query capabilities for GenericEntity objects
 */
/**
 * Service for managing generic entities in the database
 * Provides CRUD operations and query capabilities for GenericEntity objects
 * @description
 * This service provides methods for creating, retrieving, updating, and deleting generic entities
 * It also provides a query method that takes a filters configuration object and returns a promise resolving to a query response containing results and metadata
 */
@Injectable()
export class GenericService extends EntityCommunicationService<GenericDocument> {
  constructor(
    @InjectModel(GenericEntity.name)
    genericModel: Model<GenericDocument>,
    mongoService: MongoService
  ) {
    super(genericModel, mongoService);
  }
}
