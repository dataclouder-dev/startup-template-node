import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeckCommanderEntity, DeckCommanderDocument } from '../schemas/deck-commander.schema';
import { IDeckCommander } from '../models/deck-commander.models';
import { FiltersConfig, findAllObjectsWithPaths, flattenObject, IQueryResponse, MongoService } from '@dataclouder/nest-mongo';
import { CloudStorageService } from '@dataclouder/nest-google-cloud';
import { EntityCommunicationService } from '@dataclouder/nest-core';

/**
 * Service for managing DeckCommander entities in the database
 * Provides CRUD operations and query capabilities for DeckCommanderEntity objects
 */
/**
 * Service for managing DeckCommander entities in the database
 * Provides CRUD operations and query capabilities for DeckCommanderEntity objects
 * @description
 * This service provides methods for creating, retrieving, updating, and deleting DeckCommander entities
 * It also provides a query method that takes a filters configuration object and returns a promise resolving to a query response containing results and metadata
 */
@Injectable()
export class DeckCommanderService extends EntityCommunicationService<DeckCommanderDocument> {
  constructor(
    @InjectModel(DeckCommanderEntity.name)
    DeckCommanderModel: Model<DeckCommanderDocument>,
    mongoService: MongoService,
    cloudStorageService: CloudStorageService
  ) {
    super(DeckCommanderModel, mongoService, cloudStorageService);
  }
}
